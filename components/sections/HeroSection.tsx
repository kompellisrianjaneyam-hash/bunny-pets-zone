"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Bird,
  Cat,
  Dog,
  MessageCircle,
  PawPrint,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const settings = {
  businessName: "Bunny Pets Zone",
  address: "Kondapur, Hyderabad",
  phone: "7680904157",
  whatsapp: "7680904157",
  logo: "/logos/bunny-pets-zone-logo.png",
};

const whatsappHref = `https://wa.me/91${settings.whatsapp}?text=${encodeURIComponent(
  "Hi Bunny Pets Zone, I'm looking for a pet. Could you please help me choose the right companion?",
)}`;

// Safe fallback stacks so a missing/late-loading webfont never distorts
// line-height and pushes content around.
const FONT_HEADING = "font-[Poppins,_ui-sans-serif,_system-ui,_sans-serif]";
const FONT_BODY = "font-[Inter,_ui-sans-serif,_system-ui,_sans-serif]";

const statPills = [
  { label: "Healthy Pets", icon: PawPrint },
  { label: "90+ Happy Families", icon: Star },
  { label: "Trusted Care", icon: ShieldCheck },
];

const petChips = [
  { label: "Dogs", icon: Dog },
  { label: "Cats", icon: Cat },
  { label: "Birds", icon: Bird },
  { label: "Hamsters", icon: PawPrint },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
  },
};

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const floatY = shouldReduceMotion ? undefined : { y: [-8, 8, -8] };
  const floatTransition = shouldReduceMotion
    ? undefined
    : { duration: 6.5, repeat: Infinity, ease: "easeInOut" as const };

  return (
    <section
      id="home"
      className={`relative isolate flex min-h-[80vh] items-center overflow-hidden bg-[#FFF8F0] px-4 pb-16 pt-[170px] ${FONT_BODY} scroll-mt-[170px] sm:px-6 lg:min-h-[88vh] lg:px-8 lg:pb-20 lg:pt-[190px]`}
    >
      {/* Ambient background: layered blurred lights + subtle grid, no flat gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#FFF8F0]" />
        <div className="absolute -left-32 -top-24 h-[26rem] w-[26rem] rounded-full bg-[#D59A3A]/18 blur-[110px]" />
        <div className="absolute -right-24 top-10 h-[22rem] w-[22rem] rounded-full bg-[#F3D9A6]/45 blur-[100px]" />
        <div className="absolute bottom-[-8rem] left-1/3 h-[24rem] w-[24rem] rounded-full bg-white/70 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#D59A3A]/10 blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(47,32,23,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(47,32,23,0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_72%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/50 to-transparent" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* LEFT: copy */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left"
        >
          <motion.div
            variants={fadeUpVariants}
            className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#B97724] shadow-[0_8px_30px_rgba(213,154,58,0.12)] backdrop-blur-xl"
          >
            <Sparkles aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.2} />
            <span>Trusted Pet Store in Hyderabad</span>
          </motion.div>

          <motion.h1
            variants={fadeUpVariants}
            className={`mt-6 text-balance ${FONT_HEADING} text-[2.75rem] font-bold leading-[1.08] tracking-tight text-[#2F2017] sm:text-6xl lg:text-[3.4rem] xl:text-6xl`}
          >
            Healthy Pets.
            <span className="block">Happy Families.</span>
            <span className="mt-2 block bg-gradient-to-r from-[#D59A3A] via-[#E8B95E] to-[#B97724] bg-clip-text text-transparent">
              Find Your Perfect Companion.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUpVariants}
            className="mx-auto mt-6 max-w-[520px] text-pretty text-base font-medium leading-7 text-[#5B4A3F] sm:text-lg lg:mx-0"
          >
            Premium dogs, cats, birds and hamsters raised with care, matched
            with loving families across Hyderabad.
          </motion.p>

          <motion.div
            variants={fadeUpVariants}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start"
          >
            <Link
              href="/pets"
              className="group relative inline-flex h-13 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#D59A3A] via-[#E7B85C] to-[#C6852F] px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_16px_40px_rgba(213,154,58,0.32)] outline-none transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_20px_48px_rgba(213,154,58,0.4)] focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0] sm:w-auto"
            >
              <span className="absolute inset-x-0 top-0 h-1/2 bg-white/20 opacity-80 transition duration-300 group-hover:opacity-100" />
              <span className="relative">Explore Pets</span>
              <ArrowRight
                aria-hidden="true"
                className="relative h-4 w-4 transition duration-300 group-hover:translate-x-0.5"
                strokeWidth={2.3}
              />
            </Link>

            <a
              href={whatsappHref}
              className="group inline-flex h-13 w-full items-center justify-center gap-2 rounded-full border border-white/70 bg-white/45 px-7 py-3.5 text-[15px] font-bold text-[#2F2017] shadow-[0_10px_30px_rgba(47,32,23,0.06)] outline-none backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/65 hover:text-[#B97724] focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0] sm:w-auto"
            >
              <MessageCircle aria-hidden="true" className="h-4 w-4" strokeWidth={2.2} />
              <span>Chat on WhatsApp</span>
            </a>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
          >
            {statPills.map((pill, index) => {
              const Icon = pill.icon;

              return (
                <motion.div
                  key={pill.label}
                  variants={fadeUpVariants}
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : { y: [-4, 4, -4] }
                  }
                  transition={
                    shouldReduceMotion
                      ? undefined
                      : {
                          duration: 4.5 + index * 0.4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                  }
                  whileHover={{ y: -4, scale: 1.03 }}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-white/60 bg-white/40 px-4 text-sm font-bold text-[#2F2017] shadow-[0_10px_28px_rgba(47,32,23,0.05)] backdrop-blur-xl"
                >
                  <Icon aria-hidden="true" className="h-4 w-4 text-[#D59A3A]" strokeWidth={2.2} />
                  <span>{pill.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* RIGHT: floating glass showcase */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="relative mx-auto flex w-full max-w-sm flex-col items-center lg:mx-0 lg:justify-self-center"
        >
          {/* Floating blurred accent circles */}
          <div className="pointer-events-none absolute -inset-10 -z-10">
            <motion.div
              animate={floatY}
              transition={floatTransition}
              className="absolute -left-6 top-4 h-32 w-32 rounded-full bg-[#D59A3A]/22 blur-3xl"
            />
            <motion.div
              animate={
                shouldReduceMotion ? undefined : { y: [8, -8, 8] }
              }
              transition={floatTransition}
              className="absolute -right-4 bottom-10 h-36 w-36 rounded-full bg-orange-200/40 blur-3xl"
            />
            <div className="absolute right-1/2 top-1/2 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/50 blur-[90px]" />
          </div>

          {/* Single liquid-glass card */}
          <motion.div
            animate={floatY}
            transition={floatTransition}
            whileHover={{ scale: 1.015 }}
            className="relative w-full overflow-hidden rounded-[2.25rem] border border-white/60 bg-white/35 p-7 text-center shadow-[0_30px_90px_rgba(47,32,23,0.14)] backdrop-blur-2xl sm:p-9"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/50 via-white/10 to-[#D59A3A]/10" />
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />

            <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-[1.5rem] border border-white/60 bg-white/50 shadow-inner shadow-white/40">
              <Image
                src={settings.logo}
                alt={`${settings.businessName} logo`}
                width={72}
                height={72}
                priority
                className="h-full w-full rounded-[1.1rem] object-contain p-2"
              />
            </div>

            <h2 className={`relative mt-5 ${FONT_HEADING} text-2xl font-bold tracking-tight text-[#2F2017]`}>
              {settings.businessName}
            </h2>
            <p className="relative mt-1.5 text-sm font-bold uppercase tracking-[0.1em] text-[#D59A3A]">
              Trusted Pet Store
            </p>
            <p className="relative mt-1 text-sm font-semibold text-[#5B4A3F]/80">
              {settings.address}
            </p>
          </motion.div>

          {/* Glass chips */}
          <div className="relative mt-4 grid w-full grid-cols-2 gap-3">
            {petChips.map((chip) => {
              const Icon = chip.icon;

              return (
                <motion.div
                  key={chip.label}
                  whileHover={{ y: -3, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/60 bg-white/35 px-4 py-3.5 text-sm font-bold text-[#2F2017] shadow-[0_12px_32px_rgba(47,32,23,0.06)] backdrop-blur-xl transition duration-300 hover:bg-white/55"
                >
                  <Icon aria-hidden="true" className="h-4 w-4 text-[#D59A3A]" strokeWidth={2.2} />
                  <span>{chip.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}