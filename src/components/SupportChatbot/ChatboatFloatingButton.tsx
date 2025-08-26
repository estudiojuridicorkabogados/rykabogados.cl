"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { MessageSquareIcon } from "lucide-react";

import { classNames } from "@/lib/utils/classNames";

interface ChatboatFloatingButtonProps {
  onToggleOpen: () => void;
  open: boolean;
  unread: number;
}

export const ChatboatFloatingButton: React.FC<ChatboatFloatingButtonProps> = ({
  onToggleOpen,
  open,
  unread,
}) => {
  return (
    <button
      type="button"
      onClick={onToggleOpen}
      className={classNames([
        "fixed bottom-4 right-4 h-14 w-14 rounded-full bg-indigo-600 text-white shadow-lg ring-1 ring-black/5 transition-all duration-200 ease-out",
        {
          "opacity-0 scale-95 pointer-events-none": open,
          "opacity-100 scale-100": !open,
        },
        "flex items-center justify-center",
      ])}
      aria-label={open ? "Hide chat" : "Open chat"}
    >
      {/* Chat icon */}
      <MessageSquareIcon className="h-6 w-6" />

      {/* Unread badge */}
      {unread > 0 && (
        <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-rose-500 px-1.5 text-[10px] font-semibold text-white ring-2 ring-white">
          {unread > 9 ? "9+" : unread}
        </span>
      )}
    </button>
  );
};
