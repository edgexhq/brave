"use client";
import Blobby from "@/app/components/ui/blobby";
import ShimmerButton from "@/components/ui/shimmerButton";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Banner = () => {
  return (
    <main>
      <div className="px-6 lg:px-8">
        <Blobby className="bg-purple-500/60 top-12 left-10" />
        <Blobby className="bg-yellow-400/50 bottom-20 left-40" />
        <Blobby className="bg-green-400/60 top-12 right-10" />
        <Blobby className="bg-cyan-500/60 bottom-3 right-52" />
        <div className="mx-auto max-w-7xl pt-16 sm:pt-16 pb-20 banner-image">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: -4 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl font-bold max-w-4xl mx-auto text-navyblue sm:text-5xl lg:text-7xl md:4px">
                Power your interviews with{" "}
                <span className="text-primary">Brave</span> AI
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.6, delay: 0.5 }}
            >
              <p className="mt-6 text-lg max-w-prose text-center mx-auto leading-8 text-bluegray">
                At Brave, we revolutionize the way you prepare for and conduct
                interviews. Our platform is designed to simplify and enhance
                every step of the interview process for both interviewers and
                candidates.
              </p>
            </motion.div>
          </div>

          <div className="text-center mt-5">
            <ShimmerButton>
              <Link href="/sign-in">Get Started</Link>
            </ShimmerButton>
          </div>

          <Image
            src={"/assets/banner/dashboard.svg"}
            alt="banner-image"
            width={1200}
            height={598}
          />
        </div>
      </div>
    </main>
  );
};

export default Banner;
