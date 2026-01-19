import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2, "Nombre debe tener al menos 2 caracteres"),
  email: z.email("Email inválido"),
  phoneNumber: z
    .string()
    .min(7, "Número de teléfono inválido")
    .max(15, "Número de teléfono inválido"),
  timeSlot: z.string().min(1, "Selecciona un horario"),
  date: z
    .date({ message: "Selecciona una fecha"})
    .nullable(),
  causalDespido: z.string().min(1, "Selecciona un causal de despido"),
  antiguedadLaboral: z.string().min(1, "Selecciona una antigüedad laboral"),
  mensaje: z.string().min(1, "Escribe un mensaje obligatorio"),
});

export type FormData = z.infer<typeof formSchema>;
