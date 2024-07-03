import { cn } from "@/lib/utils";
import AnimatedGridPattern from "@/components/ui/gridPattern";
import Image from "next/image";
import Confettiburst from "@/components/ui/confetti-burst";
import Link from "next/link";

const Page = () => {
  return (
    <div className="relative flex flex-col min-h-svh w-full items-center py-20 overflow-hidden rounded-lg bg-background p-2">
      <Image
        src="/DancingDoodle.svg"
        alt="thnkx"
        width={400}
        height={400}
        className="mt-4 mb-2 hover:scale-105 transition-all duration-500 active:scale-95 active:rotate-3 hover:-rotate-2"
      />
      <p className="z-10 whitespace-pre-wrap text-center text-5xl md:text-7xl tracking-tighter bg-gradient-to-b from-foreground to-gray-300/80 font-semibold bg-clip-text text-transparent">
        Thank You
      </p>
      <p className="text-center text-xl p-2 text-muted-foreground tracking-tighter">
        for your submission!
        <br />
        Make your AI forms fast using{" "}
        <Link href="/" className="text-primary font-bold">
          Brave
        </Link>
      </p>

      <Confettiburst />

      <AnimatedGridPattern
        numSquares={45}
        maxOpacity={0.5}
        duration={2}
        repeatDelay={0.6}
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
    </div>
  );
};

export default Page;
