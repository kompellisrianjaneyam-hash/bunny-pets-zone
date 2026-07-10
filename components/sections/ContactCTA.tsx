"use client";

import { motion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";

import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

const settings = {
  businessName: "Bunny Pets Zone",
  phone: "7680904157",
  whatsapp: "7680904157",
  address: "Kondapur, Hyderabad",
  businessHours: "10:00 AM - 10:00 PM",
  googleMaps: "https://share.google/RFX0z385nCm7Cb5KY",
};

const whatsappHref = `https://wa.me/91${settings.whatsapp}`;
const phoneHref = `tel:${settings.phone}`;

const contactItems = [
  {
    label: "Phone Number",
    value: settings.phone,
    icon: Phone,
  },
  {
    label: "WhatsApp",
    value: settings.whatsapp,
    icon: MessageCircle,
  },
  {
    label: "Address",
    value: settings.address,
    icon: MapPin,
  },
  {
    label: "Business Hours",
    value: settings.businessHours,
    icon: Clock3,
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
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
    y: 30,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.68,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ContactCTA() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-cta-heading"
      className="relative isolate overflow-hidden bg-[#FFF8F0] px-4 py-24 font-[Inter] sm:px-6 sm:py-28 lg:px-8 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(213,154,58,0.14),transparent_30%),radial-gradient(circle_at_84%_22%,rgba(255,214,153,0.30),transparent_28%),linear-gradient(180deg,#FFF8F0_0%,#FFF3E6_52%,#FFF8F0_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(213,154,58,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(213,154,58,0.04)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_72%)]" />
        <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-[#D59A3A]/10 blur-3xl" />
        <div className="absolute -right-28 bottom-10 h-96 w-96 rounded-full bg-orange-200/42 blur-3xl" />
      </div>

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left"
          >
            <motion.div
              variants={fadeUpVariants}
              className="inline-flex items-center gap-2 rounded-full border border-[#ECECEC] bg-white/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D59A3A] shadow-lg shadow-[#D59A3A]/5 backdrop-blur-xl"
            >
              <Sparkles aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              <span>Contact Us</span>
            </motion.div>

            <motion.h2
              id="contact-cta-heading"
              variants={fadeUpVariants}
              className="mt-7 text-balance font-[Poppins] text-4xl font-bold leading-tight tracking-tight text-[#2F2017] sm:text-5xl lg:text-6xl"
            >
              Ready to Meet Your New Best Friend?
            </motion.h2>

            <motion.p
              variants={fadeUpVariants}
              className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-[#5B4A3F] sm:text-xl lg:mx-0"
            >
              Visit {settings.businessName} in {settings.address} or contact us
              on WhatsApp to know about available pets. Our team is always happy
              to help you choose the perfect companion.
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start [&_a]:h-14 [&_a]:rounded-full [&_a]:px-8 [&_a]:text-base [&_a]:font-bold"
            >
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
            </motion.div>
          </motion.div>

          <motion.aside
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            aria-label={`${settings.businessName} contact information`}
            className="relative overflow-hidden rounded-[2.25rem] border border-[#ECECEC] bg-white/58 p-6 shadow-[0_26px_80px_rgba(47,32,23,0.10)] backdrop-blur-2xl sm:p-8 lg:p-10"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D59A3A]/12 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-orange-200/38 blur-3xl" />

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#D59A3A]">
                    Visit Us
                  </p>
                  <h3 className="mt-3 font-[Poppins] text-3xl font-bold tracking-tight text-[#2F2017] sm:text-4xl">
                    {settings.businessName}
                  </h3>
                </div>

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-[#D59A3A]/12 text-[#D59A3A] shadow-lg shadow-[#D59A3A]/10">
                  <MapPin aria-hidden="true" className="h-7 w-7" strokeWidth={1.8} />
                </div>
              </div>

              <div className="mt-8 grid gap-4">
                {contactItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="rounded-3xl border border-[#ECECEC] bg-white/54 p-5 shadow-lg shadow-[#2F2017]/5 backdrop-blur-xl"
                    >
                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D59A3A]/12 text-[#D59A3A]">
                          <Icon
                            aria-hidden="true"
                            className="h-6 w-6"
                            strokeWidth={1.8}
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#5B4A3F]">
                            {item.label}
                          </p>
                          <p className="mt-1 break-words font-[Poppins] text-lg font-bold text-[#2F2017]">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 [&_a]:h-14 [&_a]:w-full [&_a]:rounded-full [&_a]:text-base [&_a]:font-bold">
                <Button href={settings.googleMaps} variant="secondary">
                  <span className="inline-flex items-center gap-2">
                    View on Google Maps
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-5 w-5"
                      strokeWidth={2}
                    />
                  </span>
                </Button>
              </div>
            </div>
          </motion.aside>
        </div>
      </Container>
    </section>
  );
}