import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

type EmailRecipient = string | string[];

export interface EmailOptions {
  to: EmailRecipient;
  subject: string;
  cc?: EmailRecipient;
  html: string;
  from: string;
  replyTo?: string;
  oauth2Client: OAuth2Client;
}

/**
 * Encodes subject for RFC 2047 when it contains non-ASCII (fixes mojibake in clients).
 */
function encodeSubject(subject: string): string {
  if (!/[\u0080-\uFFFF]/.test(subject)) return subject;
  return `=?UTF-8?B?${Buffer.from(subject, "utf-8").toString("base64")}?=`;
}

function formatRecipients(recipients: EmailRecipient): string {
  return Array.isArray(recipients) ? recipients.join(", ") : recipients;
}

/**
 * Sends an email using Gmail API
 */
export async function sendEmail({
  to,
  subject,
  html,
  from,
  cc,
  replyTo,
  oauth2Client,
}: EmailOptions) {
  // Create the email message in RFC 2822 format
  const messageParts = [
    `From: ${from || "RYK Abogados"}`,
    `To: ${formatRecipients(to)}`,
    ...(cc ? [`Cc: ${formatRecipients(cc)}`] : []),
    ...(replyTo ? [`Reply-To: ${replyTo}`] : []),
    `Subject: ${encodeSubject(subject)}`,
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
