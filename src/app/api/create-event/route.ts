import { NextResponse } from "next/server";

import { sendEmail } from "@/lib/google/gmail/sendEmail";
import { createGoogleCalendarEvent } from "@/lib/google/google-calendar/createGoogleCalendarEvent";

export async function POST(request: Request) {
  try {
    const text = await request.text();

    let body;
    try {
      body = JSON.parse(text);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      return NextResponse.json(
        {
          error: "Invalid JSON in request body",
        },
        { status: 400 }
      );
    }

    const result = await createGoogleCalendarEvent({
      title: "Asesoria Gratuita",
      notes: body.notes,
      userEmail: body.userEmail,
      startTime: body.startTime,
      endTime: body.endTime,
    });

    await sendEmail({
      to: body.userEmail,
      subject: "Gracias por contactarnos",
      html: `<p>Gracias por contactarnos. Hemos recibido tu solicitud y nos pondremos en contacto contigo pronto para confirmar los detalles de la llamada.</p>
      <p>Saludos,<br><strong>RK Abogados</strong></p>`,
      from: "notificaciones@ryoasociados.cl",
      replyTo: "notificaciones@ryoasociados.cl",
    });

    await sendEmail({
      to: "notificaciones@ryoasociados.cl",
      subject: "Nueva Asesoria Gratuita",
      html: `<p>
      <p>Nombre: ${body.name}</p>
      <p>Email: ${body.email}</p>
      <p>Teléfono: ${body.phoneNumber}</p>
      <p>Notas: ${body.notes}</p>
      <p>Evento en Calendario: <a href="${result.htmlLink}">${result.htmlLink}</a></p>
      </p>`,
      from: "camila.retamales@rkabogados.cl",
      replyTo: "camila.retamales@rkabogados.cl",
    });

    return NextResponse.json(
      {
        message: "Event created successfully!",
        eventId: result.eventId,
        htmlLink: result.htmlLink,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Calendar API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to create event due to a server error.",
      },
      { status: 500 }
    );
  }
}
