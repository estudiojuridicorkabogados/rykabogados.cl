import { NextResponse } from "next/server";

import { getCalendarClient } from "@/lib/google-calendar/google-calendar";

// @TODO USE env var
const TARGET_CALENDAR_ID = "c_9e03919b83d6867c1a2c05a3aa4c3a39efa92861f695ca14a0825238bc555616@group.calendar.google.com";

export async function POST(request: Request) {
  try {
    // 1. Parse the request body
    // console.log("REQUEST")
    // const body = await request.json();
    const text = await request.text();
    console.log("TEXT", text);

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

    // 2. Get the authenticated Google Calendar client
    const calendar = await getCalendarClient();

    // 3. Prepare the event data
    const eventDetails = {
      summary: body.title || "Next.js Booking",
      location: body.location,
      description: body.notes,
      start: {
        dateTime: body.startTime,
        timeZone: body.timeZone || "UTC", // Ensure you send a timezone
      },
      end: {
        dateTime: body.endTime,
        timeZone: body.timeZone || "UTC",
      },
    };

    // 4. Insert the event
    const result = await calendar.events.insert({
      calendarId: TARGET_CALENDAR_ID,
      requestBody: eventDetails,
    });

    // 5. Return success response
    return NextResponse.json(
      {
        message: "Event created successfully!",
        eventId: result.data.id,
        htmlLink: result.data.htmlLink,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Calendar API Error:", error);
    // Return a generic error to the client for security
    return NextResponse.json(
      {
        error: "Failed to create event due to a server error.",
      },
      { status: 500 }
    );
  }
}
