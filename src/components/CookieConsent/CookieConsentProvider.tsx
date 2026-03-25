"use client";

import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
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

export const CookieConsentProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [state, setState] = useState<CookieConsentState>({
    preferences: null,
    hasConsent: false,
    hasAnalyticsConsent: false,
    showBanner: false,
    showModal: false,
    isLoading: true,
  });

  // @TODO Refactor initialization using useSyncExternalStore:
  // - Replace useState + useEffect init pattern with useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  // - getSnapshot: reads getCookieConsent() / isBannerDismissed() on the client
  // - getServerSnapshot: returns null/false (explicit SSR fallback, no hydration mismatch)
  // - This eliminates isLoading state and the eslint-disable below
  // Initialize consent state on mount — must be an effect since getCookieConsent/isBannerDismissed
  // read from document.cookie / localStorage which are unavailable during SSR.
  /* eslint-disable @eslint-react/set-state-in-effect */
  useEffect(() => {
    const existingConsent = getCookieConsent();
    const dismissed = isBannerDismissed();

    if (existingConsent && isConsentValid(existingConsent)) {
      // User has valid consent
      setState({
        preferences: existingConsent,
        hasConsent: true,
        hasAnalyticsConsent: existingConsent.analytics,
        showBanner: false,
        showModal: false,
        isLoading: false,
      });
    } else if (dismissed) {
      // User dismissed banner, no consent given
      setState({
        preferences: null,
        hasConsent: false,
        hasAnalyticsConsent: false,
        showBanner: false,
        showModal: false,
        isLoading: false,
      });
    } else {
      // First visit or expired consent - show banner
      setState({
        preferences: null,
        hasConsent: false,
        hasAnalyticsConsent: false,
        showBanner: true,
        showModal: false,
        isLoading: false,
      });
    }
  }, []);
  /* eslint-enable @eslint-react/set-state-in-effect */

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

    // Reload to initialize analytics
    window.location.reload();
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

    // Reload to initialize/remove analytics
    window.location.reload();
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
