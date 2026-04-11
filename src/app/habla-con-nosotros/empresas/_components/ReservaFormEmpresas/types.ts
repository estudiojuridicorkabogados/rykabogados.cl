import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2, "Nombre debe tener al menos 2 caracteres"),
  email: z.email("Email inválido"),
  phoneNumber: z
    .string()
    .min(7, "Número de teléfono inválido")
    .max(15, "Número de teléfono inválido"),
  timeSlot: z.string().min(1, "Selecciona un horario"),
  date: z.date({ message: "Selecciona una fecha" }).nullable(),
  motivoAsesoria: z.string().min(1, "Selecciona un motivo de la asesoría"),
  tamanoEmpresa: z.string().min(1, "Selecciona el tamano de la empresa"),
  mensaje: z.string(),
});

export type FormData = z.infer<typeof formSchema>;
