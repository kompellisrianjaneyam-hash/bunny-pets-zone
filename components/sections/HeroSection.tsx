"use client";

import { motion, type Variants } from "framer-motion";
import { HeartPulse, MessageCircle, Phone, ShieldCheck, Sparkles, Star } from "lucide-react";
import Image from "next/image";

import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

const whatsappHref =
  "https://wa.me/917680904157?text=Hi%20Bunny%20Pets%20Zone%2C%20I%20would%20like%20to%20know%20more%20about%20available%20pets.";
const phoneHref = "tel:7680904157";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.08,
    },
  },
};

const trustCards = [
  {
    title: "Healthy Pets",
    icon: HeartPulse,
  },
  {
    title: "90+ Happy Families",
    icon: Star,
  },
  {
    title: "Trusted Care",
    icon: ShieldCheck,
  },
];

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#FFF8F0] px-4 pb-20 pt-32 font-[Inter] sm:px-6 sm:pb-24 sm:pt-36 lg:px-8 lg:pb-28 lg:pt-40">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(213,154,58,0.16),transparent_32%),radial-gradient(circle_at_84%_24%,rgba(255,214,153,0.34),transparent_30%),radial-gradient(circle_at_50%_94%,rgba(213,154,58,0.10),transparent_36%),linear-gradient(180deg,#FFF8F0_0%,#FFF3E6_52%,#FFF8F0_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(213,154,58,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(213,154,58,0.045)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_72%)]" />
        <div className="absolute -left-28 top-24 h-80 w-80 rounded-full bg-[#D59A3A]/10 blur-3xl" />
        <div className="absolute -right-32 top-36 h-96 w-96 rounded-full bg-orange-200/45 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-amber-100/65 blur-3xl" />
      </div>

      <Container>
        <div className="grid min-h-[calc(100vh-10rem)] items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-[#ECECEC] bg-white/45 px-4 py-2 text-sm font-semibold text-[#5B4A3F] shadow-lg shadow-[#D59A3A]/5 backdrop-blur-xl"
            >
              <Sparkles aria-hidden="true" className="h-4 w-4 text-[#D59A3A]" />
              <span>Trusted Pet Store in Hyderabad</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-8 text-balance font-[Poppins] text-5xl font-bold leading-[1.02] tracking-tight text-[#2F2017] sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              Healthy Pets,
              <span className="block">Happy Families.</span>
              <span className="mt-3 block text-[#D59A3A]">
                Find Your Perfect Companion.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-8 text-[#5B4A3F] sm:text-xl lg:mx-0"
            >
              Premium dogs, cats, birds and hamsters raised with care for loving
              families in Hyderabad.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <div className="[&_a]:h-14 [&_a]:rounded-full [&_a]:px-8 [&_a]:text-base [&_a]:font-bold">
                <Button href={whatsappHref}>
                  <span className="inline-flex items-center gap-2">
                    <MessageCircle aria-hidden="true" className="h-5 w-5" />
                    Chat on WhatsApp
                  </span>
                </Button>
              </div>

              <div className="[&_a]:h-14 [&_a]:rounded-full [&_a]:px-8 [&_a]:text-base [&_a]:font-bold">
                <Button href={phoneHref} variant="secondary">
                  <span className="inline-flex items-center gap-2">
                    <Phone aria-hidden="true" className="h-5 w-5" />
                    Call Now
                  </span>
                </Button>
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="mt-10 grid gap-3 sm:grid-cols-3"
            >
              {trustCards.map((card) => {
                const Icon = card.icon;

                return (
                  <motion.div
                    key={card.title}
                    variants={fadeUp}
                    whileHover={{ y: -4, scale: 1.015 }}
                    transition={{ type: "spring", stiffness: 320, damping: 24 }}
                    className="flex items-center justify-center gap-3 rounded-3xl border border-[#ECECEC] bg-white/40 px-4 py-4 text-sm font-bold text-[#2F2017] shadow-xl shadow-[#D59A3A]/5 backdrop-blur-xl"
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-[#D59A3A]"
                      strokeWidth={2}
                    />
                    <span>{card.title}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 36, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
            className="relative mx-auto w-full max-w-xl"
            aria-label="Bunny Pets Zone premium pet store visual"
          >
            <div className="absolute left-1/2 top-1/2 -z-10 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D59A3A]/16 blur-3xl sm:h-[30rem] sm:w-[30rem]" />

            <div className="relative overflow-hidden rounded-[2.5rem] border border-[#ECECEC] bg-white/42 p-6 shadow-[0_28px_90px_rgba(47,32,23,0.12)] backdrop-blur-2xl sm:p-8 lg:p-10">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D59A3A]/12 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-orange-200/36 blur-3xl" />

              <div className="relative rounded-[2rem] border border-white/70 bg-white/38 p-8 shadow-inner shadow-white/40 backdrop-blur-xl sm:p-10">
               <div className="mx-auto flex w-full max-w-[360px] flex-col items-center rounded-[2rem] border border-[#ECECEC] bg-white/70 p-8 shadow-2xl shadow-[#D59A3A]/10 backdrop-blur-xl">
  <Image
    src="/logos/bunny-pets-zone-logo.png"
    alt="Bunny Pets Zone logo"
    width={320}
    height={400}
    priority
    className="h-auto w-full object-contain"
  />

  <div className="mt-6 text-center">
    <h3 className="font-[Poppins] text-2xl font-bold text-[#2F2017]">
      Bunny Pets Zone
    </h3>

    <p className="mt-2 text-base text-[#5B4A3F]">
      Trusted Pet Store in Kondapur, Hyderabad
    </p>
  </div>
</div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-[#ECECEC] bg-white/46 p-5 shadow-xl shadow-[#D59A3A]/5 backdrop-blur-xl">
                    <p className="font-[Poppins] text-2xl font-bold text-[#2F2017]">
                      Dogs
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#5B4A3F]">
                      Friendly companions
                    </p>
                  </div>

                  <div className="rounded-3xl border border-[#ECECEC] bg-white/46 p-5 shadow-xl shadow-[#D59A3A]/5 backdrop-blur-xl">
                    <p className="font-[Poppins] text-2xl font-bold text-[#2F2017]">
                      Cats
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#5B4A3F]">
                      Gentle and playful
                    </p>
                  </div>

                  <div className="rounded-3xl border border-[#ECECEC] bg-white/46 p-5 shadow-xl shadow-[#D59A3A]/5 backdrop-blur-xl">
                    <p className="font-[Poppins] text-2xl font-bold text-[#2F2017]">
                      Birds
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#5B4A3F]">
                      Bright little friends
                    </p>
                  </div>

                  <div className="rounded-3xl border border-[#ECECEC] bg-white/46 p-5 shadow-xl shadow-[#D59A3A]/5 backdrop-blur-xl">
                    <p className="font-[Poppins] text-2xl font-bold text-[#2F2017]">
                      Hamsters
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#5B4A3F]">
                      Tiny happy pets
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}