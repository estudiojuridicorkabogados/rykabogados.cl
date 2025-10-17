import { NextResponse } from "next/server";

import { createGoogleCalendarEvent } from "@/lib/google-calendar/createGoogleCalendarEvent";

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

    console.log("Request Body:", body);
    const result = await createGoogleCalendarEvent({
      title: body.title || "Next.js Booking",
      notes: body.notes,
      startTime: body.startTime,
      endTime: body.endTime,
    });

    console.log("Done", result);

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
