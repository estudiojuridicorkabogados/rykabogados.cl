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
import { env } from "@/lib/env";


const initialState: ActionResponse = {
  success: false,
  message: "",
};

export const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const tokenRef = useRef<HTMLInputElement>(null);

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
          Cuéntanos tu caso, nosotros nos encargamos del resto.
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
              placeholder="Cuéntanos sobre tu requierimento"
            />
          </div>

          {/* TODO Add loading state */}
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

async function getCaptchaToken() {
  return new Promise<string | null>((resolve) => {
    grecaptcha.ready(async () => {
      const siteKey = env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

      if (!siteKey) {
        resolve(null);
        return;
      }

      const token = await grecaptcha.execute(siteKey, {
        action: "contact_us",
      });

      resolve(token);
    });
  });
}
