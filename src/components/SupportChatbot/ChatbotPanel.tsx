"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { isToolUIPart, ToolUIPart } from "ai";
import Image from "next/image";

import { useDebounceCallback } from "@/hooks/useDebounceCallback";
import { useTracking } from "@/hooks/useTracking";
import { buildUserData, RK_EVENTS, trackEvent } from "@/lib/utils/analytics";
import { classNames } from "@/lib/utils/classNames";
import { CONTACTO_EMAIL } from "@/lib/utils/constants";

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
 * What `processUserInfo` collected, read off the tool part the stream already
 * carries. The model produced these values, so nothing here is trusted beyond
 * "is it a string" — they go to Google's hashing tag, not into the page.
 */
function leadUserData(part: ToolUIPart) {
  const input = part.input;

  if (!input || typeof input !== "object") return undefined;

  const { email, phoneNumber } = input as Record<string, unknown>;

  return buildUserData({
    email: typeof email === "string" ? email : undefined,
    phone: typeof phoneNumber === "string" ? phoneNumber : undefined,
  });
}

/** `processUserInfo` returns `{ success, message }`; only the flag matters. */
function leadSucceeded(part: ToolUIPart) {
  const output = part.output;

  return (
    !!output &&
    typeof output === "object" &&
    (output as Record<string, unknown>).success === true
  );
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
  const { shortCode, logToSheet } = useTracking();

  const { messages, status, sendMessage } = useChat({
    onError: () => {
      // Previously invisible in both directions: the typing dots vanish and
      // nothing is rendered, and nothing was recorded either.
      trackEvent(RK_EVENTS.CHAT_ERROR);
    },
  });

  /**
   * Whether the most recent capture attempt failed. Tracked as CHAT_LEAD_FAIL
   * since the tool was written but never shown, so the visitor was left
   * believing the firm had their details when nothing had been sent.
   *
   * Derived from the stream rather than held in state: the parts already carry
   * the answer, and "the latest attempt" is then true by construction — a
   * retry that lands clears the warning on its own.
   */
  const leadFailed = useMemo(() => {
    const attempts = messages
      .flatMap((message) => message.parts)
      .filter(
        (part): part is ToolUIPart =>
          isToolUIPart(part) &&
          part.type === "tool-processUserInfo" &&
          part.state === "output-available"
      );

    const latest = attempts.at(-1);

    return !!latest && !leadSucceeded(latest);
  }, [messages]);

  /** Tool calls already reported, by call id, so each fires exactly once. */
  const reportedTools = useRef(new Set<string>());
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
    // Counted before the send, because `messages` updates asynchronously.
    const sent =
      messages.filter((message) => message.role === "user").length + 1;

    trackEvent(
      sent === 1 ? RK_EVENTS.CHAT_FIRST_MESSAGE : RK_EVENTS.CHAT_MESSAGE,
      {
        message_number: sent,
      }
    );

    // The Caso code rides on the request so the studio email for a captured
    // lead quotes the same reference as the Sheet row. The route validates it
    // before it reaches an email body.
    sendMessage({ text: query }, { body: { sessionCode: shortCode } });
  };

  /**
   * The bot has two endings and they are not equal: handing over the WhatsApp
   * number leaves the visitor with something still to do, while capturing the
   * lead finishes the job. The funnels have to tell them apart, so each tool
   * call gets its own signal.
   *
   * Read off the message stream rather than from a callback: tool parts arrive
   * as ordinary parts, carrying both the input the model produced and the
   * result the server returned.
   */
  useEffect(() => {
    for (const message of messages) {
      for (const part of message.parts) {
        if (!isToolUIPart(part)) continue;
        if (part.state !== "output-available") continue;
        if (reportedTools.current.has(part.toolCallId)) continue;

        reportedTools.current.add(part.toolCallId);

        if (part.type === "tool-provideWhatsappContact") {
          trackEvent(RK_EVENTS.CHAT_HANDOFF, { location: "chatbot" });
          continue;
        }

        if (part.type !== "tool-processUserInfo") continue;

        if (!leadSucceeded(part)) {
          trackEvent(RK_EVENTS.CHAT_LEAD_FAIL);
          continue;
        }

        const user_data = leadUserData(part);

        trackEvent(RK_EVENTS.CHAT_LEAD, {
          location: "chatbot",
          ...(user_data && { user_data }),
        });

        // A finished enquiry, so it belongs in the case log next to the
        // campaign that produced it — the same row a booking or a WhatsApp
        // message would write.
        logToSheet({
          landing: window.location.href,
          channel: "chatbot-lead",
          email: user_data?.email ?? "",
          phone: user_data?.phone_number ?? "",
        });
      }
    }
  }, [messages, logToSheet]);

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
      // role="dialog" rather than a real <dialog>, which is what
      // jsx-a11y/prefer-tag-over-role wants and why that rule is off for this
      // file in .oxlintrc.json. A <dialog> is display:none until show() or
      // showModal() is called imperatively, so it cannot be opened by a class
      // change and display:none cannot be transitioned — this panel stays
      // mounted and animates opacity and transform. showModal() would also
      // trap focus and make the rest of the page inert, which is wrong for a
      // chat the visitor should be able to leave open while they read.
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

            {leadFailed && (
              <p
                role="alert"
                className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-900"
              >
                No pudimos registrar tus datos. Escríbenos a{" "}
                <a className="underline" href={`mailto:${CONTACTO_EMAIL}`}>
                  {CONTACTO_EMAIL}
                </a>{" "}
                y te respondemos a la brevedad.
              </p>
            )}

            {status === "submitted" && <MessageLoading />}

            <div ref={endRef} />
          </div>
        </div>
      </div>

      <ChatbotInput textareaRef={textareaRef} onSubmit={onSubmit} />
    </div>
  );
};
