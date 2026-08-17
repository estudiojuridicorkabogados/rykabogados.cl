import { NextResponse } from "next/server";

import { fetchPostRoutes } from "@/lib/contentful/post-routes";

export async function GET() {
  try {
    const posts = await fetchPostRoutes();

    return NextResponse.json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch posts",
    });
  }
}
