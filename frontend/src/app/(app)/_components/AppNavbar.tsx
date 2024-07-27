"use client";

import { Icons } from "@/components/icons";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  BellIcon,
  Bookmark,
  CircleUser,
  Home,
  List,
  LogOutIcon,
  Menu,
  Package2,
  PenIcon,
  Search,
  Settings,
  User2,
} from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface AppNavbarProps {}

const AppNavbar: FC<AppNavbarProps> = ({}) => {
  const handleLogout = async () => {};
  return (
    <div className="">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b border-[#666666d0] bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/home"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Icons.logo className="h-6 w-6 rounded-sm dark:bg-white" />
            <span className="ml-2">Sudo</span>
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Icons.logo className="h-6 w-6 rounded-sm dark:bg-white" />
                <span className="ml-2 text-xl">Sudo</span>
              </Link>
              <Link
                href="/home"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <Home className="h-5 w-5 rounded-sm" />
                <span className="ml-2">Home</span>
              </Link>
              <Link
                href="/my-blogs"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <List className="h-5 w-5 rounded-sm" />
                <span className="ml-2">My blogs</span>
              </Link>
              <Link
                href="/bookmarks"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <Bookmark className="h-5 w-5 rounded-sm" />
                <span className="ml-2">Bookmarks</span>
              </Link>
              <Link
                href="/notifications"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <BellIcon className="h-5 w-5 rounded-sm" />
                <span className="ml-2">Notifications</span>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center justify-between gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="relative w-[75%] md:w-[60%] lg:w-[50%] mx-auto">
            <Link
              href="/home"
              className="flex md:hidden items-center gap-2 text-lg font-semibold justify-center "
            >
              <Icons.logo className="h-6 w-6 rounded-sm dark:bg-white" />
              <span className="ml-2">Sudo</span>
            </Link>

            <Search className="absolute hidden md:flex left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search blogs/users/tags..."
              className="pl-8 hidden md:flex w-full rounded-full"
            />
          </div>
          <Button className="hidden lg:flex lg:items-center lg:gap-2 lg:justify-center lg:mr-4" asChild>
            <Link href="/write">
            <PenIcon className="h-4 w-4 rounded-sm" />
            <span className="font-semibold">Write</span>
            </Link>
          </Button>

          <div className="hidden lg:flex">
            <ModeToggle />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  href="/write"
                  className="flex items-center gap-2 justify-center"
                >
                  <PenIcon className="h-4 w-4 rounded-sm" />
                  <span className="ml-2">Write</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hidden lg:flex">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 justify-center"
                >
                  <Bookmark className="h-4 w-4 rounded-sm" />
                  <span className="ml-2">Bookmarks</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 justify-center"
                >
                  <User2 className="h-4 w-4 rounded-sm" />
                  <span className="ml-2">My profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/settings"
                  className="flex items-center gap-2 justify-center"
                >
                  <Settings className="h-4 w-4 rounded-sm" />
                  <span className="ml-2">Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-start"
                  variant="ghost"
                >
                  <LogOutIcon className="h-4 w-4 rounded-sm" />
                  <span className="ml-2">Logout</span>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
};

export default AppNavbar;
