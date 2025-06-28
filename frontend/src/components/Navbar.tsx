import { SparkleIcon, TerminalIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <div className="w-full bg-white/10 backdrop-blur-md border-b rounded-full shadow-sm sticky top-0 z-50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <nav className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-3 group hover:scale-105 transition-transform duration-200"
            >
              <div className="relative">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-400 rounded-lg shadow-lg group-hover:shadow-orange-500/25 transition-all duration-200">
                  <TerminalIcon className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-300 rounded-full animate-pulse"></div>
              </div>
              <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent font-bold text-xl tracking-tight">
                Sudo
              </span>
            </Link>
          </nav>

          {/* Right side - Signup button */}
          <div className="flex items-center gap-4">
            <Link
              href="/sign-up"
              className="hover:shadow-[0_4px_14px_0_#f58123d5] px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg text-white font-semibold transition-all duration-200 ease-linear flex gap-2 justify-center items-center text-sm"
            >
              Sign Up
              <SparkleIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
