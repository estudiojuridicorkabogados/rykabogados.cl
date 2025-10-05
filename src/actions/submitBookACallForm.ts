"use server";

import { FormData } from "../app/habla-con-nosotros/_components/ReservaForm/types";

export async function submitBookACallForm(data: FormData) {
  try {
    // Your server-side logic here
    // e.g., save to database, send emails, etc.
    console.log("Server action received:", data);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return success response
    return { success: true, message: "Reserva enviada exitosamente" };
  } catch (error) {
    console.error("Error submitting reservation:", error);
    return { success: false, message: "Error al enviar la reserva" };
  }
}