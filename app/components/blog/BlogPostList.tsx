import type React from "react";

import { Typography } from "~/components/Typography";
import { Separator } from "~/components/ui/separator";
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
		<div className="w-full font-sans">
			<div className="relative">
				{posts.map((yearGroup, index) => (
					<div key={index} className="flex justify-start">
						<div className="sticky z-10">
							<div className="-left-2 absolute flex size-4 items-center justify-center rounded-full bg-border" />
						</div>

						<div className="-mt-1 mb-8 ml-4">
							<div className="pb-2">
								<Typography
									id={`h-${yearGroup.year}${anchorSuffix}`}
									variant="a"
									className="text-muted-foreground hover:no-underline"
									asChild
								>
									<a href={`#h-${yearGroup.year}${anchorSuffix}`}>
										<h2>{yearGroup.year}</h2>
									</a>
								</Typography>
							</div>

							{yearGroup.months.map((monthGroup) => (
								<div
									key={monthGroup.month}
									className="relative mb-4 flex w-full flex-col gap-2 pl-0 md:pl-4"
								>
									<Typography
										id={`h-${yearGroup.year}-${monthGroup.month}${anchorSuffix}`}
										variant="a"
										className="text-muted-foreground hover:no-underline"
										asChild
									>
										<a
											href={`#h-${yearGroup.year}-${monthGroup.month.toLowerCase()}${anchorSuffix}`}
										>
											<h3>{monthGroup.month}</h3>
										</a>
									</Typography>

									<ul className="list-disc pl-8">
										{monthGroup.posts.map((post) => (
											<li
												key={post.url}
												className="text-balance text-xl md:text-2xl"
											>
												{renderPost(post)}
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</div>
				))}
				<Separator
					orientation="vertical"
					className="-left-[1px] absolute top-0 h-full overflow-hidden"
				/>
			</div>
		</div>
	);
}
