import { env } from "@/lib/env";

const BASE_PATHS = [
  "",
  "/asesoria-empresas",
  "/asesoria-trabajadores",
  "/otras-areas",
  "/blog",
  "/nosotros",
  "/contacto",
  "/habla-con-nosotros",
  "/aviso-legal",
  "/faq",
  "/politica-cookies"
];

async function fetchPostRoutes() {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
      next: { revalidate: 30 },
    });

    const { posts } = await res.json();

    return posts.map((post: { slug: string; lastModified: Date }) => ({
      url: `${env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug}`,
      lastModified: post.lastModified,
    }));
  } catch (error) {
    console.error("Error fetching post routes:", error);
    return [];
  }
}

export default async function sitemap() {
  const baseRoutes = BASE_PATHS.map((path) => ({
    url: `${env.NEXT_PUBLIC_BASE_URL}${path}`,
    lastModified: new Date().toISOString(),
  }));

  const postsRoutes = await fetchPostRoutes();

  return [...baseRoutes, ...postsRoutes];
}
