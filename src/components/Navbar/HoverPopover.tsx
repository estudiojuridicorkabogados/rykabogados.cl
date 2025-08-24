"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { Route } from "next";
import Link from "next/link";

import { classNames } from "@/utils/classNames";

interface HoverPopoverProps {
  label: string;
  links: {
    href: Route;
    label: string;
    description: string;
    icon: React.ReactElement;
  }[];
}

export const HoverPopover: React.FC<HoverPopoverProps> = ({ label, links }) => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <PopoverButton className="text-black hover:text-accent-dark transition-colors cursor-pointer focus:outline-0 active:outline-0 flex items-center gap-2">
            {label}
            <ChevronDown
              className={classNames("size-4 transition-rotate duration-500", {
                "rotate-180": open,
              })}
            />
          </PopoverButton>

          <PopoverPanel
            transition
            anchor="bottom"
            className="flex flex-col justify-center gap-4 bg-white z-50 top-5 p-4 rounded-lg border-black/10 border-1 data-closed:-translate-y-1 data-closed:opacity-0 transition duration-200 ease-in-out"
          >
            {links.map(({ href, label, description, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="text-black hover:text-accent-dark transition-all flex items-center gap-3"
              >
                <div className="flex items-center justify-center bg-accent-dark h-9 w-9 rounded-lg">
                  {Icon}
                </div>
                <div className="flex flex-col gap-x justify-center">
                  <span className="font-bold text-sm">{label}</span>
                  <span className="text-xs">{description}</span>
                </div>
              </Link>
            ))}
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
};
