"use client";

import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { InfoIcon, XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface InfoModalProps {
  triggerLabel: string;
  title: string;
  children: React.ReactNode;
  triggerClassName?: string;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  triggerLabel,
  title,
  children,
  triggerClassName = "text-white/70 hover:text-white",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`inline-flex cursor-pointer items-center gap-1.5 text-left text-xs underline underline-offset-2 transition-colors ${triggerClassName}`}
      >
        <InfoIcon aria-hidden="true" className="size-3.5 shrink-0" />
        {triggerLabel}
      </button>

      <AnimatePresence>
        {isOpen && (
          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              aria-hidden="true"
            />

            <div className="fixed inset-0 flex items-center justify-center p-4">
              <DialogPanel
                as={motion.div}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative w-full max-w-xl overflow-hidden rounded-xl bg-white shadow-2xl"
              >
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-gray-700"
                  aria-label="Cerrar"
                >
                  <XIcon className="size-5" />
                </button>

                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                  <DialogTitle className="pr-6 !font-sans text-lg !font-semibold text-gray-900">
                    {title}
                  </DialogTitle>
                </div>

                <div className="max-h-[70vh] space-y-4 overflow-y-auto px-6 py-6 text-sm leading-relaxed text-gray-600">
                  {children}
                </div>
              </DialogPanel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};
