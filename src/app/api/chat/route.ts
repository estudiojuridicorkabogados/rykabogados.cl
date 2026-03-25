import { UIMessage } from "ai";

import { runLegalChatBot } from "@/lib/ai/rk-bot/bot";
import { WEBSITE_SYSTEM_PROMPT } from "@/lib/ai/rk-bot/prompts";

// Allow streaming responses up to 45 seconds
export const maxDuration = 45;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const result = await runLegalChatBot(messages, WEBSITE_SYSTEM_PROMPT);

  return result.toUIMessageStreamResponse();
}
