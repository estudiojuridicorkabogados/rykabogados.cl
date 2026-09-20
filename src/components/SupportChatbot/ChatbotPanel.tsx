"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import Image from "next/image";

import { useDebounceCallback } from "@/hooks/useDebounceCallback";
import { classNames } from "@/lib/utils/classNames";

import logoBlack from "../../../public/images/logos/logo-black.png";
import { PlusIcon } from "../icons/Plus";

import { ChatbotInput } from "./ChatbotInput";
import { InitialBotMessage } from "./InitialBotMessage";
import { Message } from "./Message";
import { MessageLoading } from "./MessageLoading";

interface ChatbotPanelProps {
  open: boolean;
  onClose: () => void;
  onUnreadChange: (unread: number) => void;
}

/**
 * The chat panel proper. Split out of SupportChatbot so that `useChat` — and
 * with it the AI SDK and Zod, ~130KB gzipped — only reaches the browser once
 * the visitor actually opens the chat. See docs/lcp-performance-plan.md.
 */
export const ChatbotPanel: React.FC<ChatbotPanelProps> = ({
  open,
  onClose,
  onUnreadChange,
}) => {
  const { messages, status, sendMessage } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const [lastSeenMsgId, setLastSeenMsgId] = useState<string | undefined>(
    undefined
  );

  // The panel mounts only once the visitor opens it, so `open` is already true
  // on first render. Delay the visible state by a frame to keep the enter
  // transition that the always-mounted version used to get for free.
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const visible = open && entered;

  const unread = useMemo(() => {
    const assistantMessages = messages.filter((m) => m.role === "assistant");
    if (assistantMessages.length === 0 || open) return 0;
    const lastSeenIdx = assistantMessages.findLastIndex(
      (m) => m.id === lastSeenMsgId
    );
    return assistantMessages.length - (lastSeenIdx + 1);
  }, [open, messages, lastSeenMsgId]);

  useEffect(() => {
    onUnreadChange(unread);
  }, [unread, onUnreadChange]);

  // Opening and closing both count as seeing the conversation, which is what
  // the previous markAllSeen() calls on either toggle amounted to.
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === open) return;
    prevOpen.current = open;
    setLastSeenMsgId(
      messages.toReversed().find((m) => m.role === "assistant")?.id
    );
  }, [open, messages]);

  const handleNewMessageAdded = useDebounceCallback(() => {
    // Play notification sound for new messages
    const audio = new Audio("/sounds/bot-pop-up.mp3");
    audio.volume = 0.5;
    audio.play().catch(() => {
      // Handle autoplay restrictions silently
    });

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
  }, [open, handleNewMessageAdded]);

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
  }, []);

  const onSubmit = (query: string) => {
    sendMessage({ text: query });
  };

  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
    return () => clearTimeout(id);
  }, [open]);

  return (
    <div
      className={classNames([
        "fixed top-0 left-0 right-0 h-dvh md:h-[80vh] md:top-auto md:left-auto md:bottom-4 md:right-4 z-50 origin-bottom-right transition-all duration-200 ease-out",
        "w-screen sm:w-[24rem] md:rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col",
        "bg-white",
        {
          "opacity-100 translate-y-0 scale-100 pointer-events-auto": visible,
          "opacity-0 translate-y-2 scale-95 pointer-events-none": !visible,
        },
      ])}
      aria-hidden={!visible}
      role="dialog"
      aria-label="Support chat"
    >
      <div className="relative flex min-h-0 flex-1 flex-col bg-linear-to-b from-[#FED9A591] via-[#FED9A500] via-20% to-[#FBFBFC] to-25%">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between px-6 py-6 text-white">
          <div className="flex items-center gap-2">
            <Image
              src={logoBlack}
              alt="RK Abogados"
              unoptimized
              width={120}
              height={50}
            />
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-white/10 focus:outline-none"
            aria-label="Cerrar chat"
          >
            <PlusIcon className="size-4 rotate-45" />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={messagesContainerRef}
          className="mt-2 flex-1 overflow-y-auto px-6 py-3 pb-4"
        >
          <p className="mb-4 max-w-4/5 text-xl leading-[25px] font-medium text-black">
            Bienvenido a RK Abogados. ¿Cómo prefieres hablar con nosotros?
          </p>

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

      <ChatbotInput textareaRef={textareaRef} onSubmit={onSubmit} />
    </div>
  );
};
