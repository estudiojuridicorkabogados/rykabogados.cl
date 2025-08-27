import { Fragment } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { AnimatePresence, easeInOut,easeOut, motion } from "motion/react";

import { classNames } from "@/lib/utils/classNames";

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
      <dl className="mt-16 divide-y divide-gray-900/10 border-y border-gray-900/10">
        {entries.map((faq, i) => (
          <Disclosure key={faq.title} as="div" className="first:pt-0 last:pb-0">
            {({ open }) => (
              <>
                <dt>
                  <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900 cursor-pointer pl-1 py-6">
                    <span
                      className={classNames(
                        "transition-all delay-300 duration-75 text-lg"
                      )}
                    >
                      {`0${i + 1}.`} {faq.title}
                    </span>
                    <span className="flex h-7 items-center mr-4">
                      <PlusIcon
                        aria-hidden="true"
                        className="size-6 group-data-open:hidden"
                      />
                      <MinusIcon
                        aria-hidden="true"
                        className="size-6 group-not-data-open:hidden"
                      />
                    </span>
                  </DisclosureButton>
                </dt>
                <DisclosurePanel
                  static
                  as={motion.dd}
                  initial={false}
                  animate={open ? "open" : "collapsed"}
                  variants={{
                    open: { height: "auto", opacity: 1 },
                    collapsed: { height: 0, opacity: 0 },
                  }}
                  className="overflow-hidden pr-12 border-t border-gray-900/10"
                >
                  <div className="py-0 lg:w-3/4">
                    <div className="pl-6 pb-12 pt-12 text-base/7 text-black/50 leading-6">
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
