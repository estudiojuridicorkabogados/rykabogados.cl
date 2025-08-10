import { format } from "date-fns";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { BlogPosting, WithContext } from "schema-dts";

import { getPost } from "@/graphql/queries/get-post.query";
import { ApiPost } from "@/types/global";
import { URLS } from "@/lib/utils/constants";

import { BlogPost } from "./_components/BlogPost";

interface BlogPostPageParams {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
      next: { revalidate: 3600 },
    });

    const { posts } = (await res.json()) as { posts: ApiPost[] };

    return posts.map(({ slug }) => ({ params: { slug } }));
  } catch (error) {
    console.log("Could pre generate blog posts pages due to");
    console.error(error);
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

    // @TODO Add metaTitle and metaDescription to the Post type
    const title = post.title || "RyK Abogados - Blog Post";
    const description = "post.smallIntro";
    // const title = post.metaTitle;
    // const description = post.smallIntro;
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
      creator: "RyK Abogados",
      openGraph: {
        title,
        description,
        siteName: "RyK Abogados",
        images,
        locale: "es-CL",
        url: new URL(`/blog/${slug}`, process.env.NEXT_PUBLIC_BASE_URL),
      },
      twitter: { card: "summary_large_image", title, description, images },
    };
  } catch (error) {
    return {};
  }
}

export default async function BlogPostPage({ params }: BlogPostPageParams) {
  const { slug } = await params;

  const { isEnabled: isPreview } = await draftMode();

  const post = await getPost({ slug, isPreview });

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${URLS.blogPost(post.slug || "")}`;
  const jsonLd: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}/#BlogPosting`,
    name: post.title || "RyK Abogados - Blog Post",
    description: "post.metaDescription",
    // description: post.metaDescription,
    datePublished: post.date
      ? format(new Date(post.date), "yyyy-MM-dd")
      : undefined,
    author: {
      "@type": "Person",
      "@id": `R&KAbogados/#Person`,
      name: "R&KAbogados",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
