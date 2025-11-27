import { draftMode, headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const draft = await draftMode();
  draft.disable();

  const headersList = await headers();
  const referer = headersList.get("referer");

  return NextResponse.redirect(referer || "/");
}
