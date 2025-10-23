import { getOAuth2Client } from "../getOauth2Client";

const DELEGATED_USER_EMAIL = "notificaciones@ryoasociados.cl";

export async function getGmailOAuth2Client() {
  return await getOAuth2Client({
    delegatedUserEmail: DELEGATED_USER_EMAIL,
    scope: "https://www.googleapis.com/auth/gmail.send",
  });
}
