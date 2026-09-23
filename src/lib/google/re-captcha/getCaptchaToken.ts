/**
 * How long a visitor waits for a token before we give up and tell them.
 * reCAPTCHA normally answers in well under a second; ten covers a slow phone
 * on a bad connection without leaving anyone watching a spinner.
 */
const TOKEN_TIMEOUT_MS = 10_000;
const SCRIPT_POLL_MS = 100;

/**
 * What all three forms show when the captcha fails, whether no token could be
 * had or the server refused it. reCAPTCHA v3 is invisible, so "completa el
 * CAPTCHA" asks for something there is nothing to complete; this tells the
 * visitor to retry, and gives them a way through if retrying fails too.
 */
export const CAPTCHA_FAILED_MESSAGE =
  "No pudimos verificar el envío. Por favor, inténtalo de nuevo o escríbenos por WhatsApp.";

/**
 * Resolves once `grecaptcha` exists. The script is mounted with
 * `lazyOnload`, so a visitor who submits quickly can get here before it has
 * loaded — and referencing an undeclared global throws. Rejects once the
 * token deadline has passed, so a blocked script does not leave a poll
 * running for the rest of the visit.
 */
function waitForScript(): Promise<void> {
  const deadline = Date.now() + TOKEN_TIMEOUT_MS;

  return new Promise((resolve, reject) => {
    const check = () => {
      if (typeof grecaptcha !== "undefined") {
        resolve();
        return;
      }

      if (Date.now() >= deadline) {
        reject(new Error("reCAPTCHA script did not load"));
        return;
      }

      setTimeout(check, SCRIPT_POLL_MS);
    };

    check();
  });
}

async function requestToken(siteKey: string): Promise<string> {
  await waitForScript();

  return new Promise<string>((resolve, reject) => {
    grecaptcha.ready(() => {
      grecaptcha
        .execute(siteKey, { action: "contact_us" })
        .then(resolve, reject);
    });
  });
}

/**
 * Reads the site key straight from `process.env` rather than through
 * `@/lib/env`. This module is imported by client components, and `@/lib/env`
 * does `import "dotenv/config"` — which, once it is reachable from the client
 * graph, drags dotenv and the Node polyfills (Buffer, crypto/elliptic) into
 * the browser bundle: 684KB raw, 183KB gzipped, on /contacto and both
 * habla-con-nosotros pages. Next inlines NEXT_PUBLIC_* at build time, so this
 * needs no schema. See docs/lcp-performance-plan.md.
 *
 * Always settles, and never throws: `null` means no token, for whatever
 * reason. It used to await `execute` inside the `ready` callback with nothing
 * to catch it, so a reCAPTCHA timeout or a blocked request left this promise
 * pending forever — and the booking forms spinning forever, with no message
 * and no `rk_form_fail`. Reproduced on 23 September 2026. Callers treat
 * `null` as a failed send the visitor is told about.
 */
export async function getCaptchaToken(): Promise<string | null> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    return null;
  }

  let timer: ReturnType<typeof setTimeout> | undefined;

  const timeout = new Promise<null>((resolve) => {
    timer = setTimeout(() => resolve(null), TOKEN_TIMEOUT_MS);
  });

  try {
    return await Promise.race([requestToken(siteKey), timeout]);
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
