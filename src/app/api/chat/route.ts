import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, tool, UIMessage } from "ai";
import { z } from "zod";

import { findRelevantContent } from "@/lib/ai/embeddings";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const SYSTEM_PROMPT = `You are a helpful assistant of the RyK Abogados law firm. 
Check your knowledge base before answering any questions.
When possible, respond to questions using information from tool calls.
If you can not retrieve information from the tool calls, then you should ask the user for their details, specifically: 
their full name, email and phone number.
Once they have provided this information, use the processUserInfo tool to process them; if the user provided it, include the reason for contacting us as well.
DO NOT try to get the information straightaway. If the customer mentions they have a generic question, first make sure to get what the question is and try to reply
with the knowledge you have from the context. Try to get deeper into the issue if it's too generic. If you find that it is not possible to help through the knowledge,
then go ahead and ask the suer contact's details.
`;

export async function POST(req: Request) {
  const { messages, conversationId }: { messages: UIMessage[]; conversationId: string } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: SYSTEM_PROMPT,
    tools: {
      getInformation: tool({
        description: `get information from your knowledge base to answer questions.`,
        inputSchema: z.object({
          question: z.string().describe("the users question"),
        }),
        execute: async ({ question }) => findRelevantContent(question),
      }),
      processUserInfo: tool({
        description: `process user information by storing it in the database.`,
        inputSchema: z.object({
          fullName: z.string().describe("the user's full name"),
          email: z.string().describe("the user's email address"),
          phoneNumber: z.string().describe("the user's phone number"),
          legalIssue: z
            .string()
            .describe("a brief description of the user's legal issue"),
        }),
        execute: async ({ fullName, email, phoneNumber, legalIssue }) => {
          console.log(
            "REQUEST FORM USER",
            fullName,
            email,
            phoneNumber,
            legalIssue
          );

          // @TODO, add to ManyChat
          // Store user information in the database
          // await db.insert(userInformationTable).values({
          //   fullName,
          //   email,
          //   phoneNumber,
          //   legalIssue,
          // });
        },
      }),
    },
    messages: convertToModelMessages(messages),
    // onFinish: async ({ text, toolResults }) => {
    //   try {
    //     await saveTurn({
    //       conversationId,
    //       userText: lastUserText,
    //       assistantText: text, // full assistant text
    //       tools: (toolResults ?? []).map((tr) => ({
    //         name: tr.toolName,
    //         input: tr.args,
    //         result: tr.result,
    //       })),
    //     });
    //   } catch (e) {
    //     console.error("Failed to save chat turn:", e);
    //   }
    // },
  });

  return result.toUIMessageStreamResponse();
}
