"use server";

import { z } from "zod";

export interface ActionResponse {
  success: boolean;
  message: string | null;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
  };
  inputs?: {
    name: string;
    email: string;
    phone: string;
  };
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
}

const contactSchema = z.object({
  name: z.string().trim().min(1, "Nombre es necessario"),
  email: z.email("Correo es incorrecto"),
  phone: z
    .string()
    .trim()
    .min(1, "Teléfono es necesario")
    .max(12, "Teléfono es incorrecto"),
});

export async function submitContactForm(
  _: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  const rawData: ContactFormData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
  };

  const validatedData = contactSchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      success: false,
      message: "Por favor, corrige los errores en el form.",
      errors: validatedData.error.flatten().fieldErrors,
      inputs: rawData,
    };
  }

  //   @TODO Do something with this data, possibly send it to slack or to a contact email

  return {
    success: true,
    message: "Form submitted succesfully",
  };
}
