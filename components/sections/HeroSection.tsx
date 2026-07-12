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

const FONT_HEADING =
  "font-[Poppins,_ui-sans-serif,_system-ui,_sans-serif]";

const FONT_BODY =
  "font-[Inter,_ui-sans-serif,_system-ui,_sans-serif]";

const statPills = [
  {
    label: "Healthy Pets",
    icon: PawPrint,
  },
  {
    label: "90+ Happy Families",
    icon: Star,
  },
  {
    label: "Trusted Care",
    icon: ShieldCheck,
  },
];

const petChips = [
  {
    label: "Dogs",
    icon: Dog,
  },
  {
    label: "Cats",
    icon: Cat,
  },
  {
    label: "Birds",
    icon: Bird,
  },
  {
    label: "Hamsters",
    icon: PawPrint,
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.52,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.1,
    },
  },
};

export default function HeroSection() {
  return (
    <section
      id="home"
      className={`relative isolate w-full overflow-hidden bg-[#FFF9EF] ${FONT_BODY}`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#FFF9EF]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_36%,rgba(201,144,69,0.16),transparent_32%),radial-gradient(circle_at_14%_20%,rgba(247,235,221,0.82),transparent_38%),linear-gradient(135deg,rgba(255,249,239,0.98),rgba(255,244,228,0.92)_52%,rgba(247,235,221,0.92))]" />

        <div className="absolute -left-32 -top-24 h-[26rem] w-[26rem] rounded-full bg-[#F7EBDD]/60 blur-[110px]" />

        <div className="absolute -right-24 top-10 h-[22rem] w-[22rem] rounded-full bg-[#C99045]/14 blur-[100px]" />

        <div className="absolute bottom-[-8rem] left-1/3 h-[24rem] w-[24rem] rounded-full bg-white/55 blur-[120px]" />

        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(58,36,26,0.025)_48%,transparent_76%)]" />
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-4 pb-20 pt-[180px] sm:px-6 sm:pb-24 sm:pt-[170px] lg:px-8 lg:pb-32 lg:pt-[190px]">
        <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-16 lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)] lg:gap-20 xl:gap-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto flex w-full max-w-[650px] flex-col items-center text-center lg:mx-0 lg:max-w-none lg:items-start lg:text-left"
          >
            <motion.div
              variants={fadeUpVariants}
              className="mx-auto inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-[#3A241A]/10 bg-[#FFF9EF]/72 px-4 py-2.5 text-center text-[10px] font-bold uppercase tracking-[0.12em] text-[#8D5B26] shadow-[0_10px_32px_rgba(58,36,26,0.07)] backdrop-blur-xl sm:px-5 sm:text-xs sm:tracking-[0.16em] lg:mx-0"
            >
              <Sparkles
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-[#B77932]"
                strokeWidth={2.2}
              />

              <span className="whitespace-normal">
                Trusted Pet Store in Hyderabad
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUpVariants}
              className={`
                mx-auto
                mt-7
                w-full
                max-w-[620px]
                text-center
                ${FONT_HEADING}
                text-[2.35rem]
                font-bold
                leading-[1.1]
                tracking-[-0.04em]
                text-[#2A1B14]
                sm:mt-8
                sm:text-[3.5rem]
                sm:leading-[1.06]
                lg:mx-0
                lg:max-w-none
                lg:text-left
                lg:text-[3.8rem]
                xl:text-[4.15rem]
              `}
            >
              <span className="block">Healthy Pets.</span>

              <span className="block">Happy Families.</span>

              <span className="mt-2 block bg-gradient-to-r from-[#8A5522] via-[#C99045] to-[#B77932] bg-clip-text text-transparent sm:mt-3">
                Find Your Perfect Companion.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUpVariants}
              className="mx-auto mt-6 w-full max-w-[560px] px-1 text-center text-base font-medium leading-7 text-[#5E4A3D] sm:mt-8 sm:px-0 sm:text-lg sm:leading-9 lg:mx-0 lg:text-left"
            >
              Premium dogs, cats, birds and hamsters raised with care, matched
              with loving families across Hyderabad.
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              className="mx-auto mt-8 flex w-full max-w-[560px] flex-col items-stretch justify-center gap-4 sm:mt-10 sm:w-auto sm:max-w-none sm:flex-row sm:items-center lg:mx-0 lg:justify-start"
            >
              <Link
                href="/pets"
                className="group relative inline-flex min-h-[58px] w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#8A5522] via-[#C99045] to-[#A86424] px-7 py-4 text-[15px] font-bold leading-none text-white shadow-[0_18px_42px_rgba(138,85,34,0.26)] outline-none transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_52px_rgba(138,85,34,0.34)] focus-visible:ring-2 focus-visible:ring-[#C99045] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF9EF] sm:w-auto sm:min-w-[170px] sm:px-8"
              >
                <span className="absolute inset-x-0 top-0 h-1/2 bg-white/10" />

                <span className="relative">Explore Pets</span>

                <ArrowRight
                  aria-hidden="true"
                  className="relative h-5 w-5 shrink-0 transition duration-300 group-hover:translate-x-1"
                  strokeWidth={2.2}
                />
              </Link>

              <a
                href={whatsappHref}
                className="group inline-flex min-h-[58px] w-full items-center justify-center gap-3 rounded-full border border-[#3A241A]/10 bg-[#FFF9EF]/72 px-7 py-4 text-[15px] font-bold leading-none text-[#2A1B14] shadow-[0_12px_34px_rgba(58,36,26,0.07)] outline-none backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFF4E4] hover:text-[#8A5522] focus-visible:ring-2 focus-visible:ring-[#C99045] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF9EF] sm:w-auto sm:min-w-[220px] sm:px-8"
              >
                <MessageCircle
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0"
                  strokeWidth={2.2}
                />

                <span>Chat on WhatsApp</span>
              </a>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="mx-auto mt-6 grid w-full max-w-[560px] grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-3 lg:mx-0 lg:max-w-[600px]"
            >
              {statPills.map((pill) => {
                const Icon = pill.icon;

                return (
                  <motion.div
                    key={pill.label}
                    variants={fadeUpVariants}
                    whileHover={{ y: -3 }}
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 22,
                    }}
                    className="flex min-h-[68px] w-full items-center justify-center gap-2.5 rounded-[1.35rem] border border-[#3A241A]/10 bg-[#FFF9EF]/72 px-4 py-4 text-center text-sm font-bold leading-5 text-[#2A1B14] shadow-[0_12px_30px_rgba(58,36,26,0.06)] backdrop-blur-xl"
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-[#B77932]"
                      strokeWidth={2.1}
                    />

                    <span className="min-w-0">{pill.label}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="relative mx-auto flex w-full max-w-[470px] flex-col items-center lg:justify-self-center"
          >
            <div className="pointer-events-none absolute -inset-8 -z-10 sm:-inset-12">
              <div className="absolute -left-8 top-8 h-36 w-36 rounded-full bg-[#B77932]/14 blur-3xl" />

              <div className="absolute -right-6 bottom-8 h-40 w-40 rounded-full bg-[#F7EBDD]/70 blur-3xl" />

              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/42 blur-[90px]" />
            </div>

            <motion.div
              whileHover={{ y: -4 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 24,
              }}
              className="relative w-full overflow-hidden rounded-[2rem] border border-[#3A241A]/10 bg-[#FFF9EF]/72 px-5 py-8 text-center shadow-[0_24px_70px_rgba(58,36,26,0.12)] backdrop-blur-2xl sm:rounded-[2.25rem] sm:px-10 sm:py-12"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.72),transparent_42%),linear-gradient(145deg,rgba(255,249,239,0.82),rgba(247,235,221,0.36)_56%,rgba(201,144,69,0.10))]" />

              <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />

              <div className="relative mx-auto flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-[1.75rem] border border-[#3A241A]/10 bg-white/75 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_16px_38px_rgba(58,36,26,0.10)] sm:h-[132px] sm:w-[132px]">
                <Image
                  src={settings.logo}
                  alt={`${settings.businessName} logo`}
                  width={132}
                  height={132}
                  priority
                  className="h-full w-full object-contain"
                />
              </div>

              <h2
                className={`
                  relative
                  mx-auto
                  mt-6
                  w-full
                  text-center
                  ${FONT_HEADING}
                  text-2xl
                  font-bold
                  leading-tight
                  tracking-[-0.025em]
                  text-[#2A1B14]
                  sm:mt-7
                  sm:text-[1.75rem]
                `}
              >
                {settings.businessName}
              </h2>

              <p className="relative mx-auto mt-3 w-full text-center text-sm font-bold uppercase tracking-[0.12em] text-[#9A6429] sm:tracking-[0.14em]">
                Trusted Pet Store
              </p>

              <p className="relative mx-auto mt-3 w-full text-center text-base font-semibold leading-6 text-[#5E4A3D]">
                {settings.address}
              </p>
            </motion.div>

            <div className="relative mt-5 grid w-full grid-cols-1 gap-3 min-[390px]:grid-cols-2 sm:mt-6 sm:gap-4">
              {petChips.map((chip) => {
                const Icon = chip.icon;

                return (
                  <motion.div
                    key={chip.label}
                    whileHover={{ y: -3 }}
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 22,
                    }}
                    className="flex min-h-[68px] w-full items-center justify-center gap-3 rounded-[1.35rem] border border-[#3A241A]/10 bg-[#FFF9EF]/72 px-4 py-4 text-center text-[15px] font-bold leading-5 text-[#2A1B14] shadow-[0_14px_34px_rgba(58,36,26,0.07)] backdrop-blur-xl transition duration-300 hover:bg-[#FFF4E4] sm:px-5"
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-[#B77932]"
                      strokeWidth={2.1}
                    />

                    <span>{chip.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}