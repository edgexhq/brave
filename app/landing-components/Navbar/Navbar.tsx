"use client";
import Image from "next/image";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import NavLink from "./NavLink";
import { Button } from "@/components/ui/button";

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
      title: "About",
      path: "/aboutus",
    },
    {
      title: "Review Us",
      path: "/review",
    },
  ];
  return (
    <>
      <header className="sticky top-0 z-[99] bg-background/40 backdrop-blur-md border">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <Link className="block text-primary" href="/">
                <span className="sr-only">Home</span>
                <Image
                  src="/android-chrome-512x512.png"
                  alt="Logo"
                  width={50}
                  height={50}
                />
              </Link>
            </div>

            <div className="hidden md:block sm:pl-40">
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
              <div className="flex gap-4">
                <Button size="lg" variant="secondary">
                  <Link href="/sign-in">Login</Link>
                </Button>
                <div className="hidden sm:flex">
                  <Button size="lg" variant="secondary">
                    /<Link href="/sign-up">Sign Up</Link>
                  </Button>
                </div>
              </div>

              <div className="block md:hidden">
                <button
                  onClick={handleMenuOpen}
                  className="p-2 bg-secondary text-secondary-foreground hover:bg-secondary/80"
                >
                  <MenuIcon size={24} />
                </button>
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
