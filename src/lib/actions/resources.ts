'use server';

import {
  insertResourceSchema,
  NewResourceParams,
  resources,
} from '@/lib/db/schema/resources';

import { generateEmbeddings } from '../ai/embeddings';
import { db } from '../db';
import { embeddings as embeddingsTable } from '../db/schema/embeddings';

// @TODO Here resources should be stored in a reasonable way so that we can point resources to what the actual source is (pdf, URL, etc...)
export const createResource = async (input: NewResourceParams) => {
  try {
    const { content } = insertResourceSchema.parse(input);

    const [resource] = await db
      .insert(resources)
      .values({ content })
      .returning();

    const embeddings = await generateEmbeddings(content);
    await db.insert(embeddingsTable).values(
      embeddings.map(embedding => ({
        resourceId: resource.id,
        ...embedding,
      })),
    );

    return 'Resource successfully created and embedded.';
  } catch (error) {
    return error instanceof Error && error.message.length > 0
      ? error.message
      : 'Error, please try again.';
  }
};