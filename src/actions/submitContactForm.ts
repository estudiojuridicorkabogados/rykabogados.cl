"use server";

import { z } from "zod";

import { env } from "@/lib/env";

export interface ActionResponse {
  success: boolean;
  message: string | null;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    mensaje?: string[];
    token?: string[];
  };
  inputs?: {
    name: string;
    email: string;
    phone: string;
    mensaje?: string;
  };
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  mensaje?: string;
  token?: string;
}

const contactSchema = z.object({
  name: z.string().trim().min(1, "Nombre es necessario"),
  email: z.email("Correo es incorrecto"),
  mensaje: z.string("").optional(),
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
  const honeypot = (formData.get("company") as string) || "";
  if (honeypot.trim().length > 0) {
    return { success: true, message: "Form submitted succesfully" };
  }

  const rawData: ContactFormData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    mensaje: formData.get("mensaje") as string,
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

  const token = formData.get("token") as string;

  const isValidCaptcha = await verifyCaptcha(token);

  if (!isValidCaptcha) {
    return {
      success: false,
      message: "Por favor, completa el CAPTCHA.",
      errors: { token: ["CAPTCHA no válido"] },
      inputs: rawData,
    };
  }

  // @TODO Do something with this data, possibly send it to slack or to a contact email

  return {
    success: true,
    message: "Form submitted succesfully",
  };
}

async function verifyCaptcha(token: string): Promise<boolean> {
  const secretKey = env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    return false;
  }

  const url = new URL("https://www.google.com/recaptcha/api/siteverify");
  url.searchParams.append("secret", secretKey);
  url.searchParams.append("response", token);

  const response = await fetch(url, { method: "POST" });

  const data = await response.json();

  return data.success;
}
