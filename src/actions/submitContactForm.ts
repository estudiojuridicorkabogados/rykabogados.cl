"use server";

import { z } from "zod";

import { getGmailOAuth2Client } from "@/lib/google/gmail/getGmailOAuth2Client";
import { sendEmail } from "@/lib/google/gmail/sendEmail";
import { verifyCaptcha } from "@/lib/google/re-captcha/verifyCaptcha";
import { CAMILA_EMAIL, NOTIFICATIONS_EMAIL } from "@/lib/utils/constants";

export interface ActionResponse {
  success: boolean;
  message: string | null;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    mensaje?: string[];
    typeOfServices?: string[];
    token?: string[];
  };
  inputs?: {
    name: string;
    email: string;
    phone: string;
    typeOfServices?: string;
    mensaje?: string;
  };
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  mensaje?: string;
  typeOfServices?: string;
  token?: string;
}

const contactSchema = z.object({
  name: z.string().trim().min(1, "Nombre es necessario"),
  email: z.email("Correo es incorrecto"),
  mensaje: z.string("").optional(),
  typeOfServices: z.string().min(1, "Tipo de servicios es necesario"),
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
    typeOfServices: formData.get("typeOfServices") as string,
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

  console.log("isValidCaptcha", isValidCaptcha);
  if (!isValidCaptcha) {
    return {
      success: false,
      message: "Por favor, completa el CAPTCHA.",
      errors: { token: ["CAPTCHA no válido"] },
      inputs: rawData,
    };
  }

  const gmailOAuth2Client = await getGmailOAuth2Client();

  await Promise.all([
    sendEmail({
      to: rawData.email,
      subject: "Gracias por contactarnos - RK Abogados",
      from: NOTIFICATIONS_EMAIL,
      replyTo: NOTIFICATIONS_EMAIL,
      html: createCustomerEmailHtml(rawData),
      oauth2Client: gmailOAuth2Client,
    }),
    sendEmail({
      to: NOTIFICATIONS_EMAIL,
      subject: "Nueva solicitud de llamada",
      html: createStudioEmailHtml(rawData),
      from: CAMILA_EMAIL,
      replyTo: CAMILA_EMAIL,
      oauth2Client: gmailOAuth2Client,
    }),
  ]);

  return {
    success: true,
    message: "Form submitted succesfully",
  };
}

const createCustomerEmailHtml = (rawData: ContactFormData) => `
  <h2>Hola ${rawData.name},</h2>
  <p>Hemos recibido tu solicitud de contacto.</p>
  <p>Muchas gracias por tu interés en nuestro servicio. Nos pondremos en contacto contigo lo antes posible.</p>
  <br>
  <p>Saludos,<br><strong>RK Abogados</strong></p>
`;

const createStudioEmailHtml = (rawData: ContactFormData) => `
  <h2>Nueva solicitud de contacto de rkabogados.cl</h2>
  <p><strong>Nombre:</strong> ${rawData.name}</p>
  <p><strong>Email:</strong> ${rawData.email}</p>
  <p><strong>Teléfono:</strong> ${rawData.phone}</p>
  <p><strong>Tipo de servicios:</strong> ${rawData.typeOfServices}</p>
  <p><strong>Notas:</strong> ${rawData.mensaje}</p>
`;
