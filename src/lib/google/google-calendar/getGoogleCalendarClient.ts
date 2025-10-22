import { getVercelOidcToken } from "@vercel/functions/oidc";
import { ExternalAccountClient, JWT, OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

import { env } from "@/lib/env";

const GCP_PROJECT_NUMBER = env.GCP_PROJECT_NUMBER;
const GCP_SERVICE_ACCOUNT_EMAIL = env.GCP_SERVICE_ACCOUNT_EMAIL;
const GCP_WORKLOAD_IDENTITY_POOL_ID = env.GCP_WORKLOAD_IDENTITY_POOL_ID;
const GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID =
  env.GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID;

const CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar";
const DELEGATED_USER_EMAIL = "notificaciones@ryoasociados.cl";

/**
 * Creates an authenticated Google Calendar client using WIF (ADC).
 */
export async function getGoogleCalendarClient() {
  const wifClient = ExternalAccountClient.fromJSON({
    type: "external_account",
    audience: `//iam.googleapis.com/projects/${GCP_PROJECT_NUMBER}/locations/global/workloadIdentityPools/${GCP_WORKLOAD_IDENTITY_POOL_ID}/providers/${GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID}`,
    subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
    token_url: "https://sts.googleapis.com/v1/token",
    service_account_impersonation_url: `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${GCP_SERVICE_ACCOUNT_EMAIL}:generateAccessToken`,
    subject_token_supplier: {
      // Use the Vercel OIDC token as the subject token
      getSubjectToken: getVercelOidcToken,
    },
    scopes: ["https://www.googleapis.com/auth/iam"],
  });

  if (!wifClient) {
    throw new Error("Authentication client not initialized.");
  }

  const accessTokenResponse = await wifClient.getAccessToken();
  if (!accessTokenResponse.token) {
    throw new Error("Failed to get access token from WIF");
  }

  const now = Math.floor(Date.now() / 1000);
  const jwtPayload = {
    iss: GCP_SERVICE_ACCOUNT_EMAIL,
    sub: DELEGATED_USER_EMAIL, // This is the key - act as this user
    scope: CALENDAR_SCOPE,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  const signResponse = await fetch(
    `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${GCP_SERVICE_ACCOUNT_EMAIL}:signJwt`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessTokenResponse.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payload: JSON.stringify(jwtPayload),
      }),
    }
  );

  if (!signResponse.ok) {
    const error = await signResponse.text();
    throw new Error(`Failed to sign JWT: ${error}`);
  }

  const { signedJwt } = await signResponse.json();

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: signedJwt,
    }),
  });

  if (!tokenResponse.ok) {
    const error = await tokenResponse.text();
    throw new Error(`Failed to exchange JWT for token: ${error}`);
  }

  const { access_token, expires_in } = await tokenResponse.json();

  // Step 6: Create JWT auth client with the delegated token
  const oauth2Client = new OAuth2Client();
  oauth2Client.setCredentials({
    access_token: access_token,
    token_type: "Bearer",
    expiry_date: Date.now() + (expires_in || 3600) * 1000,
  });

  return google.calendar({ version: "v3", auth: oauth2Client });
}
