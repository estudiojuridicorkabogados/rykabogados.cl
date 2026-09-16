import type { Asset } from "@/types/generated/graphql";
import type { Image } from "@/types/global";

/**
 * Contentful's raw asset URLs are un-transcoded originals — the AI-generated
 * blog images in particular come back as multi-MB lossless PNGs. Requesting
 * them through Contentful's own Images API (fm=webp&q=80) up front means
 * Next's on-demand image optimizer resizes an already-small source instead of
 * a several-MB PNG, which is what was making the hero image so slow to
 * appear (each new width/format hits the optimizer's cache cold once).
 *
 * Only used for on-page <Image> rendering, not for OG/JSON-LD image URLs,
 * since those should stay on the canonical source format.
 */
export function optimizedContentfulImageUrl(
  url?: string | null
): string | undefined {
  if (!url) {
    return undefined;
  }

  try {
    const parsed = new URL(url);
    parsed.searchParams.set("fm", "webp");
    parsed.searchParams.set("q", "80");
    return parsed.toString();
  } catch {
    return url;
  }
}

export function extractImageDataFromContentfulAsset(
  contentfulAsset: Asset | undefined
): Image | undefined {
  if (!contentfulAsset) {
    return undefined;
  }

  return {
    url: contentfulAsset.url,
    description: contentfulAsset.description,
    details: {
      height: contentfulAsset.height,
      width: contentfulAsset.width,
    },
  };
}
