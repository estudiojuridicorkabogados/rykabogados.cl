"use client";

import React, {
  createContext,
  PropsWithChildren,
  useState,
  useSyncExternalStore,
} from "react";

import { clearAttributionCookies } from "@/lib/utils/campaignParams";
import { updateConsent } from "@/lib/utils/consent";

import type {
  CookieConsentContextValue,
  CookieConsentPreferences,
  CookieConsentState,
} from "./types";
import {
  createDefaultPreferences,
  getCookieConsent,
  isConsentValid,
  setCookieConsent,
} from "./utils";

export const CookieConsentContext =
  createContext<CookieConsentContextValue | null>(null);

// No external events change cookie/localStorage consent outside of this
// component's own actions, so there's nothing to subscribe to.
const subscribe = () => () => {};

// getCookieConsent reads document.cookie, which is unavailable during SSR —
// useSyncExternalStore's getServerSnapshot covers that render, then the
// client snapshot below applies on hydration.
// getSnapshot must return a stable reference across calls (React compares by
// Object.is), so the result is computed once and cached — nothing else in
// this module ever mutates cookie/localStorage out from under it.
//
// The cache goes stale the moment a visitor chooses, which is harmless only
// because the provider lives in the root layout and never remounts. Move it
// somewhere it can, and an accepted visitor gets the banner back.
let cachedInitialState: CookieConsentState | undefined;

function getInitialState(): CookieConsentState {
  if (cachedInitialState) return cachedInitialState;

  const existingConsent = getCookieConsent();

  // No "dismissed" state any more. An older design let the banner be closed
  // without an answer and remembered that in localStorage forever, and under
  // Consent Mode that flag would have meant a permanent, silent denial for
  // everyone who once clicked it — with no expiry and no way back. Those
  // visitors are asked again like anyone else; the stale key is simply
  // ignored. The only record that counts is the cookie, and only while
  // isConsentValid says so.
  if (existingConsent && isConsentValid(existingConsent)) {
    // Deliberately no updateConsent() here. This runs during render, where a
    // side effect does not belong and where useSyncExternalStore may call us
    // more than once — and it would be redundant anyway: the bootstrap snippet
    // in the root layout already read the same cookie before hydration and
    // sent this choice as the consent *default*, which is strictly better than
    // a late update.
    cachedInitialState = {
      preferences: existingConsent,
      hasConsent: true,
      hasAnalyticsConsent: existingConsent.analytics,
      hasAdvertisingConsent: existingConsent.advertising,
      showBanner: false,
      showModal: false,
      isLoading: false,
    };
  } else {
    cachedInitialState = {
      preferences: null,
      hasConsent: false,
      hasAnalyticsConsent: false,
      hasAdvertisingConsent: false,
      showBanner: true,
      showModal: false,
      isLoading: false,
    };
  }

  return cachedInitialState;
}

// isLoading is vestigial: ConditionalAnalytics was its only reader, and that
// gate is gone — Consent Mode restricts the tags rather than the container.
// Left in place because removing it is a wider type change for no gain.
const SERVER_STATE: CookieConsentState = {
  preferences: null,
  hasConsent: false,
  hasAnalyticsConsent: false,
  hasAdvertisingConsent: false,
  showBanner: false,
  showModal: false,
  isLoading: true,
};

/**
 * Accepting or saving no longer reloads the page. The reload existed to
 * re-mount the analytics gate, but that gate is disabled and the tags load
 * for everyone (SiteAnalytics), so all it did was replay the landing
 * page: two `rk_page_view`s marked as the first page, and every scroll mark
 * and form view twice, for every visitor who accepted — which is most of
 * them, on the first page of every visit. Phase 3 hands the choice to Google
 * Consent Mode with a dataLayer update instead, which needs no reload either.
 */
export const CookieConsentProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  // The state before the visitor has done anything, which on the server and
  // during hydration is SERVER_STATE and afterwards is what the cookie says.
  const storedState = useSyncExternalStore(
    subscribe,
    getInitialState,
    () => SERVER_STATE
  );

  // What they have done since, if anything. Null until they act.
  //
  // This used to be `useState(initialState)`, and that is why the banner has
  // not appeared for anyone since 27 August 2026 (b1c0840). useState runs its
  // initialiser exactly once, during hydration — where useSyncExternalStore
  // correctly returns the *server* snapshot so the markup matches. The client
  // snapshot arrives on the very next render and useState, by definition,
  // ignored it. showBanner was seeded false and stayed false.
  //
  // Verified against production before changing it: no consent cookie, no
  // dismissal flag, no banner. Which means nobody has been able to choose —
  // and with Consent Mode now reading that choice, shipping this phase on top
  // of an invisible banner would have denied every visitor permanently.
  const [choice, setChoice] = useState<CookieConsentState | null>(null);

  const state = choice ?? storedState;

  /**
   * The single write path. Every choice — accept, reject, save — stores the
   * record, drops what the choice no longer allows, tells Google, and updates
   * the UI, in that order and nowhere else.
   *
   * Withdrawing advertising consent has to reach our own cookies, not only
   * Google's: Consent Mode does not know about `gclid`, `utm_*` or `rk_ft_*`,
   * and until this call they stayed for their full ninety days after a
   * "Rechazar todas" and kept being read into every Sheet row. The Caso code
   * is deliberately not cleared here — see getSessionCode for why a reference
   * the firm may be mid-conversation about survives a withdrawal.
   */
  const applyChoice = (preferences: CookieConsentPreferences) => {
    setCookieConsent(preferences);

    if (!preferences.advertising) {
      clearAttributionCookies();
    }

    updateConsent({
      analytics: preferences.analytics,
      advertising: preferences.advertising,
    });

    setChoice({
      preferences,
      hasConsent: true,
      hasAnalyticsConsent: preferences.analytics,
      hasAdvertisingConsent: preferences.advertising,
      showBanner: false,
      showModal: false,
      isLoading: false,
    });
  };

  const acceptAll = () =>
    applyChoice(
      createDefaultPreferences({ analytics: true, advertising: true })
    );

  /**
   * An affirmative no. It writes a record, so the banner stays gone for the
   * thirty days a refusal is kept and the next page load sends denied as the
   * consent *default* rather than leaving it to the deny-by-default.
   */
  const rejectAll = () => applyChoice(createDefaultPreferences());

  const openSettings = () => setChoice({ ...state, showModal: true });

  const closeSettings = () => setChoice({ ...state, showModal: false });

  const savePreferences = (newPreferences: Partial<CookieConsentPreferences>) =>
    applyChoice(
      createDefaultPreferences({
        analytics: newPreferences.analytics,
        advertising: newPreferences.advertising,
      })
    );

  const value: CookieConsentContextValue = {
    ...state,
    acceptAll,
    rejectAll,
    openSettings,
    closeSettings,
    savePreferences,
  };

  return <CookieConsentContext value={value}>{children}</CookieConsentContext>;
};
