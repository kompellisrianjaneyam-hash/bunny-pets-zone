"use client";

import { motion, type Variants } from "framer-motion";
import {
  HeartHandshake,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

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
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#FFF9EF] font-[Inter]">
      <section className="relative isolate w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(247,235,221,0.9),transparent_34%),radial-gradient(circle_at_84%_24%,rgba(201,144,69,0.12),transparent_30%),linear-gradient(180deg,#FFF9EF_0%,#FFF5E8_54%,#FFF9EF_100%)]" />

          <div className="absolute -left-32 top-48 h-[24rem] w-[24rem] rounded-full bg-[#F7EBDD]/70 blur-3xl" />

          <div className="absolute -right-32 top-80 h-[28rem] w-[28rem] rounded-full bg-[#C99045]/10 blur-3xl" />
        </div>

        <div className="relative left-1/2 w-[calc(100vw-40px)] max-w-[1180px] -translate-x-1/2 pb-24 pt-36 sm:w-[calc(100vw-64px)] sm:pb-28 sm:pt-40 lg:w-[calc(100vw-80px)] lg:pb-32 lg:pt-44">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex w-full flex-col items-center justify-center text-center"
          >
            <motion.div
              variants={fadeUpVariants}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#3A241A]/10 bg-[#FFF9EF]/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#8D5B26] shadow-sm backdrop-blur-xl"
            >
              <Sparkles
                aria-hidden="true"
                className="h-4 w-4 text-[#B77932]"
                strokeWidth={2}
              />

              <span>About Us</span>
            </motion.div>

            <motion.h1
              variants={fadeUpVariants}
              className="mt-8 w-full max-w-[900px] text-center font-[Poppins] text-4xl font-bold leading-[1.08] tracking-tight text-[#2A1B14] sm:text-5xl lg:text-6xl"
            >
              Helping Families Find
              <span className="block text-[#9A6429]">
                Their Perfect Companion
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUpVariants}
              className="mt-7 w-full max-w-[720px] text-center text-base leading-8 text-[#5E4A3D] sm:text-lg"
            >
              At {settings.businessName}, we believe every pet deserves a
              loving home and every family deserves a companion that feels
              right.
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              className="relative mt-14 flex w-full justify-center"
            >
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C99045]/14 blur-3xl" />

              <div className="relative flex h-[330px] w-[330px] items-center justify-center overflow-hidden rounded-[2.25rem] border border-[#3A241A]/10 bg-white/70 p-5 shadow-[0_24px_70px_rgba(58,36,26,0.09)] backdrop-blur-xl sm:h-[380px] sm:w-[380px]">
                <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] bg-white">
                  <Image
                    src={settings.logo}
                    alt={`${settings.businessName} logo`}
                    fill
                    priority
                    sizes="(max-width: 640px) 290px, 340px"
                    className="object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative isolate w-full overflow-hidden bg-[#FFF9EF]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFF9EF_0%,#FFF5E8_50%,#FFF9EF_100%)]" />

          <div className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F7EBDD]/60 blur-3xl" />
        </div>

        <div className="relative left-1/2 w-[calc(100vw-40px)] max-w-[1180px] -translate-x-1/2 py-24 sm:w-[calc(100vw-64px)] sm:py-28 lg:w-[calc(100vw-80px)] lg:py-32">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex w-full flex-col items-center justify-center text-center"
          >
            <motion.div
              variants={fadeUpVariants}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#3A241A]/10 bg-[#FFF9EF]/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#8D5B26] shadow-sm backdrop-blur-xl"
            >
              <ShieldCheck
                aria-hidden="true"
                className="h-4 w-4 text-[#B77932]"
                strokeWidth={2}
              />

              <span>Our Story</span>
            </motion.div>

            <motion.h2
              variants={fadeUpVariants}
              className="mt-8 w-full max-w-[900px] text-center font-[Poppins] text-4xl font-bold leading-[1.1] tracking-tight text-[#2A1B14] sm:text-5xl lg:text-6xl"
            >
              Built Around Care,
              <span className="block text-[#9A6429]">
                Trust & Happy Families
              </span>
            </motion.h2>

            <motion.div
              variants={fadeUpVariants}
              className="mt-12 w-full max-w-[820px] rounded-[2rem] border border-[#3A241A]/10 bg-white/58 px-7 py-10 text-center shadow-[0_24px_70px_rgba(58,36,26,0.07)] backdrop-blur-xl sm:px-12 sm:py-12"
            >
              <HeartHandshake
                aria-hidden="true"
                className="mx-auto h-10 w-10 text-[#B77932]"
                strokeWidth={1.7}
              />

              <div className="mt-8 space-y-7 text-center text-base leading-8 text-[#5E4A3D] sm:text-lg sm:leading-9">
                <p>
                  {settings.businessName} is a local pet store in{" "}
                  {settings.address}, built around a simple promise: helping
                  families choose pets with confidence, care and clarity.
                </p>

                <p>
                  We help customers explore dogs, cats, birds and hamsters while
                  understanding the care, attention and environment each pet
                  needs.
                </p>

                <p>
                  Whether you are welcoming your first pet or adding another
                  companion to your family, our team is here with friendly
                  support and practical guidance.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative isolate w-full overflow-hidden bg-[#FFF9EF]">
        <div className="relative left-1/2 w-[calc(100vw-40px)] max-w-[1180px] -translate-x-1/2 pb-24 pt-8 sm:w-[calc(100vw-64px)] sm:pb-28 lg:w-[calc(100vw-80px)] lg:pb-32">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative mx-auto w-full max-w-[900px] overflow-hidden rounded-[2rem] border border-[#3A241A]/10 bg-white/60 px-7 py-12 text-center shadow-[0_26px_80px_rgba(58,36,26,0.08)] backdrop-blur-xl sm:px-12 sm:py-14"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#C99045]/12 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#F7EBDD]/80 blur-3xl" />

            <div className="relative z-10 flex w-full flex-col items-center justify-center text-center">
              <Sparkles
                aria-hidden="true"
                className="h-8 w-8 text-[#B77932]"
                strokeWidth={1.8}
              />

              <h2 className="mt-6 w-full text-center font-[Poppins] text-3xl font-bold leading-tight tracking-tight text-[#2A1B14] sm:text-4xl lg:text-5xl">
                Visit {settings.businessName}
              </h2>

              <p className="mt-6 w-full max-w-[620px] text-center text-base leading-8 text-[#5E4A3D] sm:text-lg">
                Looking for a new companion? Visit us in Kondapur or speak with
                our team to know more about available pets.
              </p>

              <div className="mt-9 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row [&_a]:min-h-14 [&_a]:w-full [&_a]:rounded-full [&_a]:px-8 [&_a]:text-base [&_a]:font-bold sm:[&_a]:w-auto">
                <Button href={whatsappHref}>
                  <span className="inline-flex items-center justify-center gap-2">
                    <MessageCircle
                      aria-hidden="true"
                      className="h-5 w-5"
                      strokeWidth={2}
                    />

                    Chat on WhatsApp
                  </span>
                </Button>

                <Button href={phoneHref} variant="secondary">
                  <span className="inline-flex items-center justify-center gap-2">
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
        </div>
      </section>
    </main>
  );
}