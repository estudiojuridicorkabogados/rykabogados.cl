import Image from "next/image";

import { getPost } from "@/graphql/queries/get-post.query";
import { draftMode } from "next/headers";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Metadata } from "next";
import { ApiPost } from "@/types/global";

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
    const title = post.title || "R&K Abogados - Blog Post";
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
      creator: "R&K Abogados",
      openGraph: {
        title,
        description,
        siteName: "R&K Abogados",
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

  return (
    <div className="bg-white px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-base/7 text-gray-700">
        <figure className="relative aspect-video rounded-xl bg-gray-50 object-cover">
          <Image
            src={post.mainImage?.url || ""}
            alt={post.mainImage?.description || post.title || ""}
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </figure>

        {post.date ? (
          <div className="mt-8 mb-4">
            <time
              dateTime={post.date || new Date().toISOString()}
              className="text-base/7 font-semibold text-indigo-600"
            >
              {format(post.date, "d 'de' MMMM yyyy", { locale: es })}
            </time>
          </div>
        ) : null}

        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
          {post.title}
        </h1>

        <p className="mt-6 text-xl/8">{post.excerpt}</p>

        {/*
        <div className="mt-10 max-w-2xl">
          <p>
            Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
            enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
            praesent donec est. Odio penatibus risus viverra tellus varius sit
            neque erat velit. Faucibus commodo massa rhoncus, volutpat.
            Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
            sed turpis id.
          </p>
          <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
            <li className="flex gap-x-3">
              <span>
                <strong className="font-semibold text-gray-900">
                  Data types.
                </strong>{" "}
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Maiores impedit perferendis suscipit eaque, iste dolor
                cupiditate blanditiis ratione.
              </span>
            </li>
          </ul>
          <p className="mt-8">
            Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis
            odio id et. Id blandit molestie auctor fermentum dignissim. Lacus
            diam tincidunt ac cursus in vel. Mauris varius vulputate et ultrices
            hac adipiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem
            vel integer orci.
          </p>
          <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-gray-900">
            From beginner to expert in 3 hours
          </h2>
          <p className="mt-6">
            Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat
            in. Convallis arcu ipsum urna nibh. Pharetra, euismod vitae interdum
            mauris enim, consequat vulputate nibh. Maecenas pellentesque id sed
            tellus mauris, ultrices mauris. Tincidunt enim cursus ridiculus mi.
            Pellentesque nam sed nullam sed diam turpis ipsum eu a sed convallis
            diam.
          </p>
          <figure className="mt-10 border-l border-indigo-600 pl-9">
            <blockquote className="font-semibold text-gray-900">
              <p>
                “Vel ultricies morbi odio facilisi ultrices accumsan donec lacus
                purus. Lectus nibh ullamcorper ac dictum justo in euismod. Risus
                aenean ut elit massa. In amet aliquet eget cras. Sem volutpat
                enim tristique.”
              </p>
            </blockquote>
            <figcaption className="mt-6 flex gap-x-4">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="size-6 flex-none rounded-full bg-gray-50"
              />
              <div className="text-sm/6">
                <strong className="font-semibold text-gray-900">
                  Maria Hill
                </strong>{" "}
                – Marketing Manager
              </div>
            </figcaption>
          </figure>
          <p className="mt-10">
            Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
            enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
            praesent donec est. Odio penatibus risus viverra tellus varius sit
            neque erat velit.
          </p>
        </div>
        <figure className="mt-16">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3"
            className="aspect-video rounded-xl bg-gray-50 object-cover"
          />
        </figure>
        <div className="mt-16 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900">
            Everything you need to get up and running
          </h2>
          <p className="mt-6">
            Purus morbi dignissim senectus mattis adipiscing. Amet, massa quam
            varius orci dapibus volutpat cras. In amet eu ridiculus leo sodales
            cursus tristique. Tincidunt sed tempus ut viverra ridiculus non
            molestie. Gravida quis fringilla amet eget dui tempor dignissim.
            Facilisis auctor venenatis varius nunc, congue erat ac. Cras
            fermentum convallis quam.
          </p>
          <p className="mt-8">
            Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
            enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
            praesent donec est. Odio penatibus risus viverra tellus varius sit
            neque erat velit.
          </p>
        </div> */}
      </div>
    </div>
  );

  // return (
  //   <main className="container mx-auto px-4 py-8">
  //     <article>
  //       <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
  //       {post.date ? (
  //         <p className="text-gray-500 mb-4">
  //           {new Date(post.date).toLocaleDateString("es-CL", {
  //             year: "numeric",
  //             month: "long",
  //             day: "numeric",
  //           })}
  //         </p>
  //       ) : null}
  //       {post.mainImage && (
  //         <div className="relative h-96 w-full mb-8">
  //           <Image
  //             src={post.mainImage.url || ''}
  //             alt={post.mainImage.description || post.title || ''}
  //             layout="fill"
  //             objectFit="cover"
  //             className="rounded-lg"
  //           />
  //         </div>
  //       )}
  //     </article>
  //   </main>
  // );
}
