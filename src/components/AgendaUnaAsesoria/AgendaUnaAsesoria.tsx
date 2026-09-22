"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Popover } from "radix-ui";

import { RK_EVENTS, trackEvent, TrackLocation } from "@/lib/utils/analytics";
import { classNames } from "@/lib/utils/classNames";
import { URLS } from "@/lib/utils/constants";

const RESERVA_LINKS = [
  {
    href: URLS.speakWithUsTrabajadores(),
    label: "Trabajadores",
  },
  {
    href: URLS.speakWithUsEmpresas(),
    label: "Empresas",
  },
];

interface AgendaUnaAsesoriaProps {
  /** The navbar copy appears on every page, so page_type cannot tell them apart. */
  location: TrackLocation;
  variant?: "white" | "dark";
  className?: string;
}

export const AgendaUnaAsesoria: React.FC<AgendaUnaAsesoriaProps> = ({
  location,
  variant = "white",
  className,
}) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleOpen = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleClose = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        className={classNames(
          "w-full lg:w-fit cursor-pointer",
          "whitespace-nowrap uppercase",
          "inline-flex items-center justify-center gap-2",
          "text-xs font-medium transition-all duration-300",
          "h-10 px-3",
          "outline-none",
          {
            "bg-white text-black hover:bg-gray-900 hover:text-white border border-gray-900":
              variant === "white",
            "bg-gray-900 text-white hover:bg-white hover:text-gray-900 border border-gray-900":
              variant === "dark",
          },
          className
        )}
      >
        Agenda una asesoría
        <ChevronDown
          className={classNames("size-3.5 transition-transform duration-300", {
            "rotate-180": open,
          })}
        />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          sideOffset={4}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          className="z-50 flex w-(--radix-popover-trigger-width) flex-col justify-center rounded-sm border border-black/10 bg-white px-4 transition duration-200 ease-in-out outline-none"
        >
          {RESERVA_LINKS.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="hover:text-accent-dark flex items-center gap-3 border-b border-black/10 py-3 text-black transition-all last:border-0"
              onClick={() => {
                trackEvent(RK_EVENTS.CTA_CLICK, {
                  location,
                  cta_label: `Agenda una asesoría — ${label}`,
                });
                setTimeout(() => setOpen(false), 200);
              }}
            >
              <span className="text-sm">{label}</span>
            </Link>
          ))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
