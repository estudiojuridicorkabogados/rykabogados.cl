"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";

import { classNames } from "@/lib/utils/classNames";

import { ChatboatFloatingButton } from "./ChatboatFloatingButton";
import { ChatbotInput } from "./ChatbotInput";

export const SupportChatbot = () => {
  const { messages, sendMessage } = useChat();
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const endRef = useRef<HTMLDivElement | null>(null);

  // Increment unread on new assistant message if panel is closed
  const lastAssistantMsgId = useMemo(
    () => [...messages].reverse().find((m) => m.role === "assistant")?.id,
    [messages]
  );
  useEffect(() => {
    if (!open && lastAssistantMsgId) setUnread((c) => c + 1);
  }, [lastAssistantMsgId, open]);

  // Auto-scroll to latest message when open
  useEffect(() => {
    if (!open) return;
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, open]);

  const onSubmit = (query: string) => {
    sendMessage({ text: query });

    // When user sends a message, mark as read
    if (!open) setUnread(0);
  };

  const onToggleOpen = () => {
    setOpen((v) => !v);
    if (!open) setUnread(0);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Panel */}
      <div
        className={classNames([
          "origin-bottom-right transition-all duration-200 ease-out",
          {
            "opacity-100 translate-y-0 scale-100 pointer-events-auto": open,
            "opacity-0 translate-y-2 scale-95 pointer-events-none": !open,
          },
          "w-[22rem] sm:w-[24rem] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col",
        ])}
        aria-hidden={!open}
        role="dialog"
        aria-label="Support chat"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-indigo-600 text-white">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              {/* Chat icon */}
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.5-4.5A4 4 0 0 1 4 15V7a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4z" />
              </svg>
            </span>
            <div className="leading-tight">
              <div className="font-semibold">Support</div>
              <div className="text-xs opacity-80">
                We typically reply in minutes
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setUnread(0);
            }}
            className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label="Close chat"
          >
            {/* X icon */}
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 py-3 bg-gradient-to-b from-white to-gray-50">
          <div
            className="space-y-2"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.map((m) => {
              // Determine bubble alignment by role
              const isUser = m.role === "user";
              // Render text parts only
              const text = m.parts
                .map((p) => (p.type === "text" ? p.text : ""))
                .join("")
                .trim();

              if (!text) return null;

              return (
                <div
                  key={m.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={[
                      "max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm",
                      isUser
                        ? "bg-indigo-600 text-white rounded-br-md"
                        : "bg-white text-gray-900 border border-gray-200 rounded-bl-md",
                    ].join(" ")}
                  >
                    {text}
                  </div>
                </div>
              );
            })}
            <div ref={endRef} />
          </div>
        </div>

        <ChatbotInput onSubmit={onSubmit} />
      </div>

      {/* Floating Launcher Button */}
      <ChatboatFloatingButton
        onToggleOpen={onToggleOpen}
        open={open}
        unread={unread}
      />
    </div>
  );
};
