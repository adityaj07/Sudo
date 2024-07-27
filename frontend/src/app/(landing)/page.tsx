import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { hindMadurai } from "@/lib/fonts";

export default function Home() {
  return (
    <main
      className={`${hindMadurai.className} flex min-h-screen flex-col items-center justify-start pt-24 text-center`}
    >
      <h1 className="text-6xl text-pretty font-black">Sudo</h1>
      <p className="text-2xl pt-3">The Blogging platform for developers</p>
      <div className="flex gap-4 justify-center items-center mt-8">
        <Button variant="default" asChild>
          <Link
            href="/sign-up"
            className="text-primary underline-offset-4 transition-colors hover:underline"
          >
            Sign up
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link
            href="/sign-in"
            className="text-primary underline-offset-4 transition-colors hover:underline"
          >
            Sign in
          </Link>
        </Button>
      </div>
    </main>
  );
}
