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
import { useTracking } from "@/hooks/useTracking";
import { getCaptchaToken } from "@/lib/google/re-captcha/getCaptchaToken";
import { trackContactFormSubmission } from "@/lib/utils/analytics";
import { URLS } from "@/lib/utils/constants";
import { getSessionCode } from "@/lib/utils/tracking";

const initialState: ActionResponse = {
  success: false,
  message: "",
};

export const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const tokenRef = useRef<HTMLInputElement>(null);
  const { logToSheet } = useTracking();

  const [state, action, isPending] = useActionState(
    submitContactForm,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      toast.success("Formulario enviado con éxito", {
        description:
          "Un miembro de nuestro equipo se pondrá en contacto pronto",
        duration: 8000,
      });

      const form = formRef.current;
      const formData = form ? new FormData(form) : null;
      const name = formData?.get("name")?.toString() || "";
      const phone = formData?.get("phone")?.toString() || "";
      const email = formData?.get("email")?.toString() || "";

      trackContactFormSubmission({ name, email, phone });

      logToSheet({
        landing: window.location.href,
        channel: "contacto-form",
        phone,
        email,
      });
    }
  }, [state.success, logToSheet]);

  const handleClick = async () => {
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
            <input type="hidden" name="sessionCode" value={getSessionCode()} />

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
