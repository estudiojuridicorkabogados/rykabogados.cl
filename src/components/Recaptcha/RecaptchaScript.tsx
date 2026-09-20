import Script from "next/script";

import { env } from "@/lib/env";

/**
 * reCAPTCHA v3 costs ~354KB transferred / 846KB decoded, so it is mounted per
 * route rather than in the root layout — only the three pages that actually
 * call getCaptchaToken() need it, and those are not the pages search traffic
 * lands on. See docs/lcp-performance-plan.md.
 *
 * Keeping it on exactly the pages that use it also keeps the badge visible
 * where it is required.
 */
export const RecaptchaScript = () => {
  if (!env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
    return null;
  }

  return (
    <Script
      async
      strategy="lazyOnload"
      src={`https://www.google.com/recaptcha/api.js?render=${env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
    />
  );
};
