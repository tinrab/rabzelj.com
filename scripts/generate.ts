import { loadBlogPosts } from "../app/lib/blog/post/loader";

export async function generate(): Promise<void> {
	const _posts = await loadBlogPosts();
}
