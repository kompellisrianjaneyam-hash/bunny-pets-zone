"use client";

import { motion, type Variants } from "framer-motion";
import {
  BadgeCheck,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type FeatureCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const features: FeatureCard[] = [
  {
    title: "Healthy Pets",
    description:
      "Every pet is raised with proper care, nutrition, and attention to ensure a healthy start.",
    icon: ShieldCheck,
  },
  {
    title: "Trusted by Families",
    description:
      "Hundreds of happy families have found their perfect companion through Bunny Pets Zone.",
    icon: HeartHandshake,
  },
  {
    title: "Expert Guidance",
    description:
      "Friendly support before and after adoption to help you care for your new pet.",
    icon: BadgeCheck,
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
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-choose-us-heading"
      className="relative isolate overflow-visible bg-[#FFF9F2] py-28 font-[Inter] sm:py-32 lg:py-36"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-screen overflow-hidden bg-[#FFF9F2]">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFF9F2_0%,#FFFDF9_50%,#FFF9F2_100%)]" />

        <div className="absolute -left-52 top-[28%] h-96 w-96 rounded-full bg-[#D59A3A]/[0.035]" />

        <div className="absolute -right-52 bottom-[10%] h-[28rem] w-[28rem] rounded-full bg-[#D59A3A]/[0.03]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="
          mx-auto
          flex
          w-[calc(100%-2rem)]
          max-w-[900px]
          flex-col
          items-center
          justify-center
          text-center
          lg:relative
          lg:left-[50vw]
          lg:mx-0
          lg:w-[900px]
          lg:-translate-x-1/2
        "
      >
        <motion.div
          variants={fadeUpVariants}
          className="flex w-full items-center justify-center"
        >
          <div className="inline-flex items-center justify-center gap-2 text-center text-xs font-bold uppercase tracking-[0.24em] text-[#B77932] sm:text-sm">
            <Sparkles
              aria-hidden="true"
              className="h-4 w-4 shrink-0"
              strokeWidth={1.8}
            />

            <span>Why Choose Us</span>
          </div>
        </motion.div>

        <motion.h2
          id="why-choose-us-heading"
          variants={fadeUpVariants}
          className="mt-8 w-full text-center font-[Poppins] text-4xl font-bold leading-[1.18] tracking-[-0.035em] text-[#2A1B14] sm:text-5xl sm:leading-[1.15] lg:text-[3.6rem] lg:leading-[1.12]"
        >
          <span className="block text-center">
            Why Pet Lovers Choose
          </span>

          <span className="block text-center">
            Bunny Pets Zone
          </span>
        </motion.h2>

        <motion.div
          variants={fadeUpVariants}
          aria-hidden="true"
          className="mt-8 flex w-full items-center justify-center gap-3"
        >
          <span className="h-px w-12 bg-[#C99045]/55" />

          <HeartHandshake
            className="h-5 w-5 shrink-0 text-[#C99045]"
            strokeWidth={1.7}
          />

          <span className="h-px w-12 bg-[#C99045]/55" />
        </motion.div>

        <motion.p
          variants={fadeUpVariants}
          className="mx-auto mt-8 max-w-[700px] text-center text-base leading-8 text-[#5B4A3F] sm:text-lg sm:leading-9"
        >
          We are committed to providing healthy, well-cared-for pets and
          helping every family find the perfect lifelong companion.
        </motion.p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.14 }}
        className="
          mx-auto
          mt-20
          grid
          w-[calc(100%-2rem)]
          max-w-[1120px]
          grid-cols-1
          gap-8
          md:grid-cols-3
          lg:relative
          lg:left-[50vw]
          lg:mx-0
          lg:mt-24
          lg:w-[1120px]
          lg:-translate-x-1/2
          lg:gap-10
        "
      >
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <motion.article
              key={feature.title}
              variants={fadeUpVariants}
              whileHover={{ y: -4 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 24,
              }}
              className="group flex w-full flex-col items-center justify-start rounded-[1.75rem] border border-[#3A241A]/[0.07] bg-[#FFFEFB] px-8 py-10 text-center shadow-[0_18px_48px_rgba(58,36,26,0.065)]"
            >
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-[#D59A3A]/10 bg-[#FFF7E9] text-[#D09125] shadow-[0_10px_28px_rgba(183,121,50,0.08)] transition-transform duration-300 group-hover:scale-[1.04]">
                <Icon
                  aria-hidden="true"
                  className="h-9 w-9"
                  strokeWidth={1.7}
                />
              </div>

              <h3 className="mt-8 w-full text-center font-[Poppins] text-2xl font-bold leading-[1.3] tracking-[-0.025em] text-[#2A1B14]">
                {feature.title}
              </h3>

              <span
                aria-hidden="true"
                className="mt-5 h-px w-10 bg-[#D59A3A]"
              />

              <p className="mx-auto mt-6 max-w-[17rem] text-center text-base leading-8 text-[#5B4A3F]">
                {feature.description}
              </p>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}