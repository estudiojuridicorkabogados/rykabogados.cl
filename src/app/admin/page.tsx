import { notFound } from "next/navigation";

import { env } from "@/lib/env";

import UrlIngestForm from "./_components/UrlIngestForm";

export default async function Home() {
  if (env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <div className="py-24 min-h-[500px] max-w-6xl w-6xl mx-auto">
      <h1 className="text-3xl text-black font-bold">Admin Dashboard</h1>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Ingest content by URL</h2>
        <p className="text-sm text-gray-600">
          Enter a public URL to fetch, extract, embed, and store.
        </p>
        <UrlIngestForm />
      </section>
    </div>
  );
}
