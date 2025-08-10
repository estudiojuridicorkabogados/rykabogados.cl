import { ingestFromPdf, ingestFromUrl } from "@/lib/ai/embeddings";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";

    // JSON mode: { urls: string[] }
    if (contentType.includes("application/json")) {
      return await ingestFromUrls(req);
    }

    // Multipart mode: upload PDFs
    if (contentType.includes("multipart/form-data")) {
      return await ingestFromPdfs(req);
    }

    return NextResponse.json(
      { ok: false, error: "Unsupported content-type" },
      { status: 415 }
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Ingestion failed" },
      { status: 500 }
    );
  }
}

async function ingestFromUrls(req: Request) {
  const body = await req.json();
  const urls: string[] = Array.isArray(body?.urls) ? body.urls : [];
  if (!urls.length) {
    return NextResponse.json(
      { ok: false, error: "Send { urls: string[] } or upload files" },
      { status: 400 }
    );
  }

  const results = [];
  for (const url of urls) {
    const res = await ingestFromUrl(url);
    results.push(res);
  }
  return NextResponse.json({ ok: true, results });
}

async function ingestFromPdfs(req: Request) {
  const form = await req.formData();
  const files = form.getAll("file");
  if (!files.length) {
    return NextResponse.json(
      { ok: false, error: "Attach one or more files in 'file' fields" },
      { status: 400 }
    );
  }

  const results = [];
  for (const file of files) {
    if (!(file instanceof File)) continue;
    const buf = Buffer.from(await file.arrayBuffer());
    const res = await ingestFromPdf(buf, file.name);
    results.push(res);
  }

  return NextResponse.json({ ok: true, results });
}
