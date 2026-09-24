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
      {/*
        70px of artwork in a 56px button, with `max-w-none` and the button's
        `overflow-visible`, so roughly 14px of picture hangs outside its own
        hit area on every side — and `mb-4` lifts it higher still. That is a
        deliberate look, but it was also collecting clicks: the overflow is
        opaque to hit-testing, so a click aimed at whatever sits underneath the
        corner landed on this image instead. `pointer-events-none` keeps the
        spill and gives the clicks back. Nothing is lost — the image is
        decorative (`alt=""`), and the button underneath still takes the click
        and the hover preload across its own 56px.
      */}
      <Image
        src="/images/support_chat.webp"
        alt=""
        width={70}
        height={70}
        className="pointer-events-none mb-4 h-[70px] w-[70px] max-w-none object-cover"
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
