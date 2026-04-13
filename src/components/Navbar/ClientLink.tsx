"use client";

import { useRef, useState } from "react";
import { ChevronDown, HardHat, Landmark } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Popover } from "radix-ui";

import { classNames } from "@/lib/utils/classNames";
import { URLS } from "@/lib/utils/constants";

import { Button } from "../ui/Button";

const RESERVA_LINKS = [
  {
    href: URLS.speakWithUsTrabajadores(),
    label: "Trabajadores",
    icon: <HardHat className="size-4 stroke-primary" />,
  },
  {
    href: URLS.speakWithUsEmpresas(),
    label: "Empresas",
    icon: <Landmark className="size-4 stroke-primary" />,
  },
];

export const ClientLink = () => {
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
          "h-9 px-3",
          "bg-white text-black hover:bg-gray-900 hover:text-white border border-gray-900",
          "outline-none"
        )}
      >
        Reserva una Llamada
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
          className="flex flex-col justify-center bg-white z-50 px-4 rounded-sm border-black/10 border transition duration-200 ease-in-out min-w-[200px] outline-none"
        >
          {RESERVA_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="text-black hover:text-accent-dark transition-all flex items-center gap-3 border-b border-black/10 last:border-0 py-3"
              onClick={() => setTimeout(() => setOpen(false), 200)}
            >
              <div className="flex items-center justify-center rounded-sm">
                {Icon}
              </div>
              <span className="text-sm">{label}</span>
            </Link>
          ))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
