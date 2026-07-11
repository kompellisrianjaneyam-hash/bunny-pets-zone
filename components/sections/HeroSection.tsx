"use client";

import { motion, type Variants } from "framer-motion";
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
  return (
    <section
      id="home"
      className={`relative isolate flex min-h-[80vh] items-center overflow-hidden bg-[#FFF8F0] px-4 pb-16 pt-[230px] ${FONT_BODY} scroll-mt-[230px] sm:px-6 sm:pt-[170px] sm:scroll-mt-[170px] lg:min-h-[88vh] lg:px-8 lg:pb-20 lg:pt-[190px] lg:scroll-mt-[190px]`}
    >
      {/* Ambient background: warm editorial paper depth without changing layout spacing. */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#FFF9EF]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_34%,rgba(201,144,69,0.18),transparent_34%),radial-gradient(circle_at_16%_22%,rgba(247,235,221,0.82),transparent_38%),linear-gradient(135deg,rgba(255,249,239,0.95),rgba(255,244,228,0.9)_52%,rgba(247,235,221,0.92))]" />
        <div className="absolute -left-32 -top-24 h-[26rem] w-[26rem] rounded-full bg-[#F7EBDD]/60 blur-[110px]" />
        <div className="absolute -right-24 top-10 h-[22rem] w-[22rem] rounded-full bg-[#C99045]/14 blur-[100px]" />
        <div className="absolute bottom-[-8rem] left-1/3 h-[24rem] w-[24rem] rounded-full bg-white/55 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#B77932]/8 blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(58,36,26,0.025)_48%,transparent_76%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#FFF9EF]/80 to-transparent" />
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
            className="inline-flex items-center gap-2 rounded-full border border-[#3A241A]/10 bg-[#FFF9EF]/72 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#8D5B26] shadow-[0_10px_32px_rgba(58,36,26,0.07)] backdrop-blur-xl"
          >
            <Sparkles
              aria-hidden="true"
              className="h-3.5 w-3.5 text-[#B77932]"
              strokeWidth={2.2}
            />
            <span>Trusted Pet Store in Hyderabad</span>
          </motion.div>

          <motion.h1
            variants={fadeUpVariants}
            className={`mt-6 text-balance ${FONT_HEADING} text-[2.75rem] font-bold leading-[1.08] tracking-tight text-[#2A1B14] sm:text-6xl lg:text-[3.4rem] xl:text-6xl`}
          >
            Healthy Pets.
            <span className="block">Happy Families.</span>
            <span className="mt-2 block bg-gradient-to-r from-[#8A5522] via-[#C99045] to-[#B77932] bg-clip-text text-transparent">
              Find Your Perfect Companion.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUpVariants}
            className="mx-auto mt-6 max-w-[520px] text-pretty text-base font-medium leading-7 text-[#5E4A3D] sm:text-lg lg:mx-0"
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
              className="group relative inline-flex h-13 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#8A5522] via-[#C99045] to-[#A86424] px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_18px_42px_rgba(138,85,34,0.26)] outline-none transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_22px_52px_rgba(138,85,34,0.34)] focus-visible:ring-2 focus-visible:ring-[#C99045] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF9EF] sm:w-auto"
            >
              <span className="absolute inset-x-0 top-0 h-1/2 bg-white/18 opacity-80 transition duration-300 group-hover:opacity-100" />
              <span className="relative">Explore Pets</span>
              <ArrowRight
                aria-hidden="true"
                className="relative h-4 w-4 transition duration-300 group-hover:translate-x-0.5"
                strokeWidth={2.3}
              />
            </Link>

            <a
              href={whatsappHref}
              className="group inline-flex h-13 w-full items-center justify-center gap-2 rounded-full border border-[#3A241A]/10 bg-[#FFF9EF]/68 px-7 py-3.5 text-[15px] font-bold text-[#2A1B14] shadow-[0_12px_34px_rgba(58,36,26,0.07)] outline-none backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFF4E4]/80 hover:text-[#8A5522] focus-visible:ring-2 focus-visible:ring-[#C99045] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF9EF] sm:w-auto"
            >
              <MessageCircle
                aria-hidden="true"
                className="h-4 w-4"
                strokeWidth={2.2}
              />
              <span>Chat on WhatsApp</span>
            </a>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
          >
            {statPills.map((pill) => {
              const Icon = pill.icon;

              return (
                <motion.div
                  key={pill.label}
                  variants={fadeUpVariants}
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-[#3A241A]/10 bg-[#FFF9EF]/62 px-4 text-sm font-bold text-[#2A1B14] shadow-[0_12px_30px_rgba(58,36,26,0.06)] backdrop-blur-xl"
                >
                  <Icon
                    aria-hidden="true"
                    className="h-4 w-4 text-[#B77932]"
                    strokeWidth={2.2}
                  />
                  <span>{pill.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* RIGHT: premium boutique showcase */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="relative mx-auto flex w-full max-w-sm flex-col items-center lg:mx-0 lg:justify-self-center"
        >
          {/* Static editorial warmth around the existing visual footprint. */}
          <div className="pointer-events-none absolute -inset-10 -z-10">
            <div className="absolute -left-6 top-4 h-32 w-32 rounded-full bg-[#B77932]/14 blur-3xl" />
            <div className="absolute -right-4 bottom-10 h-36 w-36 rounded-full bg-[#F7EBDD]/70 blur-3xl" />
            <div className="absolute right-1/2 top-1/2 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/42 blur-[90px]" />
          </div>

          {/* Single premium card */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="relative w-full overflow-hidden rounded-[2.25rem] border border-[#3A241A]/10 bg-[#FFF9EF]/68 p-7 text-center shadow-[0_24px_70px_rgba(58,36,26,0.12)] backdrop-blur-2xl sm:p-9"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.72),transparent_42%),linear-gradient(145deg,rgba(255,249,239,0.82),rgba(247,235,221,0.36)_56%,rgba(201,144,69,0.10))]" />
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />
            <div className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-[#B77932]/20 to-transparent" />

            <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-[1.5rem] border border-[#3A241A]/10 bg-[#FFF4E4]/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_16px_38px_rgba(58,36,26,0.10)]">
              <Image
                src={settings.logo}
                alt={`${settings.businessName} logo`}
                width={72}
                height={72}
                priority
                className="h-full w-full rounded-[1.1rem] object-contain p-2"
              />
            </div>

            <h2
              className={`relative mt-5 ${FONT_HEADING} text-2xl font-bold tracking-tight text-[#2A1B14]`}
            >
              {settings.businessName}
            </h2>
            <p className="relative mt-1.5 text-sm font-bold uppercase tracking-[0.1em] text-[#9A6429]">
              Trusted Pet Store
            </p>
            <p className="relative mt-1 text-sm font-semibold text-[#5E4A3D]/82">
              {settings.address}
            </p>
          </motion.div>

          {/* Boutique chips */}
          <div className="relative mt-4 grid w-full grid-cols-2 gap-3">
            {petChips.map((chip) => {
              const Icon = chip.icon;

              return (
                <motion.div
                  key={chip.label}
                  whileHover={{ y: -3, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-[#3A241A]/10 bg-[#FFF9EF]/62 px-4 py-3.5 text-sm font-bold text-[#2A1B14] shadow-[0_14px_34px_rgba(58,36,26,0.07)] backdrop-blur-xl transition duration-300 hover:bg-[#FFF4E4]/78"
                >
                  <Icon
                    aria-hidden="true"
                    className="h-4 w-4 text-[#B77932]"
                    strokeWidth={2.2}
                  />
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
