"use client";

import { motion, type Variants } from "framer-motion";
import {
  BadgeCheck,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import Container from "@/components/layout/Container";

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
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.62,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-choose-us-heading"
      className="relative isolate overflow-hidden bg-[#FFF8F0] px-4 py-24 font-[Inter] sm:px-6 sm:py-28 lg:px-8 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(213,154,58,0.12),transparent_30%),radial-gradient(circle_at_84%_18%,rgba(255,214,153,0.28),transparent_28%),linear-gradient(180deg,#FFF8F0_0%,#FFF3E6_52%,#FFF8F0_100%)]" />
        <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-[#D59A3A]/10 blur-3xl" />
        <div className="absolute -right-28 bottom-10 h-96 w-96 rounded-full bg-orange-200/42 blur-3xl" />
      </div>

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            variants={fadeUpVariants}
            className="inline-flex items-center gap-2 rounded-full border border-[#ECECEC] bg-white/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D59A3A] shadow-lg shadow-[#D59A3A]/5 backdrop-blur-xl"
          >
            <Sparkles aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
            <span>Why Choose Us</span>
          </motion.div>

          <motion.h2
            id="why-choose-us-heading"
            variants={fadeUpVariants}
            className="mt-7 text-balance font-[Poppins] text-4xl font-bold leading-tight tracking-tight text-[#2F2017] sm:text-5xl lg:text-6xl"
          >
            Why Pet Lovers Choose Bunny Pets Zone
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-[#5B4A3F] sm:text-xl"
          >
            We are committed to providing healthy, well-cared-for pets and
            helping every family find the perfect lifelong companion.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.title}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
                className="group rounded-[2rem] border border-[#ECECEC] bg-white/72 p-8 shadow-xl shadow-[#2F2017]/5 backdrop-blur-xl transition-colors duration-300 hover:border-[#D59A3A]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#D59A3A]/12 text-[#D59A3A] shadow-lg shadow-[#D59A3A]/10 transition-transform duration-300 group-hover:scale-110">
                  <Icon aria-hidden="true" className="h-8 w-8" strokeWidth={1.8} />
                </div>

                <h3 className="mt-8 font-[Poppins] text-2xl font-bold tracking-tight text-[#2F2017]">
                  {feature.title}
                </h3>

                <p className="mt-4 text-base leading-8 text-[#5B4A3F]">
                  {feature.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}