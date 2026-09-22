"use client";

import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";

import { Button } from "../ui/Button";

import { useCookieConsent } from "./useCookieConsent";

interface ConsentToggleRowProps {
  title: string;
  description: string;
  enabled: boolean;
  /** Omitted for the necessary category, which cannot be switched off. */
  onChange?: (enabled: boolean) => void;
  label: string;
}

const ConsentToggleRow = ({
  title,
  description,
  enabled,
  onChange,
  label,
}: ConsentToggleRowProps) => {
  const locked = !onChange;

  return (
    <div
      className={`rounded-lg border border-gray-200 p-4 ${locked ? "bg-gray-50" : ""}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <span className="mb-1 text-base font-semibold text-gray-900">
            {title}
          </span>
          <p className="text-sm leading-relaxed text-gray-600">{description}</p>
        </div>

        <div className="flex items-center">
          {locked ? (
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
          ) : (
            <button
              type="button"
              role="switch"
              aria-checked={enabled}
              aria-label={label}
              onClick={() => onChange(!enabled)}
              className={`focus:ring-primary-500 relative h-6 w-11 cursor-pointer rounded-full transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none ${
                enabled ? "bg-green-400" : "bg-gray-400"
              }`}
            >
              <m.div
                className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm"
                animate={{ left: enabled ? "22px" : "2px" }}
                transition={{ duration: 0.2 }}
              />
            </button>
          )}
        </div>
      </div>

      {locked && (
        <div className="mt-2">
          <span className="bg-accent inline-block rounded px-2 py-1 text-xs font-medium text-black">
            Siempre activas
          </span>
        </div>
      )}
    </div>
  );
};

export const CookieSettingsModal = () => {
  const { showModal, closeSettings, savePreferences, rejectAll, preferences } =
    useCookieConsent();

  const [analyticsEnabled, setAnalyticsEnabled] = useState(
    preferences?.analytics ?? true
  );
  const [advertisingEnabled, setAdvertisingEnabled] = useState(
    preferences?.advertising ?? false
  );

  // Re-seed each time the modal opens, not only the first time.
  //
  // CookieSettingsModalLoader keeps this mounted after the first open, so
  // useState ran once and never again: accept everything from the banner, then
  // reopen from the footer, and the switches showed their first-mount values
  // while the stored record said otherwise — pressing "Confirmar elecciones"
  // then quietly revoked what had just been granted. Derived during render
  // rather than in an effect, the same way CookieBanner tracks its own
  // transition, so the switches are right in the commit that opens the dialog.
  const [wasOpen, setWasOpen] = useState(showModal);
  if (wasOpen !== showModal) {
    setWasOpen(showModal);
    if (showModal) {
      setAnalyticsEnabled(preferences?.analytics ?? true);
      setAdvertisingEnabled(preferences?.advertising ?? false);
    }
  }

  const handleSavePreferences = () =>
    savePreferences({
      analytics: analyticsEnabled,
      advertising: advertisingEnabled,
    });

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
                {/* TODO(copy): all three descriptions are pending the firm's
                    review — they are the lawyers and the wording is their
                    call. The mechanism is what is being shipped here. */}
                <ConsentToggleRow
                  title="Cookies necesarias"
                  description="Estas cookies son esenciales para el funcionamiento básico del sitio web. Incluyen la cookie que guarda tu elección sobre cookies y las que protegen los formularios frente a envíos automatizados. No pueden ser desactivadas."
                  label="Cookies necesarias, siempre activas"
                  enabled
                />

                <ConsentToggleRow
                  title="Cookies de análisis y rendimiento"
                  description="Nos permiten entender cómo se usa el sitio: qué páginas se visitan, hasta dónde se lee y en qué punto se abandona un formulario. Utilizamos Google Analytics."
                  label="Cookies de análisis y rendimiento"
                  enabled={analyticsEnabled}
                  onChange={setAnalyticsEnabled}
                />

                <ConsentToggleRow
                  title="Cookies de publicidad"
                  description="Nos permiten saber qué anuncio trajo a cada visitante y medir si nuestras campañas funcionan, además de personalizar los anuncios que ves en servicios de Google. Si las rechazas seguimos midiendo el uso del sitio, pero no podemos vincular tu consulta con el anuncio en el que hiciste clic."
                  label="Cookies de publicidad"
                  enabled={advertisingEnabled}
                  onChange={setAdvertisingEnabled}
                />
              </div>

              {/*
                Rejecting lives here rather than on the banner. Nothing in force
                today obliges a first-layer reject button: Ley 21.719 prescribes
                no banner layout and Chile's data protection agency has issued
                no cookie guidance, while the first-layer requirement is EU
                supervisory-authority doctrine that does not reach a Chilean
                firm advising Chilean clients. Revisit it if the firm ever
                markets to the EU. See docs/client-brief.md.

                Within the modal, reject and confirm are the same component with
                the same variant, so their weight is not a matter of opinion.
              */}
              <div className="flex flex-col justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 md:flex-row">
                <Button
                  animateOnClick
                  variant="default"
                  className="group w-full md:w-fit"
                  type="button"
                  onClick={closeSettings}
                >
                  Cancelar
                </Button>

                <Button
                  animateOnClick
                  variant="dark"
                  className="group w-full md:w-fit"
                  type="button"
                  onClick={rejectAll}
                >
                  Rechazar todas
                </Button>

                <Button
                  animateOnClick
                  variant="dark"
                  className="group w-full md:w-fit"
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
