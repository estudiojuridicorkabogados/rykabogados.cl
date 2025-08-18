"use client";

import { Button } from "@/components/ui/Button";
import { FloatingLabelInput } from "./FloatingLabelInput";
import {
  type ActionResponse,
  submitContactForm,
} from "@/actions/submitContactForm";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialState: ActionResponse = {
  success: false,
  message: "",
};

export const ContactForm = () => {
  const [state, action, isPending] = useActionState(
    submitContactForm,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      toast.success("Formulario enviado con éxito", {
        description: "Un miembro de nuestro equipo se pondrá en contacto pronto",
        duration: 8000,
      });
    }
  }, [state.success]);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-5xl text-white">Contáctanos</h1>
      <p>
        Tras más de cuatro décadas sin una modificación estructural al sistema
        previsional chileno, la nueva{" "}
      </p>

      <form action={action} className="max-w-[450px] flex flex-col gap-6">
        <FloatingLabelInput
          id="name"
          label="Nombre"
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

        <Button
          disabled={isPending || state.success}
          animateOnClick
          className="w-fit mt-4"
          type="submit"
          variant="white-outline-on-primary"
        >
          Enviar
        </Button>
      </form>
    </div>
  );
};
