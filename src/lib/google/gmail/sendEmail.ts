import { getGmailClient } from "./getGmailClient";

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
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
}: EmailOptions) {
  const gmail = await getGmailClient();

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

  // Send the email
  const response = await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: encodedMessage,
    },
  });

  return response.data;
}
