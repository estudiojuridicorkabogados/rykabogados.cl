import { getVercelOidcToken } from "@vercel/functions/oidc";
import { ExternalAccountClient } from "google-auth-library";
import { google } from "googleapis";

import { env } from "../env";

const GCP_PROJECT_NUMBER = env.GCP_PROJECT_NUMBER;
const GCP_SERVICE_ACCOUNT_EMAIL = env.GCP_SERVICE_ACCOUNT_EMAIL;
const GCP_WORKLOAD_IDENTITY_POOL_ID = env.GCP_WORKLOAD_IDENTITY_POOL_ID;
const GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID =
  env.GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID;

const CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar.events";

const authClient = ExternalAccountClient.fromJSON({
  type: "external_account",
  audience: `//iam.googleapis.com/projects/${GCP_PROJECT_NUMBER}/locations/global/workloadIdentityPools/${GCP_WORKLOAD_IDENTITY_POOL_ID}/providers/${GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID}`,
  subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
  token_url: "https://sts.googleapis.com/v1/token",
  service_account_impersonation_url: `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${GCP_SERVICE_ACCOUNT_EMAIL}:generateAccessToken`,
  subject_token_supplier: {
    // Use the Vercel OIDC token as the subject token
    getSubjectToken: getVercelOidcToken,
  },
  scopes: [CALENDAR_SCOPE],
});

/**
 * Creates an authenticated Google Calendar client using WIF (ADC).
 */
export async function getGoogleCalendarClient() {
  if (!authClient) {
    throw new Error("Authentication client not initialized.");
  }

  return google.calendar({ version: "v3", auth: authClient });
}
