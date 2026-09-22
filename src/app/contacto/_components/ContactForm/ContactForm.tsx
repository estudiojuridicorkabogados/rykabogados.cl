"use client";

import { useActionState, useEffect, useRef } from "react";
import { Toaster, toast } from "sonner";

import {
  type ActionResponse,
  submitContactForm,
} from "@/actions/submitContactForm";
import { FloatingLabelInput } from "@/components/Input/FloatingLabelInput";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { useTracking } from "@/hooks/useTracking";
import { getCaptchaToken } from "@/lib/google/re-captcha/getCaptchaToken";
import {
  onceOnThisPage,
  trackContactFormSubmission,
  trackEvent,
} from "@/lib/utils/analytics";
import { URLS } from "@/lib/utils/constants";
import { getSessionCode } from "@/lib/utils/tracking";

const initialState: ActionResponse = {
  success: false,
  message: "",
};

const FORM_NAME = "contacto" as const;

/**
 * The first sign of a real attempt — focus rather than a keystroke, so that
 * reaching for the select counts. Pointer-down as well, because Safari does
 * not focus a button on click.
 */
const handleFormStart = () => {
  if (onceOnThisPage(`form_start:${FORM_NAME}`)) {
    trackEvent("rk_form_start", { form_name: FORM_NAME });
  }
};

