"use client";

import React, {
  createContext,
  PropsWithChildren,
  useState,
  useSyncExternalStore,
} from "react";

import { updateConsent } from "@/lib/utils/consent";

import type {
  CookieConsentContextValue,
  CookieConsentPreferences,
  CookieConsentState,
} from "./types";
import {
  createDefaultPreferences,
  getCookieConsent,
  isBannerDismissed,
  isConsentValid,
  removeBannerDismissed,
  setBannerDismissed,
  setCookieConsent,
} from "./utils";

export const CookieConsentContext =
  createContext<CookieConsentContextValue | null>(null);

// No external events change cookie/localStorage consent outside of this
// component's own actions, so there's nothing to subscribe to.
const subscribe = () => () => {};

// getCookieConsent/isBannerDismissed read document.cookie / localStorage,
// which are unavailable during SSR — useSyncExternalStore's getServerSnapshot
// covers that render, then the client snapshot below applies on hydration.
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
  const dismissed = isBannerDismissed();

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
  } else if (dismissed) {
    cachedInitialState = {
      preferences: null,
      hasConsent: false,
      hasAnalyticsConsent: false,
      hasAdvertisingConsent: false,
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
  const initialState = useSyncExternalStore(
    subscribe,
    getInitialState,
    () => SERVER_STATE
  );
  const [state, setState] = useState<CookieConsentState>(initialState);

  /**
   * The single write path. Every choice — accept, reject, save — stores the
   * record, tells Google, and updates the UI, in that order and nowhere else.
   */
  const applyChoice = (preferences: CookieConsentPreferences) => {
    setCookieConsent(preferences);
    removeBannerDismissed();

    updateConsent({
      analytics: preferences.analytics,
      advertising: preferences.advertising,
    });

    setState({
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
    applyChoice(createDefaultPreferences({ analytics: true, advertising: true }));

  /**
   * An affirmative no, and the reason it is not dismissBanner: this writes a
   * record, so the banner stays gone and the next page load sends denied as
   * the consent *default* rather than leaving it to the deny-by-default.
   */
  const rejectAll = () => applyChoice(createDefaultPreferences());

  const dismissBanner = () => {
    setBannerDismissed();

    setState((prev) => ({
      ...prev,
      showBanner: false,
    }));
  };

  const openSettings = () => {
    setState((prev) => ({
      ...prev,
      showModal: true,
    }));
  };

  const closeSettings = () => {
    setState((prev) => ({
      ...prev,
      showModal: false,
    }));
  };

  const savePreferences = (
    newPreferences: Partial<CookieConsentPreferences>
  ) =>
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
    dismissBanner,
    openSettings,
    closeSettings,
    savePreferences,
  };

  return <CookieConsentContext value={value}>{children}</CookieConsentContext>;
};
