import { tool } from "ai";
import { z } from "zod";

import { getGmailOAuth2Client } from "@/lib/google/gmail/getGmailOAuth2Client";
import { sendEmail } from "@/lib/google/gmail/sendEmail";
import { CAMILA_EMAIL, CONTACTO_EMAIL } from "@/lib/utils/constants";

import "server-only";

export interface ProcessUserInfoArgs {
  fullName: string;
  email: string;
  phoneNumber: string;
  legalIssue: string;
  fullContext: string;
}

const PROCESS_USER_INFO_SCHEMA = z.object({
  fullName: z.string().describe("the user's full name"),
  email: z.string().describe("the user's email address"),
  phoneNumber: z.string().describe("the user's phone number"),
  legalIssue: z
    .string()
    .describe("a brief description of the user's legal issue"),
  fullContext: z
    .string()
    .describe(
      "the full context of the user's legal issue, this includes all the messages from the conversation"
    ),
});

/**
 * Built per request rather than exported as a singleton, so the Caso code can
 * be closed over instead of asked of the model.
 *
 * The code identifies the visit in the Google Sheet, next to the campaign that
 * paid for it. Putting it in the input schema would make it something the model
 * has to be told and then remember to pass — it would hallucinate one, or drop
 * it, and a wrong code is worse than none because it points at someone else's
 * row. The tool never sees the conversation's Caso code, so it cannot get it
 * wrong.
 */
export function createProcessUserInfoTool(sessionCode: string) {
  return tool({
    description: `process user information by sending an email to the studio. Also send one to the user as a confrimation`,
    inputSchema: PROCESS_USER_INFO_SCHEMA,
    execute: (args: ProcessUserInfoArgs) => processUserInfo(args, sessionCode),
  });
}

// Exported for testing purposes only
export async function processUserInfo(
  args: ProcessUserInfoArgs,
  sessionCode = ""
) {
  const { fullName, email, phoneNumber, legalIssue, fullContext } = args;

  try {
    const gmailOAuth2Client = await getGmailOAuth2Client();

    await Promise.all([
      sendEmail({
        to: email,
        subject: "Gracias por contactarnos - RK Abogados",
        from: CONTACTO_EMAIL,
        replyTo: CONTACTO_EMAIL,
        html: `
        <h2>Hola ${fullName},</h2>
        <p>Hemos recibido tu solicitud de contacto.</p>
        <p>Muchas gracias por tu interés en nuestro servicio. Nos pondremos en contacto contigo lo antes posible.</p>
        <br>
        <p>Saludos,<br><strong>RK Abogados</strong></p>
      `,
        oauth2Client: gmailOAuth2Client,
      }),
      sendEmail({
        to: CAMILA_EMAIL,
        subject: "Nuevo mensaje de usuario",
        from: CONTACTO_EMAIL,
        replyTo: CONTACTO_EMAIL,
        html: `
        <h2>Nuevo mensaje de usuario</h2>
        <p>Nombre: ${fullName}</p>
        <p>Email: ${email}</p>
        <p>Teléfono: ${phoneNumber}</p>
        ${sessionCode ? `<p>Caso: ${sessionCode}</p>` : ""}
        <p>Causal de despido: ${legalIssue}</p>
        <p>Contexto: ${fullContext}</p>
      `,
        oauth2Client: gmailOAuth2Client,
      }),
    ]);
  } catch (error) {
    console.error("Error notifying studio and user", error);
    return {
      success: false,
      message: "Error notifying studio and user",
    };
  }

  return {
    success: true,
    message: "User information processed successfully",
  };
}
