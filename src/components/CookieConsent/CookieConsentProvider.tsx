"use client";

import React, {
  createContext,
  PropsWithChildren,
  useState,
  useSyncExternalStore,
} from "react";

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
let cachedInitialState: CookieConsentState | undefined;

function getInitialState(): CookieConsentState {
  if (cachedInitialState) return cachedInitialState;

  const existingConsent = getCookieConsent();
  const dismissed = isBannerDismissed();

  if (existingConsent && isConsentValid(existingConsent)) {
    cachedInitialState = {
      preferences: existingConsent,
      hasConsent: true,
      hasAnalyticsConsent: existingConsent.analytics,
      showBanner: false,
      showModal: false,
      isLoading: false,
    };
  } else if (dismissed) {
    cachedInitialState = {
      preferences: null,
      hasConsent: false,
      hasAnalyticsConsent: false,
      showBanner: false,
      showModal: false,
      isLoading: false,
    };
  } else {
    cachedInitialState = {
      preferences: null,
      hasConsent: false,
      hasAnalyticsConsent: false,
      showBanner: true,
      showModal: false,
      isLoading: false,
    };
  }

  return cachedInitialState;
}

const SERVER_STATE: CookieConsentState = {
  preferences: null,
  hasConsent: false,
  hasAnalyticsConsent: false,
  showBanner: false,
  showModal: false,
  isLoading: true,
};

/**
 * Accepting or saving no longer reloads the page. The reload existed to
 * re-mount the analytics gate, but that gate is disabled and the tags load
 * for everyone (ConditionalAnalytics), so all it did was replay the landing
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

  const acceptAll = () => {
    const preferences = createDefaultPreferences(true);
    setCookieConsent(preferences);
    removeBannerDismissed();

    setState({
      preferences,
      hasConsent: true,
      hasAnalyticsConsent: true,
      showBanner: false,
      showModal: false,
      isLoading: false,
    });
  };

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
  ) => {
    const preferences = createDefaultPreferences(newPreferences.analytics);
    setCookieConsent(preferences);
    removeBannerDismissed();

    setState({
      preferences,
      hasConsent: true,
      hasAnalyticsConsent: preferences.analytics,
      showBanner: false,
      showModal: false,
      isLoading: false,
    });
  };

  const value: CookieConsentContextValue = {
    ...state,
    acceptAll,
    dismissBanner,
    openSettings,
    closeSettings,
    savePreferences,
  };

  return <CookieConsentContext value={value}>{children}</CookieConsentContext>;
};
