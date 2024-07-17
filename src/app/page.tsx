import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IconBrandGithub, IconBrandX } from "@tabler/icons-react";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center px-4 py-6 md:py-24">
			<Avatar className="h-28 w-28">
				<AvatarImage
					src="https://www.gravatar.com/avatar/cc6f46e1bb9eff9bc3d84337fd6b6507?s=512"
					alt="Tin Rabzelj"
				/>
				<AvatarFallback>TR</AvatarFallback>
			</Avatar>
			<h1 className="my-2 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
				Tin Rabzelj
			</h1>
			<h2 className="text-sm text-muted-foreground mb-6">Software Engineer</h2>

			{/* <div className="mb-5 leading-5 text-lg text-center">
				<p>I like Rust and TypeScript.</p>
			</div> */}

			<div className="mb-5 leading-7 text-center">
				<p>
					Check out my blog on <a href="https://flinect.com/blog">Flinect</a>.
				</p>
				<p>
					Find my OSS projects on <a href="https://github.com/tinrab">GitHub</a>
					.
				</p>
				<p>
					My old blog: <a href="https://outcrawl.com/">outcrawl.com</a>.
				</p>
			</div>

			<div className="flex space-x-2">
				<Button size="icon" asChild>
					<a href="https://twitter.com/tinrab">
						<IconBrandX />
					</a>
				</Button>
				<Button size="icon" asChild>
					<a href="https://github.com/tinrab">
						<IconBrandGithub />
					</a>
				</Button>
			</div>
		</main>
	);
}
