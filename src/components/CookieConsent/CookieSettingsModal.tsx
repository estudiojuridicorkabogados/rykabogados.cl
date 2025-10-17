"use client";

import { useEffect,useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AnimatePresence,motion } from "motion/react";

import { Button } from "../ui/Button";

import { useCookieConsent } from "./useCookieConsent";

export function CookieSettingsModal() {
  const { showModal, closeSettings, savePreferences, preferences } =
    useCookieConsent();

  const [analyticsEnabled, setAnalyticsEnabled] = useState(
    preferences?.analytics ?? false
  );

  // Update state when preferences change
  useEffect(() => {
    if (preferences) {
      setAnalyticsEnabled(preferences.analytics);
    }
  }, [preferences]);

  const handleSavePreferences = () => {
    savePreferences({ analytics: analyticsEnabled });
  };

  const handleAcceptAll = () => {
    savePreferences({ analytics: true });
  };

  return (
    <AnimatePresence>
      {showModal && (
        <Dialog
          open={showModal}
          onClose={closeSettings}
          className="relative z-50"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Full-screen container */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel
              as={motion.div}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              // transition={{ duration: 0.2 }} @TODO FIX
              className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <DialogTitle className="text-xl font-semibold text-gray-900">
                  Configuración de cookies
                </DialogTitle>
                <p className="mt-1 text-sm text-gray-600">
                  Gestiona tus preferencias de cookies
                </p>
              </div>

              {/* Content */}
              <div className="px-6 py-6 space-y-6 max-h-[60vh] overflow-y-auto">
                {/* Functional Cookies */}
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900 mb-1">
                        Cookies necesarias
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
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
                          className="w-11 h-6 bg-primary-600 rounded-full appearance-none cursor-not-allowed opacity-60"
                          readOnly
                        />
                        <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full shadow-sm pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="inline-block px-2 py-1 text-xs font-medium text-gray-600 bg-gray-200 rounded">
                      Siempre activas
                    </span>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900 mb-1">
                        Cookies de análisis y rendimiento
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
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
                        className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                          analyticsEnabled ? "bg-primary-600" : "bg-gray-300"
                        }`}
                        aria-label="Toggle analytics cookies"
                      >
                        <motion.div
                          className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"
                          animate={{
                            left: analyticsEnabled ? "22px" : "2px",
                          }}
                          transition={{ duration: 0.2 }}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Information */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <strong>Nota:</strong> Puedes cambiar tus preferencias en
                    cualquier momento desde el pie de página de nuestro sitio
                    web.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row gap-3 justify-end">
                <Button
                  animateOnClick
                  variant="default"
                  className="w-full lg:w-fit group"
                  type="button"
                  onClick={closeSettings}
                >
                  Cancelar
                  {/* <LongArrowRight className="ml-2 stroke-white group-hover:stroke-primary group-hover:animate-wiggle" /> */}
                </Button>

                <Button
                  animateOnClick
                  variant="dark"
                  className="w-full lg:w-fit group"
                  type="button"
                  onClick={handleAcceptAll}
                >
                  Aceptar todas
                </Button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
