"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";

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
    setOpen((v) => !v);
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
