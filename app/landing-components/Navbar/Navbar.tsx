"use client";
import Image from "next/image";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import NavLink from "./NavLink";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };
  const links = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Services",
      path: "#services",
    },
    {
      title: "About",
      path: "#about",
    },
    {
      title: "Reviews",
      path: "#reviews",
    },
    {
      title: "Contact",
      path: "#contact",
    },
  ];
  return (
    <>
      <header className="sticky w-full top-0 z-[99] bg-background/40 backdrop-blur-md border-b">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <Link
                className="flex items-center justify-center gap-2 font-semibold text-primary"
                href="/"
              >
                <Image
                  src="/logo-base-256x256.png"
                  alt="Logo"
                  width={40}
                  height={50}
                />
                <span className="text-xl">Brave</span>
              </Link>
            </div>

            <div className="hidden md:block sm:pl-28">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <li className=" space-x-6">
                    {links.map((link, index) => (
                      <Link
                        key={index}
                        className="transition text-foreground hover:text-foreground/75"
                        href={link.path}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <SignedIn>
                <Button size="lg" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              </SignedIn>
              <SignedOut>
                <div className="flex gap-4">
                  <Button size="lg" asChild>
                    <Link href="/sign-in">Login</Link>
                  </Button>
                  <div className="hidden sm:flex">
                    <Button size="lg" asChild variant="secondary">
                      <Link href="/sign-up">Sign Up</Link>
                    </Button>
                  </div>
                </div>
              </SignedOut>

              <div className="block md:hidden">
                <Button
                  variant={"ghost"}
                  title="menu"
                  onClick={handleMenuOpen}
                  className="p-2 bg-secondary text-secondary-foreground hover:bg-secondary/80"
                >
                  <MenuIcon size={24} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
      {menuOpen && (
        <div
          className="md:hidden sm:block fixed bg-background z-50 w-full h-fit flex flex-col items-center justify-start text-center gap-7 pt-5 pb-5 border-b-2 border-gray-500 top-[4rem]"
          style={{ boxShadow: "inset 0 -10px 10px -10px #7b7575b3" }}
        >
          {links.map((link, index) => (
            <NavLink item={link} key={index} handleMenuOpen={handleMenuOpen} />
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
