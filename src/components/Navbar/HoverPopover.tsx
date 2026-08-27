"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Route } from "next";
import Link from "next/link";
import { Popover } from "radix-ui";

import { classNames } from "@/lib/utils/classNames";

interface HoverPopoverProps {
  label: string;
  links: {
    href: Route;
    label: string;
  }[];
}

export const HoverPopover: React.FC<HoverPopoverProps> = ({ label, links }) => {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger className="hover:text-accent-dark flex cursor-pointer items-center gap-2 text-black transition-colors focus:outline-0 active:outline-0">
        {label}
        <ChevronDown
          className={classNames("size-4 transition-rotate duration-500", {
            "rotate-180": open,
          })}
        />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className="z-50 mt-2 flex flex-col justify-center rounded-sm border-1 border-black/10 bg-white px-4 transition duration-200 ease-in-out">
          {links.map(({ href, label: linkLabel }) => (
            <Link
              key={linkLabel}
              href={href}
              className="hover:text-accent-dark flex items-center gap-3 border-b border-black/10 py-3 text-black transition-all last:border-0"
              onClick={handleLinkClick}
            >
              <div className="gap-x flex flex-col justify-center">
                <span className="text-sm">{linkLabel}</span>
              </div>
            </Link>
          ))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
