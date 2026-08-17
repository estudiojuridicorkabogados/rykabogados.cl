import { draftMode } from "next/headers";

import { getAllPosts } from "@/graphql/queries/get-all-posts.query";
import { ShortPost } from "@/types/global";

import { BlogPostEntry } from "../../_components/BlogPostEntry";

interface RelatedPostsProps {
  currentSlug: string;
  title?: string | null;
}

const RELATED_COUNT = 3;

/**
 * Spanish stop words plus terms that appear in nearly every article title, so
 * they carry no signal when matching related posts.
 */
const STOP_WORDS = new Set([
  "ante",
  "aplica",
  "como",
  "cual",
  "cuales",
  "cuando",
  "debe",
  "deben",
  "del",
  "desde",
  "donde",
  "entre",
  "para",
  "pero",
  "por",
  "que",
  "sobre",
  "una",
  "unos",
  "unas",
  "chile",
  "chileno",
  "chilena",
  "laboral",
  "laborales",
  "trabajo",
  "todo",
  "todos",
  "mas",
  "sus",
  "los",
  "las",
  "con",
  "sin",
  "hacer",
]);

function keywords(title?: string | null) {
  if (!title) {
    return new Set<string>();
  }

  const normalized = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return new Set(
    normalized
      .split(/[^a-z0-9]+/)
      .filter((word) => word.length > 3 && !STOP_WORDS.has(word))
  );
}

function scoreOverlap(a: Set<string>, b: Set<string>) {
  let score = 0;

  for (const word of b) {
    if (a.has(word)) {
      score += 1;
    }
  }

  return score;
}

/**
 * Renders contextual links to sibling articles. Posts have no taxonomy in
 * Contentful, so relatedness is approximated by title keyword overlap and
 * falls back to the most recent articles.
 */
export const RelatedPosts: React.FC<RelatedPostsProps> = async ({
  currentSlug,
  title,
}) => {
  const { isEnabled: isPreview } = await draftMode();

  let posts: ShortPost[] = [];

  try {
    ({ posts } = await getAllPosts({ limit: 100, isPreview }));
  } catch {
    return null;
  }

  const currentKeywords = keywords(title);

  const related = posts
    .filter((post) => post.slug && post.slug !== currentSlug)
    .map((post) => ({
      post,
      score: scoreOverlap(currentKeywords, keywords(post.title)),
    }))
    .toSorted((a, b) => b.score - a.score)
    .slice(0, RELATED_COUNT)
    .map(({ post }) => post);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto mt-20 px-6 lg:max-w-6xl lg:px-8 2xl:w-7xl 2xl:max-w-7xl">
      <h2 className="border-t border-slate-300 pt-10 text-2xl font-bold text-black lg:text-3xl">
        Artículos relacionados
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-16 lg:grid-cols-3">
        {related.map((post) => (
          <BlogPostEntry key={post.slug} blogPost={post} />
        ))}
      </div>
    </section>
  );
};
