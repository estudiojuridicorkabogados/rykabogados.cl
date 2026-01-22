import { NextRequest, NextResponse } from "next/server";

const COOKIE_DAYS = 90;
const PARAMS_TO_SET = ["gclid", "utm_source", "utm_medium", "utm_campaign"];
const MAX_AGE = COOKIE_DAYS * 86400; // 90 days in seconds

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const searchParams = request.nextUrl.searchParams;

  // Process each parameter
  PARAMS_TO_SET.forEach((param) => {
    const value = searchParams.get(param);
    if (value) {
      response.cookies.set(param, encodeURIComponent(value), {
        maxAge: MAX_AGE,
        path: "/",
        sameSite: "lax",
      });
    }
  });

  return response;
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
