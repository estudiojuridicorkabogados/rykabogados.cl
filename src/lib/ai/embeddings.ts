import { openai } from "@ai-sdk/openai";
import { embed, embedMany } from "ai";
import { cosineDistance, desc, gt, sql } from "drizzle-orm";

import "server-only";

import { db } from "../db";
import { embeddings } from "../db/schema/embeddings";

// @TODO The initial embeddings of the RAG are made on a python environment using OpenAI's API.
// We should make sure embeddings match (I think)
const embeddingModel = openai.embedding("text-embedding-ada-002");

export async function findRelevantContent(userQuery: string) {
  const userQueryEmbedded = await generateEmbedding(userQuery);

  const similarity = sql<number>`1 - (${cosineDistance(
    embeddings.embedding,
    userQueryEmbedded
  )})`;

  const similarGuides = await db
    .select({ content: embeddings.content, similarity })
    .from(embeddings)
    .where(gt(similarity, 0.5))
    .orderBy((t) => desc(t.similarity))
    .limit(4);

  return similarGuides;
}

async function generateEmbedding(value: string): Promise<number[]> {
  const input = value.replaceAll("\\n", " ");
  const { embedding } = await embed({
    model: embeddingModel,
    value: input,
  });
  return embedding;
}
