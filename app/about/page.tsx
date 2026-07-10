"use client";

import { motion, type Variants } from "framer-motion";
import {
  Bird,
  Cat,
  Dog,
  HeartHandshake,
  HeartPulse,
  MessageCircle,
  PawPrint,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Image from "next/image";


import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

const settings = {
  businessName: "Bunny Pets Zone",
  address: "Kondapur, Hyderabad",
  phone: "7680904157",
  whatsapp: "7680904157",
  logo: "/logos/bunny-pets-zone-logo.png",
};

const whatsappHref = `https://wa.me/91${settings.whatsapp}`;
const phoneHref = `tel:${settings.phone}`;

const whyChooseCards = [
  {
    title: "Healthy Pets",
    description:
      "We focus on proper care, comfort and attention so every pet has a healthy start.",
    icon: HeartPulse,
  },
  {
    title: "Wide Variety",
    description:
      "Families can explore dogs, cats, birds and hamsters based on their lifestyle.",
    icon: PawPrint,
  },
  {
    title: "Friendly Guidance",
    description:
      "Our team helps you understand pet needs before you make the right choice.",
    icon: HeartHandshake,
  },
  {
    title: "Happy Families",
    description:
      "We love helping customers find companions that bring warmth into their homes.",
    icon: Users,
  },
];

const petCards = [
  {
    title: "Dogs",
    description:
      "Playful, loyal and loving companions for active and affectionate families.",
    icon: Dog,
  },
  {
    title: "Cats",
    description:
      "Gentle, independent and charming pets that bring calm joy to the home.",
    icon: Cat,
  },
  {
    title: "Birds",
    description:
      "Colorful, cheerful and expressive pets that brighten everyday moments.",
    icon: Bird,
  },
  {
    title: "Hamsters",
    description:
      "Small, adorable companions that are delightful for caring pet lovers.",
    icon: PawPrint,
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
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
    y: 30,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] font-[Inter]">
      <section className="relative isolate overflow-hidden bg-[#FFF8F0] px-4 pb-20 pt-36 sm:px-6 sm:pb-24 sm:pt-40 lg:px-8 lg:pb-28 lg:pt-44">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(213,154,58,0.15),transparent_30%),radial-gradient(circle_at_86%_24%,rgba(255,214,153,0.32),transparent_28%),linear-gradient(180deg,#FFF8F0_0%,#FFF3E6_52%,#FFF8F0_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(213,154,58,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(213,154,58,0.04)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_72%)]" />
          <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-[#D59A3A]/10 blur-3xl" />
          <div className="absolute -right-28 top-36 h-96 w-96 rounded-full bg-orange-200/42 blur-3xl" />
        </div>

        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left"
            >
              <motion.div
                variants={fadeUpVariants}
                className="inline-flex items-center gap-2 rounded-full border border-[#ECECEC] bg-white/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D59A3A] shadow-lg shadow-[#D59A3A]/5 backdrop-blur-xl"
              >
                <Sparkles
                  aria-hidden="true"
                  className="h-4 w-4"
                  strokeWidth={2}
                />
                <span>About Us</span>
              </motion.div>

              <motion.h1
                variants={fadeUpVariants}
                className="mt-7 text-balance font-[Poppins] text-5xl font-bold leading-tight tracking-tight text-[#2F2017] sm:text-6xl lg:text-7xl"
              >
                Helping Families Find Their Perfect Companion
              </motion.h1>

              <motion.p
                variants={fadeUpVariants}
                className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-[#5B4A3F] sm:text-xl lg:mx-0"
              >
                At {settings.businessName}, we believe every pet deserves a
                loving home and every family deserves the perfect companion. We
                are committed to helping customers choose healthy, well-cared-for
                pets.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 34, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                duration: 0.78,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.16,
              }}
              className="relative mx-auto w-full max-w-lg"
              aria-label={`${settings.businessName} logo`}
            >
              <div className="absolute left-1/2 top-1/2 -z-10 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D59A3A]/14 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2.5rem] border border-[#ECECEC] bg-white/48 p-8 shadow-[0_28px_90px_rgba(47,32,23,0.12)] backdrop-blur-2xl sm:p-10">
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D59A3A]/12 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-orange-200/36 blur-3xl" />

                <div className="relative mx-auto flex aspect-square max-w-[360px] items-center justify-center rounded-[2rem] border border-white/70 bg-[#FFF8F0]/72 p-10 shadow-2xl shadow-[#D59A3A]/10">
                  <Image
                    src={settings.logo}
                    alt={`${settings.businessName} logo`}
                    width={320}
                    height={320}
                    priority
                    className="h-auto w-full object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="relative bg-[#FFF8F0] px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="grid items-start gap-10 lg:grid-cols-[0.82fr_1.18fr]"
          >
            <motion.div variants={fadeUpVariants}>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ECECEC] bg-white/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D59A3A] shadow-lg shadow-[#D59A3A]/5 backdrop-blur-xl">
                <ShieldCheck
                  aria-hidden="true"
                  className="h-4 w-4"
                  strokeWidth={2}
                />
                <span>Our Story</span>
              </div>

              <h2 className="mt-7 font-[Poppins] text-4xl font-bold leading-tight tracking-tight text-[#2F2017] sm:text-5xl">
                Our Story
              </h2>
            </motion.div>

            <motion.div
              variants={fadeUpVariants}
              className="rounded-[2.25rem] border border-[#ECECEC] bg-white/54 p-7 shadow-xl shadow-[#2F2017]/5 backdrop-blur-xl sm:p-9"
            >
              <div className="space-y-6 text-lg leading-9 text-[#5B4A3F]">
                <p>
                  {settings.businessName} is a local pet store in{" "}
                  {settings.address}, built around a simple promise: help
                  families choose pets with confidence, care and clarity.
                </p>

                <p>
                  We help customers explore dogs, cats, birds and hamsters while
                  understanding the kind of care, attention and environment each
                  pet needs. Our approach is warm, honest and focused on making
                  the match feel right for both the pet and the family.
                </p>

                <p>
                  Whether you are welcoming your first pet or adding another
                  companion to your home, our team is here to guide you with
                  friendly support and practical information.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-[#FFF8F0] px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
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
              variants={fadeUpVariants}
              className="mt-7 text-balance font-[Poppins] text-4xl font-bold leading-tight tracking-tight text-[#2F2017] sm:text-5xl lg:text-6xl"
            >
              Why Choose {settings.businessName}
            </motion.h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {whyChooseCards.map((card) => {
              const Icon = card.icon;

              return (
                <motion.article
                  key={card.title}
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  className="group rounded-[2rem] border border-[#ECECEC] bg-white/54 p-7 shadow-xl shadow-[#2F2017]/5 backdrop-blur-xl transition-colors duration-300 hover:border-[#D59A3A]"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#D59A3A]/12 text-[#D59A3A] shadow-lg shadow-[#D59A3A]/10 transition-transform duration-300 group-hover:scale-110">
                    <Icon
                      aria-hidden="true"
                      className="h-8 w-8"
                      strokeWidth={1.8}
                    />
                  </div>

                  <h3 className="mt-8 font-[Poppins] text-2xl font-bold tracking-tight text-[#2F2017]">
                    {card.title}
                  </h3>

                  <p className="mt-4 text-base leading-8 text-[#5B4A3F]">
                    {card.description}
                  </p>
                </motion.article>
              );
            })}
          </motion.div>
        </Container>
      </section>

      <section className="relative bg-[#FFF8F0] px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
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
              <PawPrint aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              <span>Our Pets</span>
            </motion.div>

            <motion.h2
              variants={fadeUpVariants}
              className="mt-7 text-balance font-[Poppins] text-4xl font-bold leading-tight tracking-tight text-[#2F2017] sm:text-5xl lg:text-6xl"
            >
              Pets for Every Loving Family
            </motion.h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {petCards.map((card) => {
              const Icon = card.icon;

              return (
                <motion.article
                  key={card.title}
                  variants={cardVariants}
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  className="group rounded-[2rem] border border-[#ECECEC] bg-white/54 p-8 text-center shadow-xl shadow-[#2F2017]/5 backdrop-blur-xl transition-colors duration-300 hover:border-[#D59A3A]"
                >
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-[#D59A3A]/12 text-[#D59A3A] shadow-lg shadow-[#D59A3A]/10 transition-transform duration-300 group-hover:scale-110">
                    <Icon
                      aria-hidden="true"
                      className="h-10 w-10"
                      strokeWidth={1.7}
                    />
                  </div>

                  <h3 className="mt-8 font-[Poppins] text-2xl font-bold tracking-tight text-[#2F2017]">
                    {card.title}
                  </h3>

                  <p className="mt-4 text-base leading-8 text-[#5B4A3F]">
                    {card.description}
                  </p>
                </motion.article>
              );
            })}
          </motion.div>
        </Container>
      </section>

      <section className="relative bg-[#FFF8F0] px-4 pb-24 sm:px-6 sm:pb-28 lg:px-8 lg:pb-32">
        <Container>
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            className="relative overflow-hidden rounded-[2.25rem] border border-[#ECECEC] bg-white/58 p-8 text-center shadow-[0_26px_80px_rgba(47,32,23,0.10)] backdrop-blur-2xl sm:p-10 lg:p-12"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D59A3A]/12 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-orange-200/38 blur-3xl" />

            <div className="relative z-10">
              <h2 className="font-[Poppins] text-3xl font-bold tracking-tight text-[#2F2017] sm:text-4xl">
                Visit {settings.businessName} Today
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#5B4A3F] sm:text-lg">
                Whether you're looking for a playful puppy, a friendly kitten,
                colorful birds or adorable hamsters, we're here to help you find
                the perfect companion.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row [&_a]:h-14 [&_a]:rounded-full [&_a]:px-8 [&_a]:text-base [&_a]:font-bold">
                <Button href={whatsappHref}>
                  <span className="inline-flex items-center gap-2">
                    <MessageCircle
                      aria-hidden="true"
                      className="h-5 w-5"
                      strokeWidth={2}
                    />
                    Chat on WhatsApp
                  </span>
                </Button>

                <Button href={phoneHref} variant="secondary">
                  <span className="inline-flex items-center gap-2">
                    <Phone
                      aria-hidden="true"
                      className="h-5 w-5"
                      strokeWidth={2}
                    />
                    Call Now
                  </span>
                </Button>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      
     
    </main>
  );
}