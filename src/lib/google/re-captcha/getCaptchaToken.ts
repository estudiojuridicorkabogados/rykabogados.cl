import { env } from "@/lib/env";

export async function getCaptchaToken() {
  return new Promise<string | null>((resolve) => {
    grecaptcha.ready(async () => {
      const siteKey = env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

      if (!siteKey) {
        resolve(null);
        return;
      }

      const token = await grecaptcha.execute(siteKey, {
        action: "contact_us",
      });

      resolve(token);
    });
  });
}
