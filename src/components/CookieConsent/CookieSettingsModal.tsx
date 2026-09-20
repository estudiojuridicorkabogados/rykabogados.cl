"use client";

import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";

import { Button } from "../ui/Button";

import { useCookieConsent } from "./useCookieConsent";

export const CookieSettingsModal = () => {
  const { showModal, closeSettings, savePreferences, preferences } =
    useCookieConsent();

  const [analyticsEnabled, setAnalyticsEnabled] = useState(
    preferences?.analytics ?? true
  );

  const handleSavePreferences = () =>
    savePreferences({ analytics: analyticsEnabled });

  return (
    <AnimatePresence>
      {showModal && (
        <Dialog
          key={String(showModal)}
          open={showModal}
          onClose={closeSettings}
          className="relative z-50"
        >
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Full-screen container */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel
              as={m.div}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl"
            >
              {/* Header */}
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <DialogTitle className="!font-sans text-2xl !font-semibold text-gray-900">
                  Configuración de cookies
                </DialogTitle>
                <p className="mt-1 text-sm text-gray-600">
                  Gestiona tus preferencias de cookies
                </p>
              </div>

              {/* Content */}
              <div className="max-h-[60vh] space-y-6 overflow-y-auto px-6 py-6">
                {/* Functional Cookies */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <span className="mb-1 text-base font-semibold text-gray-900">
                        Cookies necesarias
                      </span>
                      <p className="text-sm leading-relaxed text-gray-600">
                        Estas cookies son esenciales para el funcionamiento
                        básico del sitio web. Incluyen cookies de sesión y
                        preferencias de usuario que no pueden ser desactivadas.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={true}
                          disabled={true}
                          className="bg-primary-600 h-6 w-11 cursor-not-allowed appearance-none rounded-full opacity-60"
                          readOnly
                        />
                        <div className="pointer-events-none absolute top-0.5 right-0.5 h-5 w-5 rounded-full bg-white shadow-sm" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="bg-accent inline-block rounded px-2 py-1 text-xs font-medium text-black">
                      Siempre activas
                    </span>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <span className="mb-1 text-base font-semibold text-gray-900">
                        Cookies de análisis y rendimiento
                      </span>
                      <p className="text-sm leading-relaxed text-gray-600">
                        Estas cookies nos permiten analizar el uso del sitio web
                        y mejorar su rendimiento. Recopilan información sobre
                        cómo los visitantes utilizan nuestro sitio, qué páginas
                        visitan y qué enlaces siguen. Utilizamos Google
                        Analytics y Vercel Analytics.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                        className={`focus:ring-primary-500 relative h-6 w-11 cursor-pointer rounded-full transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none ${
                          analyticsEnabled ? "bg-green-400" : "bg-gray-400"
                        }`}
                        aria-label="Toggle analytics cookies"
                      >
                        <m.div
                          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm"
                          animate={{
                            left: analyticsEnabled ? "22px" : "2px",
                          }}
                          transition={{ duration: 0.2 }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 sm:flex-row">
                <Button
                  animateOnClick
                  variant="default"
                  className="group w-full lg:w-fit"
                  type="button"
                  onClick={closeSettings}
                >
                  Cancelar
                  {/* <LongArrowRight className="ml-2 stroke-white group-hover:stroke-primary group-hover:animate-wiggle" /> */}
                </Button>

                <Button
                  animateOnClick
                  variant="dark"
                  className="group w-full lg:w-fit"
                  type="button"
                  onClick={handleSavePreferences}
                >
                  Confirmar elecciones
                </Button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
