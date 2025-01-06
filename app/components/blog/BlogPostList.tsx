import { Typography } from "~/components/Typography";
import type { BlogPostCommon, BlogPostYearGroup } from "~/lib/blog/post/schema";

interface BlogPostListProps<T extends BlogPostCommon> {
	posts: BlogPostYearGroup<T>[];
	renderPost: (post: T) => React.ReactNode;
	anchorSuffix?: string;
}

export function BlogPostList<T extends BlogPostCommon>({
	posts,
	renderPost,
	anchorSuffix = "",
}: BlogPostListProps<T>) {
	return (
		<>
			{posts.map((yearGroup) => (
				<div key={yearGroup.year}>
					<Typography
						id={`h-${yearGroup.year}${anchorSuffix}`}
						gutter
						variant="h3"
						asChild
					>
						<a
							href={`#h-${yearGroup.year}${anchorSuffix}`}
							className="text-foreground"
						>
							<h2>{yearGroup.year}</h2>
						</a>
					</Typography>

					<div>
						{yearGroup.months.map((monthGroup) => (
							<div key={monthGroup.month} className="pl-0 md:pl-2">
								<Typography
									id={`h-${yearGroup.year}-${monthGroup.month}${anchorSuffix}`}
									gutter
									variant="h5"
									asChild
								>
									<a
										href={`#h-${yearGroup.year}-${monthGroup.month}${anchorSuffix}`}
										className="text-foreground"
									>
										<h3>{monthGroup.month}</h3>
									</a>
								</Typography>

								<ul className="list-disc pl-4">
									{monthGroup.posts.map((post) => (
										<li key={post.url}>{renderPost(post)}</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
			))}
		</>
	);
}
