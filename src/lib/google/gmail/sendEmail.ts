import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from: string;
  replyTo?: string;
  oauth2Client: OAuth2Client;
}

/**
 * Sends an email using Gmail API
 */
export async function sendEmail({
  to,
  subject,
  html,
  from,
  replyTo,
  oauth2Client,
}: EmailOptions) {
  // Create the email message in RFC 2822 format
  const messageParts = [
    `From: ${from || "RYK Abogados"}`,
    `To: ${to}`,
    ...(replyTo ? [`Reply-To: ${replyTo}`] : []),
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=utf-8",
    "",
    html,
  ];

  const message = messageParts.join("\n");

  // Encode the message in base64url format
  const encodedMessage = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const response = await google
    .gmail({ version: "v1", auth: oauth2Client })
    .users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });

  return response.data;
}
