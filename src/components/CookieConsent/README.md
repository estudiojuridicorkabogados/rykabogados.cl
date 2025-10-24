# Cookie Consent Implementation

This directory contains the complete cookie consent solution for RK Abogados, implementing GDPR-compliant cookie management.

## 📁 Structure

```
CookieConsent/
├── types.ts                      # TypeScript interfaces and types
├── utils.ts                      # Cookie management utilities
├── CookieConsentProvider.tsx     # React context provider
├── useCookieConsent.ts          # React hook for accessing consent
├── CookieBanner.tsx             # Bottom banner component
├── CookieSettingsModal.tsx      # Settings modal with switches
└── index.ts                     # Barrel exports
```

## 🚀 Features

- ✅ GDPR-compliant cookie consent management
- ✅ Banner with "Accept", "Reject", and "Customize" options
- ✅ Detailed settings modal with cookie category switches
- ✅ LocalStorage for dismissed state (no tracking)
- ✅ Cookie storage for accepted preferences (1 year expiry)
- ✅ Conditional analytics loading based on consent
- ✅ Smooth animations with Framer Motion
- ✅ Accessible with keyboard navigation
- ✅ Mobile responsive
- ✅ Spanish language

## 🍪 Cookie Categories

### 1. Necessary Cookies (Always Active)

- Session cookies
- Cookie consent preferences
- **Cannot be disabled**

### 2. Analytics Cookies (Optional)

- Google Analytics (when implemented)
- Vercel Analytics
- Vercel Speed Insights
- **Requires user consent**

## 💾 Storage Strategy

### Cookie: `cookie-consent`

```json
{
  "necessary": true,
  "analytics": false,
  "timestamp": "2025-10-17T00:00:00.000Z"
}
```

- **Duration:** 1 year
- **Purpose:** Store user consent preferences
- **Domain:** Site-wide
- **SameSite:** Lax

### LocalStorage: `cookie-banner-dismissed`

```json
"true"
```

- **Purpose:** Track if user dismissed banner without accepting
- **No expiration** (persists until cleared)
- **No tracking when dismissed**

## 🎯 User Flow

### First Visit

1. Banner appears at bottom of screen
2. User has 3 options:
   - **Reject**: Dismiss banner, no analytics, stored in localStorage
   - **Customize**: Open detailed settings modal
   - **Accept All**: Accept all cookies, enable analytics

### Settings Modal

1. Shows two cookie categories:
   - **Necessary**: Always ON, disabled switch
   - **Analytics**: Toggle switch, OFF by default
2. Three action buttons:
   - **Cancel**: Close modal without changes
   - **Accept All**: Enable all optional cookies
   - **Save Preferences**: Save current switch states

### Return Visits

- If user accepted: Banner doesn't show, analytics active
- If user dismissed: Banner doesn't show, analytics inactive
- After 1 year: Consent expires, banner shows again

## 🔧 Usage

### Using the Hook

```tsx
import { useCookieConsent } from "@/components/CookieConsent";

function MyComponent() {
  const { hasAnalyticsConsent, acceptAll, openSettings, dismissBanner } =
    useCookieConsent();

  return (
    <div>
      {hasAnalyticsConsent ? "Analytics active" : "Analytics disabled"}
      <button onClick={openSettings}>Cookie Settings</button>
    </div>
  );
}
```

### Conditional Rendering Based on Consent

```tsx
import { useCookieConsent } from "@/components/CookieConsent";

function AnalyticsComponent() {
  const { hasAnalyticsConsent } = useCookieConsent();

  if (!hasAnalyticsConsent) return null;

  return <GoogleAnalytics />;
}
```

## 🎨 Styling

Components use Tailwind CSS with your existing design system:

- Primary color: `primary-600`
- Animations: Framer Motion
- Modal: Headless UI Dialog
- Responsive: Mobile-first approach

## 🧪 Testing Checklist

- [ ] Banner appears on first visit
- [ ] "Reject" button hides banner and stores in localStorage
- [ ] "Accept All" button stores consent in cookie
- [ ] "Customize" button opens modal
- [ ] Modal switches work correctly
- [ ] Necessary cookies switch is disabled
- [ ] Analytics switch can be toggled
- [ ] "Save Preferences" stores choices
- [ ] Analytics only loads with consent
- [ ] Consent expires after 1 year
- [ ] Footer link reopens settings
- [ ] Cookie policy page accessible
- [ ] Mobile responsive
- [ ] Keyboard navigation works
- [ ] Screen reader compatible

## 🔐 Privacy Compliance

### GDPR Compliance

- ✅ Opt-in by default (analytics OFF)
- ✅ Clear information about cookies
- ✅ Easy to withdraw consent
- ✅ Granular control over cookie types
- ✅ Link to detailed cookie policy

### Best Practices

- No analytics until explicit consent
- Dismissed ≠ Consent (important legal distinction)
- Re-ask for consent after 1 year
- Clear categories and descriptions
- Easy access to settings via footer

## 🛠️ Maintenance

### Adding New Cookie Categories

1. Update `types.ts` to add new property
2. Add switch in `CookieSettingsModal.tsx`
3. Update logic in `CookieConsentProvider.tsx`
4. Document in cookie policy page

### Adding Google Analytics

1. Add `NEXT_PUBLIC_GA_ID` to `env.ts`
2. Create `GoogleAnalytics.tsx` component
3. Add to `ConditionalAnalytics.tsx`
4. Update cookie policy page

## 📝 Legal Notes

- Cookie policy page: `/politica-cookies`
- Last updated: October 17, 2025
- Contact email in policy for questions
- Links to third-party privacy policies included

## 🐛 Troubleshooting

### Banner not appearing

- Check if cookie/localStorage is set
- Clear site data and refresh
- Verify provider wraps application

### Analytics not loading

- Check console for errors
- Verify `hasAnalyticsConsent` is true
- Check environment is production
- Verify Vercel/Google IDs configured

### Modal not opening

- Check `openSettings` is called correctly
- Verify Headless UI Dialog is working
- Check z-index conflicts

## 🔄 Future Enhancements

- [ ] Add more cookie categories if needed
- [ ] Implement Google Consent Mode v2
- [ ] Add cookie audit trail
- [ ] Multi-language support
- [ ] Remember user's language preference
