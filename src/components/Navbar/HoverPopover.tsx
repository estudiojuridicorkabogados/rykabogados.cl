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
            anchor="bottom start"
            className="mt-2 flex flex-col justify-center bg-white z-50 top-5 py-2 px-4 rounded-sm border-black/10 border-1 data-closed:-translate-y-1 data-closed:opacity-0 transition duration-200 ease-in-out"
          >
            {links.map(({ href, label, description, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="text-black hover:text-accent-dark transition-all flex items-center gap-3 first:border-b first:border-black/10 py-3 first:pb-5 last:pt-4"
              >
                <div className="flex items-center justify-center rounded-sm">
                  {Icon}
                </div>
                <div className="flex flex-col gap-x justify-center">
                  <span className="text-sm">{label}</span>
                  {/* <span className="text-xs">{description}</span> */}
                </div>
              </Link>
            ))}
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
};
