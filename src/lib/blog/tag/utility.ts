import {
  BLOG_TAG_SLUG_NOTES,
  BLOG_TAG_SLUG_PAPER_NOTES,
} from "~/lib/blog/tag/constants";
import type { BlogTagData } from "~/lib/blog/tag/schema";

export function blogTagIsNote(tag: BlogTagData): boolean {
  return (
    tag.slug === BLOG_TAG_SLUG_NOTES || tag.slug === BLOG_TAG_SLUG_PAPER_NOTES
  );
}
