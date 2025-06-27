import { ApiPost } from "@/types/global";

const BASE_PATHS = [
  "",
  "/asesoria-empresas",
  "/asesoria-trabajadores",
  "/blog",
  "/contacto",
  "/habla-con-nosotros",
  "/aviso-legal",
];

async function fetchPostRoutes() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`, {
    next: { revalidate: 30 },
  });

  const { posts } = await res.json();

  return posts.map((post: { slug: string; lastModified: Date }) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug}`,
    lastModified: post.lastModified,
  }));
}

export default async function sitemap() {
  const baseRoutes = BASE_PATHS.map((path) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}${path}`,
    lastModified: new Date().toISOString(),
  }));

  const postsRoutes = await fetchPostRoutes();

  return [...baseRoutes, ...postsRoutes];
}
