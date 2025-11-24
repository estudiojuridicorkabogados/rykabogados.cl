import { openai } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  tool,
  UIMessage,
} from "ai";
import { z } from "zod";

import { findRelevantContent } from "@/lib/ai/embeddings";
import { getGmailOAuth2Client } from "@/lib/google/gmail/getGmailOAuth2Client";
import { sendEmail } from "@/lib/google/gmail/sendEmail";
import { CAMILA_EMAIL, CONTACTO_EMAIL } from "@/lib/utils/constants";

// Allow streaming responses up to 45 seconds
export const maxDuration = 45;

// EXMAMPLE: https://github.com/vercel-labs/ai-sdk-preview-rag/blob/main/app/(preview)/api/chat/route.ts

const SYSTEM_PROMPT = `
You are a helpful assistant of the RK Abogados law firm. 
ONLY ANSWER IN SPANISH. NEVER ANSWER IN ENGLISH.
ONLY ANSWER QUESTIONS RELATED TO LEGAL ADVICE or the RK Abogados law firm. 
If the user asks something not related to legal advice or RK Abogados, politely refuse to answer.
If the question is too generic, ask the user to clarify. 
Keep responses short and concise.
Use your abilities as a reasoning machine to answer questions based on the information you do have.
If you can not retrieve information and need to ask for more information, you should ask the user for their details, specifically:
their full name, email and phone number.

Once they have provided this information, use the processUserInfo tool to process them; if the user provided it, include the reason for contacting us as well.
DO NOT try to get the information straightaway.
If the customer mentions they have a generic question, first make sure to get what the question is and try to reply
with the knowledge you have from the context.
Try to get deeper into the issue if it's too generic. If you find that it is not possible to help through the knowledge, then go ahead and ask the user's contact details.

If people ask about a contact email, give them this: contacto@rkabogados.cl
If people ask about a contact phone number, give them this: +56 2 2364 4258 (fixed phone number) - +56 9 8639 5780 (mobile phone number)
If people ask about your address, give them this: Padre Mariano 82, oficina 704, Providencia
If people ask to speak on WhatsApp, or mentions WhatsApp, or wants to chat on WhatsApp, use the provideWhatsappContact tool.
`;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[]; conversationId: string } =
    await req.json();

  // find last user message to query the KB
  const lastUserMessage = [...messages]
    .reverse()
    .find((m) => m.role === "user");

  const messageContent = (lastUserMessage?.parts ?? []).find(
    ({ type }) => type === "text"
  );

  // This check is redundant but it is necessary to keep TS happy
  const question =
    messageContent?.type === "text" ? (messageContent.text ?? "").trim() : "";

  // Server-side RAG: fetch relevant content BEFORE calling the model
  const kbResults = question ? await findRelevantContent(question) : [];
  const kbSummary = kbResults.length
    ? kbResults.map((item, idx) => `${idx + 1}. ${item.content}`).join("\n")
    : "";

  // Hidden/internal summary to inject into the model context
  const kbNote = kbSummary
    ? `INTERNAL_KB_SUMMARY:\n${kbSummary}`
    : `INTERNAL_KB_SUMMARY:\n<NO_RELEVANT_RESULTS_FOUND>`;

  // Slightly stronger system instruction to synthesize and not mention tool invocation
  const systemWithNoToolMention = [
    SYSTEM_PROMPT,
    "\n\nIMPORTANT: Synthesize and summarize KB content concisely in Spanish.",
  ].join(" ");

  // Convert messages and append the hidden KB summary as a system message
  const modelMessages = convertToModelMessages([
    ...messages,
    { role: "system", parts: [{ type: "text", text: kbNote }] },
  ]);

  // Call the model WITHOUT exposing the getInformation tool so it won't stream tool-invocation text.
  // Keep processUserInfo only if you need to persist contact details via a tool.
  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: systemWithNoToolMention,
    stopWhen: stepCountIs(5),
    tools: {
      processUserInfo: tool({
        description: `process user information by sending an email to the studio. Also send one to the user as a confrimation`,
        inputSchema: z.object({
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
        }),
        execute: processUserInfo,
      }),
      provideWhatsappContact: tool({
        description: `Provide the WhatsApp contact number for the user to chat with us.`,
        inputSchema: z.object({}),
        execute: async () => {
          return {
            whatsappNumber: "+56 9 8639 5780",
          };
        },
      }),
    },
    messages: modelMessages,
  });

  return result.toUIMessageStreamResponse();
}

interface ProcessUserInfoArgs {
  fullName: string;
  email: string;
  phoneNumber: string;
  legalIssue: string;
  fullContext: string;
}

async function processUserInfo(args: ProcessUserInfoArgs) {
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
