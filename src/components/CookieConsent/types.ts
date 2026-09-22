export interface CookieConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  advertising: boolean;
  timestamp: string;
  /**
   * The shape this record was written in. 1 is everything stored before the
   * advertising category existed; those have no `advertising` key and are read
   * as declined. See REPROMPT_BELOW_VERSION in utils.ts.
   */
  version: number;
}

export interface CookieConsentState {
  preferences: CookieConsentPreferences | null;
  hasConsent: boolean;
  hasAnalyticsConsent: boolean;
  hasAdvertisingConsent: boolean;
  showBanner: boolean;
  showModal: boolean;
  isLoading: boolean;
}

export interface CookieConsentContextValue extends CookieConsentState {
  acceptAll: () => void;
  rejectAll: () => void;
  dismissBanner: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  savePreferences: (preferences: Partial<CookieConsentPreferences>) => void;
}
