import { MockLanguageModelV3 } from "ai/test";
import { describe, expect, it, mock, spyOn } from "bun:test";

// Mock server-only (throws in non-Next.js environments)
mock.module("server-only", () => ({}));

// Mock external dependencies before importing the module under test
mock.module("@/lib/ai/rk-bot/embeddings", () => ({
  findRelevantContent: async () => [],
}));

mock.module("@/lib/google/gmail/getGmailOAuth2Client", () => ({
  getGmailOAuth2Client: async () => ({}),
}));

mock.module("@/lib/google/gmail/sendEmail", () => ({
  sendEmail: async () => {},
}));

// Mock the openai provider so no real API calls are made
mock.module("@ai-sdk/openai", () => ({
  openai: () =>
    new MockLanguageModelV3({
      doStream: async () => ({
        stream: new ReadableStream({
          start(controller) {
            controller.enqueue({
              type: "text-delta" as const,
              id: "text-1",
              delta: "Hola, ¿en qué puedo ayudarte?",
            });
            controller.enqueue({
              type: "finish" as const,
              finishReason: { unified: "stop" as const, raw: undefined },
              usage: {
                inputTokens: {
                  total: 10,
                  noCache: 10,
                  cacheRead: undefined,
                  cacheWrite: undefined,
                },
                outputTokens: { total: 10, text: 10, reasoning: undefined },
              },
            });
            controller.close();
          },
        }),
        rawCall: { rawPrompt: null, rawSettings: {} },
      }),
    }),
}));

// Import the modules under test AFTER all mocks are set up
const { processUserInfo, processUserInfoTool } =
  await import("../tools/processUserInfoTool");
const { provideWhatsappContactTool } =
  await import("../tools/provideWhatsappContactTool");
const { runLegalChatBot } = await import("../bot");
const { WEBSITE_SYSTEM_PROMPT } = await import("../prompts");

// ─── processUserInfo ──────────────────────────────────────────────────────────

describe("processUserInfo", () => {
  const args = {
    fullName: "Juan Pérez",
    email: "juan@example.com",
    phoneNumber: "+56912345678",
    legalIssue: "Despido injustificado",
    fullContext: "El usuario fue despedido sin aviso.",
  };

  it("returns success when emails are sent correctly", async () => {
    const result = await processUserInfo(args);
    expect(result).toEqual({
      success: true,
      message: "User information processed successfully",
    });
  });

  it("returns failure when sendEmail throws", async () => {
    mock.module("@/lib/google/gmail/sendEmail", () => ({
      sendEmail: async () => {
        throw new Error("SMTP error");
      },
    }));

    const consoleSpy = spyOn(console, "error").mockImplementation(() => {});

    // Re-import to pick up the new mock
    const { processUserInfo: processUserInfoFresh } =
      await import("../tools/processUserInfoTool");
    const result = await processUserInfoFresh(args);

    consoleSpy.mockRestore();

    expect(result).toEqual({
      success: false,
      message: "Error notifying studio and user",
    });
  });
});

// ─── processUserInfoTool ──────────────────────────────────────────────────────

describe("processUserInfoTool", () => {
  it("has an execute function", () => {
    expect(typeof processUserInfoTool.execute).toBe("function");
  });
});

// ─── provideWhatsappContactTool ───────────────────────────────────────────────

describe("provideWhatsappContactTool", () => {
  it("returns the WhatsApp number", async () => {
    const execute = provideWhatsappContactTool.execute;
    if (!execute) throw new Error("execute is undefined");
    const result = await execute(
      {},
      {
        messages: [],
        toolCallId: "test-id",
        abortSignal: new AbortController().signal,
      }
    );
    expect(result).toEqual({ whatsappNumber: "+56 9 8639 5780" });
  });
});

// ─── runLegalChatBot ──────────────────────────────────────────────────────────

describe("runLegalChatBot", () => {
  it("returns a result with toUIMessageStreamResponse", async () => {
    const messages = [
      {
        id: "1",
        role: "user" as const,
        parts: [{ type: "text" as const, text: "Hola" }],
      },
    ];

    const result = await runLegalChatBot(messages, WEBSITE_SYSTEM_PROMPT);
    expect(typeof result.toUIMessageStreamResponse).toBe("function");
  });
});
