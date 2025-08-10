'use client';

import { useState } from 'react';

export default function UrlIngestForm() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/embeddings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls: [url] }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || `Request failed (${res.status})`);
      setResult(data.results?.[0] ?? null);
      setUrl('');
    } catch (err: any) {
      setError(err.message || 'Failed to ingest URL');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 rounded border p-4">
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          type="url"
          required
          placeholder="https://example.com/page"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
        >
          {loading ? 'Ingesting...' : 'Ingest URL'}
        </button>
      </form>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {result && (
        <div className="mt-4 text-sm">
          <p className="font-medium">Done</p>
          <p>Source: {result.source}</p>
          {result.title ? <p>Title: {result.title}</p> : null}
          <p>Chunks: {result.chunks}</p>
          <p>Inserted: {result.inserted}</p>
        </div>
      )}
    </div>
  );
}