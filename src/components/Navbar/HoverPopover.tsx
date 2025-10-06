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
    icon: React.ReactElement;
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
      <Popover.Trigger className="text-black hover:text-accent-dark transition-colors cursor-pointer focus:outline-0 active:outline-0 flex items-center gap-2">
        {label}
        <ChevronDown
          className={classNames("size-4 transition-rotate duration-500", {
            "rotate-180": open,
          })}
        />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className="mt-2 flex flex-col justify-center bg-white z-50 py-2 px-4 rounded-sm border-black/10 border-1 transition duration-200 ease-in-out">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="text-black hover:text-accent-dark transition-all flex items-center gap-3 border-b border-black/10 last:border-0 py-3 first:pb-5 last:pt-4"
              onClick={handleLinkClick}
            >
              <div className="flex items-center justify-center rounded-sm">
                {Icon}
              </div>
              <div className="flex flex-col gap-x justify-center">
                <span className="text-sm">{label}</span>
              </div>
            </Link>
          ))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
