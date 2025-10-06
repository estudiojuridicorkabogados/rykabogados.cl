"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";

import { classNames } from "@/lib/utils/classNames";

import { ChatIcon } from "../icons/Chat";
import { XIcon } from "../icons/X";

import { ChatboatFloatingButton } from "./ChatboatFloatingButton";
import { ChatbotInput } from "./ChatbotInput";
import { InitialBotMessage } from "./InitialBotMessage";
import { Message } from "./Message";
import { MessageLoading } from "./MessageLoading";

export const SupportChatbot = () => {
  const { messages, status, sendMessage } = useChat();
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

  useEffect(() => {
    if (!open) return;
    
    // Play notification sound for new messages
    const audio = new Audio('/sounds/bot-pop-up.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {
      // Handle autoplay restrictions silently
    });
    // Auto-scroll to latest message when open
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

  const handleClose = () => {
    setOpen(false);
    setUnread(0);
  };

  return (
    <>
      {/* Chat Panel */}
      <div
        className={classNames([
          "fixed bottom-4 right-4 z-50 origin-bottom-right transition-all duration-200 ease-out",
          "w-[22rem] sm:w-[24rem] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col",
          {
            "opacity-100 translate-y-0 scale-100 pointer-events-auto": open,
            "opacity-0 translate-y-2 scale-95 pointer-events-none": !open,
          },
        ])}
        aria-hidden={!open}
        role="dialog"
        aria-label="Support chat"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-primary text-white">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <ChatIcon />
            </span>
            <div className="leading-tight">
              <div className="font-semibold">RyK Abogados</div>
              <div className="text-xs opacity-80">
                Solemos responder en minutos
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label="Close chat"
          >
            <XIcon />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 py-3 bg-gradient-to-b from-white to-gray-50">
          <div
            className="space-y-2"
            aria-live="polite"
            aria-relevant="additions"
          >
            <InitialBotMessage open={open} />

            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}

            {status === "submitted" && <MessageLoading />}

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
    </>
  );
};
