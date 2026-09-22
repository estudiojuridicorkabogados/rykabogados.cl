import { MockLanguageModelV4 } from "ai/test";
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
    new MockLanguageModelV4({
      doStream: async () => ({
        stream: new ReadableStream({
          start(controller) {
            // V4 requires explicit text-start/text-end framing around deltas.
            controller.enqueue({ type: "text-start" as const, id: "text-1" });
            controller.enqueue({
              type: "text-delta" as const,
              id: "text-1",
              delta: "Hola, ¿en qué puedo ayudarte?",
            });
            controller.enqueue({ type: "text-end" as const, id: "text-1" });
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
const { processUserInfo, createProcessUserInfoTool } =
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

describe("createProcessUserInfoTool", () => {
  const args = {
    fullName: "Juan Pérez",
    email: "juan@example.com",
    phoneNumber: "+56912345678",
    legalIssue: "Despido injustificado",
    fullContext: "El usuario fue despedido sin aviso.",
  };

  it("has an execute function", () => {
    expect(typeof createProcessUserInfoTool("ABC123").execute).toBe("function");
  });

  /**
   * The whole point of the factory: the model is never asked for the Caso
   * code, so it cannot hallucinate or drop it. If this ever regresses, a
   * chatbot lead stops being traceable to the campaign that paid for it.
   */
  it("puts the Caso code in the studio email without asking the model for it", async () => {
    const sent: { to: string; html: string }[] = [];
    mock.module("@/lib/google/gmail/sendEmail", () => ({
      sendEmail: async ({ to, html }: { to: string; html: string }) => {
        sent.push({ to, html });
      },
    }));

    const { createProcessUserInfoTool: createFresh } =
      await import("../tools/processUserInfoTool");

    const execute = createFresh("ABC123").execute;
    if (!execute) throw new Error("execute is undefined");

    await execute(args, {
      messages: [],
      toolCallId: "test-id",
      abortSignal: new AbortController().signal,
    });

    const studioEmail = sent.find((e) => e.to !== args.email);
    expect(studioEmail?.html).toContain("Caso: ABC123");

    // The visitor's confirmation stays as it was — the code is an internal
    // reference, not something to hand back to them.
    const visitorEmail = sent.find((e) => e.to === args.email);
    expect(visitorEmail?.html).not.toContain("ABC123");
  });

  it("omits the Caso line when the browser had no code to send", async () => {
    const sent: { to: string; html: string }[] = [];
    mock.module("@/lib/google/gmail/sendEmail", () => ({
      sendEmail: async ({ to, html }: { to: string; html: string }) => {
        sent.push({ to, html });
      },
    }));

    const { processUserInfo: processFresh } =
      await import("../tools/processUserInfoTool");

    await processFresh(args, "");

    expect(sent.every((e) => !e.html.includes("Caso:"))).toBe(true);
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
  it("streams a response to completion", async () => {
    const messages = [
      {
        id: "1",
        role: "user" as const,
        parts: [{ type: "text" as const, text: "Hola" }],
      },
    ];

    const result = await runLegalChatBot(messages, WEBSITE_SYSTEM_PROMPT);

    // Drain the stream: streamText validates the prompt lazily, so a bad prompt
    // only surfaces once the stream is consumed.
    const parts = [];
    for await (const part of result.stream) parts.push(part);

    expect(await result.text).toBe("Hola, ¿en qué puedo ayudarte?");
    expect(parts.length).toBeGreaterThan(0);
  });
});
