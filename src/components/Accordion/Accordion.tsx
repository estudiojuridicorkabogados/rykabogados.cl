"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { motion } from "motion/react";

import { itemVariants } from "@/lib/utils/animations";
import { classNames } from "@/lib/utils/classNames";

import { MinusIcon } from "../icons/Minus";
import { PlusIcon } from "../icons/Plus";

interface Entry {
  title: string;
  description: string | React.ReactNode;
}

interface AccordionProps {
  entries: Entry[];
}

export const Accordion: React.FC<AccordionProps> = ({ entries }) => {
  return (
    <div className="mx-auto px-6 lg:w-6xl 2xl:w-7xl">
      <dl className="mt-16">
        {entries.map((faq, i) => (
          <Disclosure
            key={faq.title}
            as={motion.div}
            variants={itemVariants}
            className="border-t last:border-b border-gray-900 first:pt-0 last:pb-0"
          >
            {({ open }) => (
              <>
                <motion.dt variants={itemVariants}>
                  <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900 cursor-pointer pl-1 py-6">
                    <span
                      className={classNames(
                        "transition-all delay-300 duration-75 md:text-lg"
                      )}
                    >
                      {`0${i + 1}.`} {faq.title}
                    </span>
                    <span className="flex h-7 justify-center items-center mr-4">
                      <PlusIcon
                        aria-hidden="true"
                        className="size-4 group-data-open:hidden"
                      />
                      <MinusIcon
                        aria-hidden="true"
                        className="w-4 h-2 group-not-data-open:hidden"
                      />
                    </span>
                  </DisclosureButton>
                </motion.dt>
                <DisclosurePanel
                  static
                  as={motion.dd}
                  initial={false}
                  animate={open ? "open" : "collapsed"}
                  variants={{
                    open: { height: "auto", opacity: 1 },
                    collapsed: { height: 0, opacity: 0 },
                  }}
                  className="overflow-hidden md:pr-12 border-t border-gray-900"
                >
                  <div className="py-0 lg:w-3/4">
                    <div className="md:pl-7 pb-12 pt-12 text-base/7 text-black/50 leading-6">
                      {faq.description}
                    </div>
                  </div>
                </DisclosurePanel>
              </>
            )}
          </Disclosure>
        ))}
      </dl>
    </div>
  );
};
