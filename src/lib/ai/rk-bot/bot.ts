import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, isStepCount, streamText, UIMessage } from "ai";

import "server-only";

import { findRelevantContent } from "./embeddings";
import { createProcessUserInfoTool } from "./tools/processUserInfoTool";
import { provideWhatsappContactTool } from "./tools/provideWhatsappContactTool";

export async function runLegalChatBot(
  messages: UIMessage[],
  systemPrompt: string,
  /**
   * The visitor's Caso code, threaded through so a lead captured here lands in
   * the studio email quoting the same reference as the Sheet row. Empty when
   * the browser had none to send; the email simply omits the line.
   */
  sessionCode = ""
) {
  // find last user message to query the KB
  const lastUserMessage = messages.toReversed().find((m) => m.role === "user");

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
      processUserInfo: createProcessUserInfoTool(sessionCode),
      provideWhatsappContact: provideWhatsappContactTool,
    },
    messages: modelMessages,
  });
}
