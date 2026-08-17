import { format } from "date-fns";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { BlogPosting, WithContext } from "schema-dts";

import { JsonLd } from "@/components/JsonLd/JsonLd";
import { getPost } from "@/graphql/queries/get-post.query";
import { env } from "@/lib/env";
import { buildBreadcrumbJsonLd, ORGANIZATION_ID } from "@/lib/seo/jsonLd";
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  SITE_LOCALE,
  SITE_NAME,
} from "@/lib/seo/site";
import { URLS } from "@/lib/utils/constants";
import { ApiPost } from "@/types/global";

import { BlogPost } from "./_components/BlogPost";
import { RelatedPosts } from "./_components/RelatedPosts";

interface BlogPostPageParams {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/posts`);

    const { posts } = (await res.json()) as { posts: ApiPost[] };

    return posts.map(({ slug }) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageParams): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { isEnabled: isPreview } = await draftMode();
    const post = await getPost({ slug, isPreview });

    if (!post) {
      return {};
    }

    const title = post.metaTitle || post.title || "RK Abogados - Blog Post";
    const description =
      post.metaDescription || post.excerpt || "RK Abogados - Blog Post";

    const images = post.mainImage?.url
      ? [
          {
            url: new URL(post.mainImage.url),
            height: post.mainImage?.details.height || 569,
            width: post.mainImage?.details.width || 853,
          },
        ]
      : [DEFAULT_OG_IMAGE];

    const url = absoluteUrl(URLS.blogPost(slug));

    return {
      title,
      description,
      creator: SITE_NAME,
      alternates: { canonical: url },
      openGraph: {
        type: "article",
        title,
        description,
        siteName: SITE_NAME,
        images,
        locale: SITE_LOCALE,
        url,
        publishedTime: post.date,
        authors: post.author?.name ? [post.author.name] : undefined,
      },
      twitter: { card: "summary_large_image", title, description, images },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: BlogPostPageParams) {
  const { slug } = await params;

  const { isEnabled: isPreview } = await draftMode();

  const post = await getPost({ slug, isPreview });

  const url = absoluteUrl(URLS.blogPost(post.slug || slug));
  const jsonLd: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#BlogPosting`,
    headline: post.title || post.metaTitle || "RK Abogados - Blog Post",
    name: post.metaTitle || post.title || "RK Abogados - Blog Post",
    description:
      post.metaDescription || post.excerpt || "RK Abogados - Blog Post",
    datePublished: post.date ? format(post.date, "yyyy-MM-dd") : undefined,
    dateModified: post.date ? format(post.date, "yyyy-MM-dd") : undefined,
    inLanguage: "es-CL",
    author: {
      "@type": "Person",
      name: post.author?.name || SITE_NAME,
      worksFor: { "@id": ORGANIZATION_ID },
    },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: post.mainImage?.url
      ? {
          "@type": "ImageObject",
          url: post.mainImage.url,
          height: String(post.mainImage.details.height ?? 569),
          width: String(post.mainImage.details.width ?? 853),
        }
      : undefined,
    url,
  };

  const breadcrumbs = buildBreadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Blog", path: URLS.blog() },
    { name: post.title || slug, path: URLS.blogPost(post.slug || slug) },
  ]);

  return (
    <>
      <BlogPost post={post} />

      <RelatedPosts currentSlug={post.slug || slug} title={post.title} />

      <JsonLd schema={[jsonLd, breadcrumbs]} />
    </>
  );
}
