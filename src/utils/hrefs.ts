export function generatePostHref(postSlug: string | undefined) {
  if (!postSlug) {
    return "/";
  }

  return `/blog/${postSlug}`;
}
