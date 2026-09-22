"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";

import { trackEvent } from "@/lib/utils/analytics";

import { ChatboatFloatingButton } from "./ChatboatFloatingButton";

/**
 * Loaded on demand, from inside a Client Component so that code splitting
 * actually happens — a Server Component calling dynamic() on a Client
 * Component does not split it out (see the Next.js lazy-loading guide), which
 * is why the AI SDK used to ship on every page.
 */
const ChatbotPanel = dynamic(
  () => import("./ChatbotPanel").then((m) => m.ChatbotPanel),
  { ssr: false }
);

/** Warm the chunk on intent, so the click itself feels instant. */
const preloadPanel = () => {
  void import("./ChatbotPanel");
};

export const SupportChatbot = () => {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  // Once opened the panel stays mounted, so the conversation survives closing.
  const [activated, setActivated] = useState(false);

  const onToggleOpen = () => {
    setActivated(true);

    // Only the opening half is a signal: closing the panel is not a step
    // towards anything, and counting both would double every session.
    //
    // Read from `open` rather than from inside the updater. A state updater
    // has to be pure, and React proves it by calling it twice in development —
    // which reported two opens for one click.
    if (!open) {
      trackEvent("rk_chat_open");
    }

    setOpen((wasOpen) => !wasOpen);
  };

  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      {activated && (
        <ChatbotPanel
          open={open}
          onClose={handleClose}
          onUnreadChange={setUnread}
        />
      )}

      <ChatboatFloatingButton
        onToggleOpen={onToggleOpen}
        onPreload={preloadPanel}
        open={open}
        unread={unread}
      />
    </>
  );
};
