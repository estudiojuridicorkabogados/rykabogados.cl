import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, isStepCount, streamText, UIMessage } from "ai";

import "server-only";

import { processUserInfoTool } from "./tools/processUserInfoTool";
import { provideWhatsappContactTool } from "./tools/provideWhatsappContactTool";
import { findRelevantContent } from "./embeddings";

export async function runLegalChatBot(
  messages: UIMessage[],
  systemPrompt: string
) {
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

  // Slightly stronger system instruction to synthesize and not mention tool invocation.
  // The hidden KB summary rides along here: the SDK rejects system messages inside
  // `messages`, so system-level context must go through `instructions`.
  const systemWithNoToolMention = [
    systemPrompt,
    "\n\nIMPORTANT: Synthesize and summarize KB content concisely in Spanish.",
    `\n\n${kbNote}`,
  ].join(" ");

  const modelMessages = await convertToModelMessages(messages);

  return streamText({
    model: openai("gpt-5.4-mini"),
    instructions: systemWithNoToolMention,
    stopWhen: isStepCount(5),
    tools: {
      processUserInfo: processUserInfoTool,
      provideWhatsappContact: provideWhatsappContactTool,
    },
    messages: modelMessages,
  });
}
