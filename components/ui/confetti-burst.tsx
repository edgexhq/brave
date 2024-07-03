"use client";

import confetti from "canvas-confetti";
import { useEffect } from "react";

const Confettiburst = () => {
  useEffect(() => {
    burst();
  }, []);
  const burst = () => {
    const end = Date.now() + 4 * 1000;
    const colors = ["#a786ff", "#f221e4", "#26e2e2", "#00ff21"];
    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };
  return <div></div>;
};

export default Confettiburst;
