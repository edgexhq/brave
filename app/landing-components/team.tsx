"use client";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Team() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <section
      ref={ref}
      style={{
        transform: isInView ? "none" : "translateX(-200px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.6s",
      }}
      className="py-12 md:py-16 lg:py-20 max-w-screen-lg mx-auto"
    >
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 md:gap-8 lg:gap-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter bg-gradient-to-br bg-clip-text text-transparent from-black to-muted-foreground/50 sm:text-4xl md:text-5xl">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground md:text-lg">
              The talented individuals behind our product.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            <div className="bg-card hover:-translate-y-1 p-6 rounded-xl shadow-sm transition-all duration-300 hover:border-cyan-200 border hover:shadow-md">
              <div className="flex flex-col items-center gap-4">
                <Image
                  alt="Anish"
                  src={
                    "https://eclecticatmsl.tech/styles/img/teams/Anish%20Biswas.webp"
                  }
                  width={500}
                  height={500}
                  className="rounded-full size-56 object-cover border shadow"
                />
                <div className="text-center space-y-1">
                  <h3 className="text-xl font-semibold">Anish Biswas</h3>
                  <p className="text-muted-foreground">@xeven</p>
                </div>
                <div className="flex items-center gap-6 mt-auto">
                  <Link
                    href="https://www.github.com/xeven777"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    prefetch={false}
                  >
                    <GithubIcon className="w-5 h-5" />
                  </Link>
                  <Link
                    href="https://linkedin.com/in/anishbiswas777"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    prefetch={false}
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-card hover:-translate-y-1 p-6 rounded-xl shadow-sm transition-all duration-300 hover:border-cyan-200 border hover:shadow-md">
              <div className="flex flex-col items-center gap-4">
                <Image
                  alt="Subha"
                  src={
                    "https://mvp-subha.me/_next/image?url=%2Fassets%2Fimgs%2Fheader%2Fprofile.jpg&w=640&q=75"
                  }
                  width={500}
                  height={500}
                  className="rounded-full size-56 object-cover border shadow"
                />
                <div className="text-center space-y-1">
                  <h3 className="text-xl font-semibold">Subhadeep Roy</h3>
                  <p className="text-muted-foreground">@mvp-subha</p>
                </div>
                <div className="flex items-center gap-6 mt-auto">
                  <Link
                    href="https://www.github.com/subhadeeproy3902"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    prefetch={false}
                  >
                    <GithubIcon className="w-5 h-5" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/subhadeep3902/"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    prefetch={false}
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-card hover:-translate-y-1 p-6 rounded-xl shadow-sm transition-all duration-300 hover:border-cyan-200 border hover:shadow-md">
              <div className="flex flex-col items-center gap-4">
                <Image
                  alt="Arghya"
                  src={
                    "https://uiuxarghya.vercel.app/_next/image?url=https%3A%2F%2Fgithub.com%2Fuiuxarghya.png&w=750&q=100"
                  }
                  width={500}
                  height={500}
                  className="rounded-full size-56 object-cover border shadow"
                />
                <div className="text-center space-y-1">
                  <h3 className="text-xl font-semibold">Arghya Ghosh</h3>
                  <p className="text-muted-foreground">@uiuxarghya</p>
                </div>
                <div className="flex items-center gap-6 mt-auto">
                  <Link
                    href="https://github.com/uiuxarghya"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    prefetch={false}
                  >
                    <GithubIcon className="w-5 h-5" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/uiuxarghya/"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    prefetch={false}
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

