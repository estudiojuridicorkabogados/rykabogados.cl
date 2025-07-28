import { Children, PropsWithChildren } from "react";
import parse from "html-react-parser";
import Image from "next/image";

import { RichTextAsset } from "@/types/global";

export const Bold: React.FC<PropsWithChildren> = ({ children }) => (
  <span className="font-bold">{children}</span>
);

export const Blockquote: React.FC<PropsWithChildren> = ({ children }) => (
  <div
    className="w-full lg:w-fit lg:mx-auto bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
    role="alert"
  >
    {children}
  </div>
);

export const Alert: React.FC<PropsWithChildren> = ({ children }) => (
  <div
    className="w-fit mt-3 mb-8 mx-8 lg:mx-auto px-1 md:px-2 py-4 lg:p-4 bg-red-100 text-gray-700 shadow-md rounded-xl text-lg"
    role="alert"
  >
    {children}
  </div>
);

export const Text: React.FC<PropsWithChildren> = ({ children }) => {
  const childrenArray = Children.toArray(children);

  if (childrenArray.length === 1 && childrenArray[0] === "") {
    return null;
  }

  return <p className="text-lg mb-2">{children}</p>;
};

export const UnorderedList: React.FC<PropsWithChildren> = ({ children }) => (
  <ul className="list-disc ml-8 mt-3 text-gray-600">{children}</ul>
);

export const OrderedList: React.FC<PropsWithChildren> = ({ children }) => {
  return <ol className="list-decimal ml-8 mt-3 text-gray-600">{children}</ol>;
};

export const ListItem: React.FC<PropsWithChildren> = ({ children }) => (
  <li className="mb-2 text-lg">{children}</li>
);

interface HyperlinkProps {
  uri: string;
}

const YOUTUBE_VIDEO_ID_REGEX =
  /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

export const Hyperlink: React.FC<PropsWithChildren<HyperlinkProps>> = ({
  uri,
  children,
}) => {
  // Only process youtube links
  if (uri.includes("youtube.com")) {
    // Extract videoId from the URL
    const match = YOUTUBE_VIDEO_ID_REGEX.exec(uri);
    const videoId = match && match[7].length === 11 ? match[7] : null;

    if (!videoId) {
      return null;
    }

    return (
      <section className="w-full aspect-video mt-8">
        <iframe
          className="w-full h-full"
          title={`https://youtube.com/embed/${videoId}`}
          src={`https://youtube.com/embed/${videoId}`}
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={false}
        />
      </section>
    );
  }

  return (
    <a
      className="text-primary hover:underline"
      href={uri}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
};

interface HeadingProps {
  size: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Heading: React.FC<PropsWithChildren<HeadingProps>> = ({
  children,
  size,
}) => {
  switch (size) {
    case 1:
      return <h1 className="rich-text-heading text-5xl">{children}</h1>;
    case 2:
      return (
        <h2 className="rich-text-heading font-semibold! text-2xl lg:text-4xl mt-8 lg:mt-12">
          {children}
        </h2>
      );
    case 3:
      return <h3 className="rich-text-heading text-xl">{children}</h3>;
    case 4:
      return <h4 className="rich-text-heading text-lg">{children}</h4>;
    case 5:
      return <h5 className="rich-text-heading text-lg">{children}</h5>;
    case 6:
    default:
      return <h6 className="rich-text-heading text-lg">{children}</h6>;
  }
};

export const Asset: React.FC<{ asset: RichTextAsset }> = ({ asset }) => {
  const url = asset.url;
  const title = asset.title;
  const description = asset.description;

  if (!url) {
    return null;
  }

  if (asset.contentType?.startsWith("video/")) {
    // Videos should be directly added tothe richtext, but should instead be added through the Video Entity
    return null;
  }

  return (
    <div
      className="mx-auto my-8 lg:my-16"
      style={{ maxWidth: `${asset.width}px` }}
    >
      <Image
        className="w-screen loading-background"
        src={url}
        alt={
          description?.replace(/<\/?[^>]+(>|$)/g, "") || "image from the post"
        }
        title={title || ""}
        height={asset.height || 0}
        width={asset.width || 0}
      />
      {title ? (
        <p className="mt-2 px-4 text-gray-600 text-xs italic">{parse(title)}</p>
      ) : null}
    </div>
  );
};
