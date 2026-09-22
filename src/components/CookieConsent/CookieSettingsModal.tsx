"use client";

import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";

import { XIcon } from "../icons/X";
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
                aria-label={label}
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
  const {
    showModal,
    closeSettings,
    savePreferences,
    acceptAll,
    rejectAll,
    preferences,
  } = useCookieConsent();

  // Both switches start on for a visitor who has not chosen yet.
  //
  // This is a pre-ticked box, and it is the firm's decision rather than a
  // default that fell out of the code — recorded in docs/client-brief.md so
  // they can revisit it. Worth knowing what it rests on: Ley 21.719 requires
  // consent to be "inequívoca", which is the precise word a pre-ticked box
  // fails, and the CJEU settled the same point in Planet49 (C-673/17). It is
  // the one consent question with an actual answer in the statute.
  //
  // What it does NOT change, and must not: nothing is granted until the
  // visitor presses "Guardar preferencias" or "Aceptar todas". One who never
  // opens this
  // modal, or who closes it, stays denied — the stored default in
  // createDefaultPreferences and the Consent Mode default are both still
  // denied for everything.
  const [analyticsEnabled, setAnalyticsEnabled] = useState(
    preferences?.analytics ?? true
  );
  const [advertisingEnabled, setAdvertisingEnabled] = useState(
    preferences?.advertising ?? true
  );

  // Re-seed each time the modal opens, not only the first time.
  //
  // CookieSettingsModalLoader keeps this mounted after the first open, so
  // useState ran once and never again: accept everything from the banner, then
  // reopen from the footer, and the switches showed their first-mount values
  // while the stored record said otherwise — saving then quietly revoked what
  // had just been granted. Derived during render
  // rather than in an effect, the same way CookieBanner tracks its own
  // transition, so the switches are right in the commit that opens the dialog.
  const [wasOpen, setWasOpen] = useState(showModal);
  if (wasOpen !== showModal) {
    setWasOpen(showModal);
    if (showModal) {
      setAnalyticsEnabled(preferences?.analytics ?? true);
      setAdvertisingEnabled(preferences?.advertising ?? true);
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
              {/*
                Closing lives here, as an X, rather than as a "Cancelar" button
                in the footer. Cancelling is not a decision about cookies, it
                is a way out, and every consent platform worth copying keeps
                the footer for the three real choices. Esc and a click on the
                backdrop already closed the dialog — headlessui does both from
                onClose — so this mainly makes that discoverable on a phone.
              */}
              <div className="flex items-start justify-between gap-4 border-b border-gray-200 bg-gray-50 px-6 py-4">
                <div>
                  <DialogTitle className="!font-sans text-2xl !font-semibold text-gray-900">
                    Configuración de cookies
                  </DialogTitle>
                  <p className="mt-1 text-sm text-gray-600">
                    Gestiona tus preferencias de cookies
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeSettings}
                  aria-label="Cerrar sin guardar"
                  className="focus:ring-primary-500 -mr-2 inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md text-gray-500 hover:bg-gray-200 hover:text-gray-900 focus:ring-2 focus:outline-none"
                >
                  <XIcon className="size-4 stroke-current" />
                </button>
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
                The three real choices, and nothing else. Cancelling is the X
                in the header; it is not a decision about cookies and does not
                belong in this row.

                Rejecting lives here rather than on the banner. Nothing in
                force today obliges a first-layer reject button: Ley 21.719
                prescribes no banner layout and Chile's data protection agency
                has issued no cookie guidance, while the first-layer
                requirement is EU supervisory-authority doctrine that does not
                reach a Chilean firm advising Chilean clients. Revisit it if
                the firm ever markets to the EU. See docs/client-brief.md.

                Reject and accept are the same component with the same variant,
                so their relative weight is not a matter of opinion. "Guardar
                preferencias" is the quieter middle path, which is the one
                shape of this row nobody argues about.

                Reject comes first in the DOM, so it is also first when the row
                stacks on a phone and first for a screen reader.

                Note that with both switches starting on, "Guardar
                preferencias" and "Aceptar todas" do the same thing until the
                visitor touches a switch. That is a consequence of the
                pre-tick, not of this layout.
              */}
              <div className="flex flex-col justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 md:flex-row">
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
                  variant="default"
                  className="group w-full md:w-fit"
                  type="button"
                  onClick={handleSavePreferences}
                >
                  Guardar preferencias
                </Button>

                <Button
                  animateOnClick
                  variant="dark"
                  className="group w-full md:w-fit"
                  type="button"
                  onClick={acceptAll}
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
};
