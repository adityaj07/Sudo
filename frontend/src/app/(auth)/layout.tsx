import Image from "next/image"
import Link from "next/link"

import { Icons } from "@/components/icons"

export default function AuthLayout({ children }: React.PropsWithChildren) {
    return (
            <div className="relative grid min-h-screen grid-cols-1 overflow-hidden lg:grid-cols-2">
                <Link
                    href="/"
                    className="absolute left-8 top-6 z-20 flex items-center text-lg font-bold tracking-tight text-foreground/80 transition-colors hover:text-foreground"
                >
                    <Icons.logo className="mr-2 size-6" aria-hidden="true" />
                    <span>Sudo</span>
                </Link>
                <main className="flex items-center justify-center lg:items-center lg:justify-center">
                    {children}
                </main>
                <div className="relative aspect-video size-full hidden lg:flex rounded-xl">
                    <Image
                        src="/images/auth-layout.jpg"
                        alt="Leaf shaped chair"
                        fill
                        className="absolute inset-0 object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            </div>
    )
}