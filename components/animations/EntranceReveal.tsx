"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function EntranceReveal() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 2200);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[9999] flex h-[100dvh] w-screen items-center justify-center overflow-hidden bg-[#FFF8F0]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.45,
            ease: "easeOut",
          }}
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.72,
              y: 18,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.72, 1, 1, 0.92],
              y: [18, 0, 0, -8],
            }}
            transition={{
              duration: 2,
              times: [0, 0.25, 0.72, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex items-center justify-center"
          >
            <Image
              src="/logos/bunny-pets-zone-logo.png"
              alt="Bunny Pets Zone"
              width={500}
              height={500}
              priority
              sizes="(max-width: 640px) 230px, 320px"
              className="h-auto w-[220px] select-none object-contain sm:w-[300px] md:w-[320px]"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}