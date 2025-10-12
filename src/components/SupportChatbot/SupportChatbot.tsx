"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import Image from "next/image";

import { classNames } from "@/lib/utils/classNames";

import { ChatboatFloatingButton } from "./ChatboatFloatingButton";
import { ChatbotInput } from "./ChatbotInput";
import { InitialBotMessage } from "./InitialBotMessage";
import { Message } from "./Message";
import { MessageLoading } from "./MessageLoading";
import { PlusIcon } from "../icons/Plus";
import { stat } from "fs";

function useDebounceCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}

export const SupportChatbot = () => {
  const { messages, status, sendMessage } = useChat();
  const [open, setOpen] = useState(false);

  const [unread, setUnread] = useState(0);
  const endRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  // Increment unread on new assistant message if panel is closed
  const lastAssistantMsgId = useMemo(
    () => [...messages].reverse().find((m) => m.role === "assistant")?.id,
    [messages]
  );

  useEffect(() => {
    if (!open && lastAssistantMsgId) setUnread((c) => c + 1);
  }, [lastAssistantMsgId, open]);

  useEffect(() => {
    if (status === 'submitted' && open) {
      handleNewMessageAdded();
    }
  }, [open, status]);
  
  const handleNewMessageAdded = useDebounceCallback(() => {
    console.log("New message added");
    // Play notification sound for new messages
    const audio = new Audio("/sounds/bot-pop-up.mp3");
    audio.volume = 0.5;
    audio.play().catch(() => {
      // Handle autoplay restrictions silently
    });

    // Auto-scroll to latest message when open
    // endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });

    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, 100);

  useEffect(() => {
    if (!open) return;
    handleNewMessageAdded();
  }, [messages, handleNewMessageAdded]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        e.preventDefault();
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [open]);

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
          "fixed top-0 bottom-0 left-0 right-0 md:top-auto md:left-auto md:bottom-4 md:right-4 z-50 origin-bottom-right transition-all duration-200 ease-out",
          "w-screen sm:w-[24rem] h-screen md:h-[80vh] md:rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col",
          "bg-white",
          {
            "opacity-100 translate-y-0 scale-100 pointer-events-auto": open,
            "opacity-0 translate-y-2 scale-95 pointer-events-none": !open,
          },
        ])}
        aria-hidden={!open}
        role="dialog"
        aria-label="Support chat"
      >
        <div className="relative bg-gradient-to-b from-[#FED9A591] via-[#FED9A500] to-[#FBFBFC] via-20% to-25% h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 text-white">
            <div className="flex items-center gap-2">
              <Image
                src="/images/logos/logo-black.png"
                alt="RK Abogados"
                width={120}
                height={50}
              />
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-white/10 focus:outline-none"
              aria-label="Cerrar chat"
            >
              <PlusIcon className="rotate-45 size-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto px-8 py-3 mb-16 pb-8"
          >
            <span className="font-bold text-2xl text-black mb-4">
              Bienvenido a RK Abogados. Come prefieres hablar on nosotros?
            </span>

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
