import { FC } from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { Icons } from "./icons";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <div className="flex justify-between items-center">
      <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/home"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Icons.logo className="h-6 w-6 rounded-sm dark:bg-white" />
          <span className="ml-2">Sudo</span>
        </Link>
      </nav>
      <ModeToggle />
    </div>
  );
};

export default Navbar;
