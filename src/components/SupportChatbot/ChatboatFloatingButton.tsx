"use client";

import Image from "next/image";

import { classNames } from "@/lib/utils/classNames";

interface ChatboatFloatingButtonProps {
  onToggleOpen: () => void;
  /** Warms the lazily loaded chat panel chunk before the click lands. */
  onPreload?: () => void;
  open: boolean;
  unread: number;
}

export const ChatboatFloatingButton: React.FC<ChatboatFloatingButtonProps> = ({
  onToggleOpen,
  onPreload,
  open,
  unread,
}) => {
  return (
    <button
      type="button"
      onClick={onToggleOpen}
      onPointerEnter={onPreload}
      onFocus={onPreload}
      onTouchStart={onPreload}
      className={classNames([
        "z-50 cursor-pointer fixed bottom-4 right-4 ring-black/5 transition-all duration-200 ease-out overflow-visible",
        "h-14 w-14 rounded-full bg-primary border border-accent-dark text-white shadow-lg ring-1",
        {
          "opacity-0 scale-95 pointer-events-none": open,
          "opacity-100 scale-100": !open,
        },
        "flex items-center justify-center",
      ])}
      aria-label={open ? "Cerrar chat de ayuda" : "Abrir chat de ayuda"}
    >
      <Image
        src="/images/support_chat.webp"
        alt=""
        width={70}
        height={70}
        className="mb-4 h-[70px] w-[70px] max-w-none object-cover"
      />

      {/* Unread badge */}
      {unread > 0 && (
        <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[10px] font-semibold text-white ring-2 ring-white">
          {unread > 9 ? "9+" : unread}
        </span>
      )}
    </button>
  );
};