export const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const tokenRef = useRef<HTMLInputElement>(null);
  const sessionCodeRef = useRef<HTMLInputElement>(null);
  const { logToSheet } = useTracking();

  useInViewOnce(formRef, () => {
    trackEvent("rk_form_view", { form_name: FORM_NAME });
  });

  /**
   * The success effect below re-runs whenever `logToSheet` changes identity,
   * and it is memoised on the Caso code — which arrives from storage after
   * mount. Without a latch, a code resolving late would replay a conversion
   * that had already been counted.
   */
  const reportedSuccess = useRef(false);

  const [state, action, isPending] = useActionState(
    submitContactForm,
    initialState
  );

  /**
   * getSessionCode reads and writes sessionStorage, so it cannot run while
   * rendering. It used to be called inline in the hidden input's `value`,
   * which had two consequences: /contacto is a statically prerendered page,
   * so the server took the SSR branch and baked one throwaway random code
   * into the HTML every visitor then received, and the browser replaced it
   * with a different one at hydration. Filling the field from an effect
   * leaves render pure and lets the code be resolved once, in the only place
   * that has the storage to resolve it from.
   *
   * On mount rather than in handleClick so the value is there whichever way
   * the form ends up being submitted.
   */
  useEffect(() => {
    if (sessionCodeRef.current) {
      sessionCodeRef.current.value = getSessionCode();
    }
  }, []);

  useEffect(() => {
    // `spam` is a honeypot hit: the bot is told it succeeded, and nothing is
    // counted. Every one of these used to fire a Google Ads conversion.
    if (state.success && !state.spam && !reportedSuccess.current) {
      reportedSuccess.current = true;

      toast.success("Formulario enviado con éxito", {
        description:
          "Un miembro de nuestro equipo se pondrá en contacto pronto",
        duration: 8000,
      });

      const form = formRef.current;
      const formData = form ? new FormData(form) : null;
      const phone = formData?.get("phone")?.toString() || "";
      const email = formData?.get("email")?.toString() || "";

      trackContactFormSubmission({ email, phone });

      logToSheet({
        landing: window.location.href,
        channel: "contacto-form",
        phone,
        email,
      });
    }
  }, [state.success, state.spam, logToSheet]);

  /**
   * Failures were entirely silent: a rejected captcha produces
   * `errors.token`, which nothing renders, so the visitor sees a form that
   * simply does nothing and the firm never learns the enquiry was attempted.
   * Validation errors are their own signal — `rk_form_fail` is reserved for
   * a send that was technically refused.
   */
  useEffect(() => {
    const failedFields = Object.keys(state.errors ?? {});

    if (state.success || failedFields.length === 0) {
      return;
    }

    if (state.errors?.token) {
      trackEvent("rk_form_fail", {
        form_name: FORM_NAME,
        fail_reason: "captcha",
      });
      return;
    }

    trackEvent("rk_form_error", {
      form_name: FORM_NAME,
      error_fields: failedFields.join(","),
    });
  }, [state]);

  const handleClick = async () => {
    trackEvent("rk_form_submit", { form_name: FORM_NAME });

    const token = await getCaptchaToken();

    if (token && tokenRef.current) {
      tokenRef.current.value = token;
    }

    formRef.current?.requestSubmit();
  };

  return (
    <>
      <Toaster position="bottom-center" />

      <div className="flex h-full flex-2 flex-col justify-end">
        <div className="flex flex-col gap-4 text-white lg:gap-8">
          <h1 className="text-5xl">Contáctanos</h1>
          <p className="lg:max-w-2/3">
            Déjanos tus datos y un abogado de nuestro equipo te contactará
            personalmente.
          </p>

          <form
            ref={formRef}
            action={action}
            onFocusCapture={handleFormStart}
            onPointerDownCapture={handleFormStart}
            className="mt-4 flex max-w-[450px] flex-col gap-6"
          >
            {/* Honeypot for bots */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <input type="hidden" name="token" ref={tokenRef} />
            <input type="hidden" name="sessionCode" ref={sessionCodeRef} />

            <FloatingLabelInput
              id="name"
              label="Nombre y Apellido"
              autoComplete="name"
              defaultValue={state.inputs?.name}
              error={state.errors?.name?.[0]}
              required
            />

            <FloatingLabelInput
              id="email"
              label="Correo"
              type="email"
              autoComplete="email"
              required
              error={state.errors?.email?.[0]}
              defaultValue={state.inputs?.email}
            />

            <div className="flex flex-col gap-2">
              <label
                htmlFor="typeOfServices"
                className="pt-2 text-sm font-bold text-white/80 lg:text-base"
              >
                ¿Qué tipo de servicio buscas?
              </label>
              <select
                id="typeOfServices"
                name="typeOfServices"
                defaultValue=""
                className="border-b border-white/60 bg-transparent text-base text-white focus:border-b focus:ring-0 focus:outline-none"
                required
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                <option value="trabajadores">Trabajador</option>
                <option value="empresa">Empresa</option>
                <option value="otros">Otras áreas</option>
              </select>

              {state.errors?.typeOfServices ? (
                <p className="absolute bottom-[-18px] left-0 text-xs text-[red]">
                  {state.errors.typeOfServices[0]}
                </p>
              ) : null}
            </div>

            <FloatingLabelInput
              id="phone"
              label="Teléfono"
              type="tel"
              autoComplete="tel"
              required
              error={state.errors?.phone?.[0]}
              defaultValue={state.inputs?.phone}
            />

            <div className="flex flex-col gap-2">
              <label
                className="pt-2 text-sm font-bold text-white/80 lg:text-base"
                htmlFor="mensaje"
              >
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                className="resize-none border-1 border-white/60 bg-black/30 p-2 text-base transition-colors outline-none focus:border-white focus:ring-0"
                rows={5}
                placeholder="Describe brevemente tu caso o indícanos que tipo de asesoría necesitas"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="dataConsent"
                name="dataConsent"
                required
              />
              <label htmlFor="dataConsent" className="text-xs text-white/80">
                Acepto{" "}
                <a
                  href={URLS.privacyPolicy()}
                  target="_blank"
                  className="underline"
                  rel="noreferrer"
                >
                  política de privacidad
                </a>
              </label>
            </div>

            {/* TODO Add loading state, and properly send an email with the data to the team */}
            <Button
              disabled={isPending || state.success}
              animateOnClick
              onClick={handleClick}
              className="mt-4 w-full lg:w-40"
              type="button"
              variant="white-outline-on-primary"
            >
              {!isPending ? "Enviar" : <LoadingSpinner />}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
