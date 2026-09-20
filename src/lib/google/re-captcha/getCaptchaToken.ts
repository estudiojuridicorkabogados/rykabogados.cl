/**
 * Reads the site key straight from `process.env` rather than through
 * `@/lib/env`. This module is imported by client components, and `@/lib/env`
 * does `import "dotenv/config"` — which, once it is reachable from the client
 * graph, drags dotenv and the Node polyfills (Buffer, crypto/elliptic) into
 * the browser bundle: 684KB raw, 183KB gzipped, on /contacto and both
 * habla-con-nosotros pages. Next inlines NEXT_PUBLIC_* at build time, so this
 * needs no schema. See docs/lcp-performance-plan.md.
 */
export async function getCaptchaToken() {
  return new Promise<string | null>((resolve) => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    if (!siteKey) {
      resolve(null);
      return;
    }

    grecaptcha.ready(async () => {
      const token = await grecaptcha.execute(siteKey, {
        action: "contact_us",
      });

      resolve(token);
    });
  });
}
