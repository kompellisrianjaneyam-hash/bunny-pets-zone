"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowUp, MessageCircle, Phone } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const settings = {
  phone: "7680904157",
  whatsapp: "7680904157",
};

const buttonVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.9,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const alwaysVisibleButtonVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 18,
    scale: 0.94,
  },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.32,
      delay: index * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const whatsappHref = useMemo(() => {
    const message = encodeURIComponent(
      "Hi Bunny Pets Zone,\nI'm interested in your pets.",
    );

    return `https://wa.me/91${settings.whatsapp}?text=${message}`;
  }, []);

  const phoneHref = useMemo(() => `tel:${settings.phone}`, []);

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      setShowScrollTop(window.scrollY > 500);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    updateScrollState();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const actionButtonClass =
    "group relative flex h-13 w-13 items-center justify-center rounded-full border border-[#ECECEC] bg-white/72 text-[#D59A3A] shadow-[0_16px_36px_rgba(47,32,23,0.12)] backdrop-blur-xl outline-none transition duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_20px_46px_rgba(213,154,58,0.22)] focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0] sm:h-14 sm:w-14";

  const tooltipClass =
    "pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full border border-[#ECECEC] bg-white/90 px-4 py-2 text-sm font-bold text-[#2F2017] opacity-0 shadow-xl shadow-[#2F2017]/10 backdrop-blur-xl transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 lg:block";

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {showScrollTop ? (
          <motion.button
            key="scroll-top"
            type="button"
            aria-label="Back to top"
            onClick={scrollToTop}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className={actionButtonClass}
          >
            <span className={`${tooltipClass} translate-x-2`}>Back to Top</span>
            <ArrowUp aria-hidden="true" className="h-5 w-5" strokeWidth={2.2} />
          </motion.button>
        ) : null}
      </AnimatePresence>

      <motion.a
        href={phoneHref}
        aria-label="Call Now"
        variants={alwaysVisibleButtonVariants}
        custom={0}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -4, scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className={actionButtonClass}
      >
        <span className={`${tooltipClass} translate-x-2`}>Call Now</span>
        <Phone aria-hidden="true" className="h-5 w-5" strokeWidth={2.2} />
      </motion.a>

      <motion.a
        href={whatsappHref}
        aria-label="Chat on WhatsApp"
        variants={alwaysVisibleButtonVariants}
        custom={1}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -4, scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="group relative flex h-13 w-13 items-center justify-center rounded-full border border-[#D59A3A]/30 bg-[#D59A3A]/92 text-white shadow-[0_16px_36px_rgba(213,154,58,0.28)] backdrop-blur-xl outline-none transition duration-300 hover:scale-105 hover:-translate-y-1 hover:bg-[#D59A3A] hover:shadow-[0_20px_46px_rgba(213,154,58,0.34)] focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0] sm:h-14 sm:w-14"
      >
        <span className={`${tooltipClass} translate-x-2`}>Chat on WhatsApp</span>
        <MessageCircle
          aria-hidden="true"
          className="h-5 w-5"
          strokeWidth={2.2}
        />
      </motion.a>
    </div>
  );
}