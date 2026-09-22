import {
  createUIMessageStreamResponse,
  toUIMessageStream,
  UIMessage,
} from "ai";

import { runLegalChatBot } from "@/lib/ai/rk-bot/bot";
import { WEBSITE_SYSTEM_PROMPT } from "@/lib/ai/rk-bot/prompts";

// Allow streaming responses up to 45 seconds
export const maxDuration = 45;

/**
 * The Caso code is a six-character alphanumeric reference minted in the
 * browser, and it ends up interpolated into an HTML email the firm reads.
 * Anything arriving here is client-controlled, so it is matched against the
 * shape rather than trusted and escaped — a value that is not a Caso code is
 * not worth repairing, and dropping it only costs the email one line.
 */
const SESSION_CODE = /^[A-Za-z0-9]{1,12}$/;

function readSessionCode(value: unknown): string {
  return typeof value === "string" && SESSION_CODE.test(value) ? value : "";
}

export async function POST(req: Request) {
  const {
    messages,
    sessionCode,
  }: {
    messages: UIMessage[];
    sessionCode?: unknown;
  } = await req.json();

  const result = await runLegalChatBot(
    messages,
    WEBSITE_SYSTEM_PROMPT,
    readSessionCode(sessionCode)
  );

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
