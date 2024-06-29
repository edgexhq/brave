"use client";
import { motion } from "framer-motion";

const ShimmerButton = ({ children }: any) => {
  return (
    <motion.button
      className="inline-flex overflow-hidden rounded-b-2xl rounded-tr-2xl bg-[linear-gradient(120deg,#13c4f9_calc(var(--shimmer-button-x)-25%),#f6f6f6_var(--shimmer-button-x),#13c4f9_calc(var(--shimmer-button-x)+25%))] [--shimmer-button-x:0%]"
      initial={
        {
          scale: 1,
          "--shimmer-button-x": "-100%",
        } as any
      }
      animate={
        {
          "--shimmer-button-x": "200%",
        } as any
      }
      transition={{
        stiffness: 500,
        damping: 20,
        type: "spring",
        "--shimmer-button-x": {
          duration: 3,
          repeat: Infinity,
          ease: [0.445, 0.05, 0.55, 0.95],
        },
      }}
      whileTap={{
        scale: 0.95,
      }}
      whileHover={{
        scale: 1.05,
      }}
    >
      <span className="m-[0.125rem] text-3xl rounded-tr-2xl rounded-b-2xl bg-[#139ef4] px-8 py-4 text-[#f6f6f6] backdrop-blur-sm">
        {children}
      </span>
    </motion.button>
  );
};

export default ShimmerButton;
