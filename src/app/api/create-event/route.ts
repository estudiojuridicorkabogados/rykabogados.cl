import { NextResponse } from "next/server";

import { getGmailOAuth2Client } from "@/lib/google/gmail/getGmailOAuth2Client";
import { sendEmail } from "@/lib/google/gmail/sendEmail";
import { createGoogleCalendarEvent } from "@/lib/google/google-calendar/createGoogleCalendarEvent";
import { CAMILA_EMAIL, NOTIFICATIONS_EMAIL } from "@/lib/utils/constants";

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

    if (!result.htmlLink) {
      throw new Error("Failed to create event");
    }

    await dispatchNotificationEmails({
      name: body.name,
      userEmail: body.userEmail,
      phoneNumber: body.phoneNumber,
      notes: body.notes,
      eventHtmlLink: result.htmlLink,
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

interface NotificationEmailArgs {
  name: string;
  userEmail: string;
  phoneNumber: string;
  notes: string;
  eventHtmlLink: string;
}

async function dispatchNotificationEmails(args: NotificationEmailArgs) {
  const gmailOAuth2Client = await getGmailOAuth2Client();

  await sendEmail({
    to: args.userEmail,
    subject: "Gracias por contactarnos",
    html: `<p>Gracias por contactarnos. Hemos recibido tu solicitud y nos pondremos en contacto contigo pronto para confirmar los detalles de la llamada.</p>
    <p>Saludos,<br><strong>RK Abogados</strong></p>`,
    from: NOTIFICATIONS_EMAIL,
    replyTo: NOTIFICATIONS_EMAIL,
    oauth2Client: gmailOAuth2Client,
  });

  await sendEmail({
    to: NOTIFICATIONS_EMAIL,
    subject: "Nueva Asesoria Gratuita",
    html: `<p>
    <p>Nombre: ${args.name}</p>
    <p>Email: ${args.userEmail}</p>
    <p>Teléfono: ${args.phoneNumber}</p>
    <p>Notas: ${args.notes}</p>
    <p>Evento en Calendario: <a href="${args.eventHtmlLink}">${args.eventHtmlLink}</a></p>
    </p>`,
    from: CAMILA_EMAIL,
    replyTo: CAMILA_EMAIL,
    oauth2Client: gmailOAuth2Client,
  });
}
