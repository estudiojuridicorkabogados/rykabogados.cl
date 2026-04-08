import { format } from "date-fns";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { BlogPosting, WithContext } from "schema-dts";

import { getPost } from "@/graphql/queries/get-post.query";
import { env } from "@/lib/env";
import { URLS } from "@/lib/utils/constants";
import { ApiPost } from "@/types/global";

import { BlogPost } from "./_components/BlogPost";

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
      : [];

    return {
      title,
      description,
      creator: "RK Abogados",
      openGraph: {
        title,
        description,
        siteName: "RK Abogados",
        images,
        locale: "es-CL",
        url: new URL(`/blog/${slug}`, env.NEXT_PUBLIC_BASE_URL),
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

  const url = `${env.NEXT_PUBLIC_BASE_URL}${URLS.blogPost(post.slug || "")}`;
  const jsonLd: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}/#BlogPosting`,
    name: post.metaTitle || post.title || "RK Abogados - Blog Post",
    description:
      post.metaDescription || post.excerpt || "RK Abogados - Blog Post",
    datePublished: post.date ? format(post.date, "yyyy-MM-dd") : undefined,
    author: {
      "@type": "Person",
      "@id": `${post.author?.name}/#Person`,
      name: post.author?.name || "RK Abogados",
    },
    image: {
      "@type": "ImageObject",
      "@id": `${post.mainImage?.url}/#ImageObject`,
      url: post.mainImage?.url || "",
      height: "362",
      width: "388",
    },
    url,
  };

  return (
    <>
      <BlogPost post={post} />

      <script
        type="application/ld+json"
        suppressHydrationWarning={true}
        /* eslint-disable-next-line @eslint-react/dom-no-dangerously-set-innerhtml */
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
