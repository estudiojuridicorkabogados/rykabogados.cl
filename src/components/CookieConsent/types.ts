export interface CookieConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  timestamp: string;
}

export interface CookieConsentState {
  preferences: CookieConsentPreferences | null;
  hasConsent: boolean;
  hasAnalyticsConsent: boolean;
  showBanner: boolean;
  showModal: boolean;
  isLoading: boolean;
}

export interface CookieConsentContextValue extends CookieConsentState {
  acceptAll: () => void;
  dismissBanner: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  savePreferences: (preferences: Partial<CookieConsentPreferences>) => void;
}
