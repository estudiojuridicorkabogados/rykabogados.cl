import { CONTACTO_EMAIL } from "@/lib/utils/constants";

import { getOAuth2Client } from "../getOauth2Client";

export async function getCalendarOAuth2Client() {
  return await getOAuth2Client({
    delegatedUserEmail: CONTACTO_EMAIL,
    scope: "https://www.googleapis.com/auth/calendar",
  });
}
