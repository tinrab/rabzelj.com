import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { IconBrandGithub, IconBrandX, IconX } from '@tabler/icons-react';
import Image from 'next/image';

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
      <h2 className="text-sm text-muted-foreground">Software Engineer</h2>

      <p className="my-4 leading-7">
        Check out my blog and side projects at{' '}
        <a href="https://flinect.com/blog">Flinect</a>.
      </p>

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
