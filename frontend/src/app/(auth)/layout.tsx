import Link from "next/link";

import { Icons } from "@/components/icons";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="relative grid min-h-screen grid-cols-1 overflow-hidden lg:grid-cols-2">
      {/* Logo */}
      <Link
        href="/"
        className="absolute left-8 top-6 z-20 flex items-center text-lg font-bold tracking-tight text-foreground/80 transition-colors hover:text-foreground"
      >
        <Icons.logo className="mr-2 size-6" aria-hidden="true" />
        <span>Sudo</span>
      </Link>

      {/* Left side - Form content */}
      <main className="relative flex items-center justify-center bg-gradient-to-br from-orange-50/30 via-background to-orange-100/20 dark:from-orange-950/20 dark:via-background dark:to-orange-900/10">
        <div className="relative z-10 w-full max-w-md px-6">{children}</div>

        {/* Subtle dot pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(251, 146, 60, 0.3) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
        </div>
      </main>

      {/* Right side - Enhanced design with proper rounding */}
      <div className="relative hidden lg:block rounded-xl">
        <div className="h-full m-4 overflow-hidden rounded-3xl shadow-2xl">
          {/* Primary gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600" />

          {/* Secondary gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-300/30 via-transparent to-amber-400/20" />

          {/* Mesh gradient orbs */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-gradient-radial from-orange-300/40 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-radial from-amber-300/30 to-transparent rounded-full blur-3xl" />
          </div>

          {/* Sophisticated SVG pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {/* Hexagon grid pattern */}
                <pattern
                  id="hex-grid"
                  x="0"
                  y="0"
                  width="60"
                  height="52"
                  patternUnits="userSpaceOnUse"
                >
                  <polygon
                    points="30,4 45,14 45,34 30,44 15,34 15,14"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                    opacity="0.4"
                  />
                </pattern>

                {/* Flowing curves */}
                <pattern
                  id="flow-lines"
                  x="0"
                  y="0"
                  width="120"
                  height="60"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M0,30 Q30,10 60,30 T120,30"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                    opacity="0.3"
                  />
                  <path
                    d="M0,45 Q30,25 60,45 T120,45"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.3"
                    opacity="0.2"
                  />
                </pattern>

                {/* Radial fade mask */}
                <radialGradient id="radial-fade" cx="50%" cy="50%" r="70%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="white" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>
              </defs>

              <rect width="100%" height="100%" fill="url(#hex-grid)" />
              <rect
                width="100%"
                height="100%"
                fill="url(#flow-lines)"
                mask="url(#radial-fade)"
              />
            </svg>
          </div>

          {/* Content with better typography */}
          <div className="relative h-full flex items-center justify-center p-12">
            <div className="max-w-lg text-center text-white space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold leading-tight tracking-tight">
                  Unleash Your
                  <span className="block text-5xl bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent">
                    Creative Voice
                  </span>
                </h1>
                <p className="text-xl leading-relaxed text-white/90 font-light">
                  Join a community where stories come alive and writers connect
                  across the globe.
                </p>
              </div>

              {/* Enhanced feature list */}
              <div className="space-y-4 pt-6">
                <div className="flex items-center justify-center space-x-4 text-white/80">
                  <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-white/40" />
                  <span className="text-sm font-medium">Features</span>
                  <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-white/40" />
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center space-x-3 text-white/90">
                    <div className="w-2 h-2 bg-white/60 rounded-full" />
                    <span className="text-sm">
                      Publish and share your stories
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/90">
                    <div className="w-2 h-2 bg-white/60 rounded-full" />
                    <span className="text-sm">
                      Build your writing community
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/90">
                    <div className="w-2 h-2 bg-white/60 rounded-full" />
                    <span className="text-sm">
                      Grow your creative portfolio
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subtle inner border */}
          <div className="absolute inset-2 rounded-2xl border border-white/10" />
        </div>
      </div>
    </div>
  );
}
