import { openai } from "@ai-sdk/openai";
import { Readability } from "@mozilla/readability";
import { embed, embedMany } from "ai";
import { cosineDistance, desc, gt, inArray, sql } from "drizzle-orm";
import { JSDOM } from "jsdom";
import pdfParse from "pdf-parse";

import "server-only";

import { db } from "../db";
import { embeddings } from "../db/schema/embeddings";

const embeddingModel = openai.embedding("text-embedding-ada-002");

const generateChunks = (input: string): string[] => {
  return input
    .trim()
    .split(".")
    .filter((i) => i !== "");
};

export const generateEmbeddings = async (
  value: string
): Promise<Array<{ embedding: number[]; content: string }>> => {
  const chunks = generateChunks(value);

  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: chunks,
  });

  return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }));
};

// Simple normalization
const normalizeText = (input: string) =>
  input.replace(/\r/g, "").replace(/\s+/g, " ").trim();

// Token-agnostic chunking with overlap (safe default sizes)
const chunkText = (text: string, chunkSize = 1200, overlap = 150): string[] => {
  const clean = normalizeText(text);
  if (!clean) return [];
  const chunks: string[] = [];
  let i = 0;
  while (i < clean.length) {
    const end = Math.min(i + chunkSize, clean.length);
    const chunk = clean.slice(i, end).trim();
    if (chunk) chunks.push(chunk);
    i += Math.max(1, chunkSize - overlap);
  }
  return chunks;
};


export async function ingestFromText(
  value: string
): Promise<{ inserted: number; chunks: number }> {
  const chunks = chunkText(value, 1200, 150);

  if (chunks.length === 0) return { inserted: 0, chunks: 0 };

  // De-dup by exact content already stored
  const existing = await db
    .select({ content: embeddings.content })
    .from(embeddings)
    .where(inArray(embeddings.content, chunks));
  const existingSet = new Set(existing.map((e) => e.content));

  const { embeddings: vecs } = await embedMany({
    model: embeddingModel,
    values: chunks,
  });

  const rows = [];
  for (let i = 0; i < chunks.length; i++) {
    const content = chunks[i];
    if (existingSet.has(content)) continue;
    rows.push({ content, embedding: vecs[i] });
  }
  if (rows.length > 0) {
    await db.insert(embeddings).values(rows);
  }
  return { inserted: rows.length, chunks: chunks.length };
}

export async function extractTextFromUrl(
  url: string
): Promise<{ title: string | null; text: string }> {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const html = await res.text();
  const dom = new JSDOM(html, { url });
  const reader = new Readability(dom.window.document);
  const article = reader.parse();
  const title = article?.title ?? dom.window.document.title ?? null;
  const text = (
    article?.textContent ||
    dom.window.document.body?.textContent ||
    ""
  ).trim();
  return { title, text };
}

export async function ingestFromUrl(
  url: string
): Promise<{
  source: string;
  title: string | null;
  inserted: number;
  chunks: number;
}> {
  const { title, text } = await extractTextFromUrl(url);
  const res = await ingestFromText(text);
  return { source: url, title, ...res };
}

// Ingest from PDF buffer
export async function ingestFromPdf(
  buffer: Buffer,
  filename?: string
): Promise<{
  source: string | undefined;
  title: string | undefined;
  inserted: number;
  chunks: number;
}> {
  const parsed = await pdfParse(buffer);
  const text = (parsed.text || "").trim();
  const res = await ingestFromText(text);
  return { source: filename, title: filename, ...res };
}

// Retrieveal Helpers
export const generateEmbedding = async (value: string): Promise<number[]> => {
  const input = value.replaceAll("\\n", " ");
  const { embedding } = await embed({
    model: embeddingModel,
    value: input,
  });
  return embedding;
};


export const findRelevantContent = async (userQuery: string) => {
  const userQueryEmbedded = await generateEmbedding(userQuery);
  const similarity = sql<number>`1 - (${cosineDistance(
    embeddings.embedding,
    userQueryEmbedded
  )})`;
  const similarGuides = await db
    .select({ name: embeddings.content, similarity })
    .from(embeddings)
    .where(gt(similarity, 0.5))
    .orderBy((t) => desc(t.similarity))
    .limit(4);
  return similarGuides;
};
