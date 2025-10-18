import { env } from "@/lib/env";

const BASE_URL = "https://www.google.com/recaptcha/api/siteverify";

export async function verifyCaptcha(token: string): Promise<boolean> {
  const secretKey = env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    return false;
  }

  const url = new URL(`${BASE_URL}`);
  url.searchParams.append("secret", secretKey);
  url.searchParams.append("response", token);

  const response = await fetch(url, { method: "POST" });

  const data = await response.json();

  return data.success;
}
