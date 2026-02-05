"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

import {
  type ActionResponse,
  submitContactForm,
} from "@/actions/submitContactForm";
import { FloatingLabelInput } from "@/components/Input/FloatingLabelInput";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useTracking } from "@/hooks/useTracking";
import { getCaptchaToken } from "@/lib/google/re-captcha/getCaptchaToken";
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
    }
  }, [state.success]);

  // Add form submission tracking
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const handleSubmitTracking = () => {
      const formData = new FormData(form);
      const phone = formData.get("phone")?.toString() || "";
      const email = formData.get("email")?.toString() || "";

      logToSheet({
        landing: window.location.href,
        channel: "contacto-form",
        phone,
        email,
      });
    };

    form.addEventListener("submit", handleSubmitTracking);
    return () => {
      form.removeEventListener("submit", handleSubmitTracking);
    };
  }, [logToSheet]);

  const handleClick = async () => {
    const token = await getCaptchaToken();

    if (token && tokenRef.current) {
      tokenRef.current.value = token;
    }

    formRef.current?.requestSubmit();
  };

  return (
    <div className="flex-2 flex flex-col justify-end h-full">
      <div className="flex flex-col gap-4 lg:gap-8 text-white">
        <h1 className="text-5xl">Contáctanos</h1>
        <p className="lg:max-w-2/3">
          Déjanos tus datos y un abogado de nuestro equipo te contactará
          personalmente.
        </p>

        <form
          ref={formRef}
          action={action}
          className="max-w-[450px] flex flex-col gap-6 mt-4"
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
            <label className="font-bold text-white/80 text-sm lg:text-base pt-2">
              ¿Qué tipo de servicio buscas?
            </label>
            <select
              name="typeOfServices"
              defaultValue=""
              className="bg-transparent border-b border-white/60 text-white focus:outline-none focus:ring-0 focus:border-b"
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
              className="font-bold text-white/80 text-sm lg:text-base pt-2"
              htmlFor="mensaje"
            >
              Mensaje
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              className="border-1 p-2 bg-black/30 resize-none transition-colors border-white/60 focus:border-white outline-none focus:ring-0 text-sm lg:text-base"
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
            <label htmlFor="dataConsent" className="text-white/80 text-xs">
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
            className="w-full lg:w-40 mt-4"
            type="button"
            variant="white-outline-on-primary"
          >
            {!isPending ? "Enviar" : <LoadingSpinner />}
          </Button>
        </form>
      </div>
    </div>
  );
};
