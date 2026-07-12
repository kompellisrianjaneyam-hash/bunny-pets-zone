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
    label: "Phone",
    value: settings.phone,
  },
  {
    label: "WhatsApp",
    value: settings.whatsapp,
  },
  {
    label: "Location",
    value: settings.address,
  },
  {
    label: "Hours",
    value: settings.businessHours,
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
        <div className="absolute inset-0 bg-[#FFF9EF]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_22%,rgba(247,235,221,0.72),transparent_34%),radial-gradient(circle_at_86%_20%,rgba(201,144,69,0.09),transparent_30%),linear-gradient(180deg,#FFF9EF_0%,#FFF4E4_56%,#F7EBDD_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-[#3A241A]/10" />
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
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8D5B26]"
            >
              <Sparkles
                aria-hidden="true"
                className="h-4 w-4 text-[#B77932]"
                strokeWidth={2}
              />
              <span>Contact Us</span>
            </motion.div>

            <motion.h2
              id="contact-cta-heading"
              variants={fadeUpVariants}
              className="mt-7 text-balance font-[Poppins] text-4xl font-bold leading-[1.12] tracking-tight text-[#2A1B14] sm:text-5xl lg:text-6xl"
            >
              Ready to Meet Your
              <span className="block">New Best Friend?</span>
            </motion.h2>

            <motion.p
              variants={fadeUpVariants}
              className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-8 text-[#5E4A3D] sm:text-xl lg:mx-0"
            >
              Visit us in Kondapur or get in touch to check current pet
              availability.
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <a
                href={whatsappHref}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-[#2A1B14]/10 bg-[#2A1B14] px-8 text-base font-bold text-[#FFF9EF] shadow-[0_18px_42px_rgba(42,27,20,0.18)] outline-none transition duration-300 hover:-translate-y-0.5 hover:bg-[#3A241A] focus-visible:ring-2 focus-visible:ring-[#B77932] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF9EF]"
              >
                <MessageCircle
                  aria-hidden="true"
                  className="h-5 w-5"
                  strokeWidth={2}
                />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={phoneHref}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-[#3A241A]/14 bg-[#FFF9EF]/58 px-8 text-base font-bold text-[#2A1B14] shadow-[0_12px_30px_rgba(58,36,26,0.06)] outline-none transition duration-300 hover:-translate-y-0.5 hover:border-[#B77932]/36 hover:text-[#8D5B26] focus-visible:ring-2 focus-visible:ring-[#B77932] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF9EF]"
              >
                <Phone
                  aria-hidden="true"
                  className="h-5 w-5 text-[#8D5B26]"
                  strokeWidth={2}
                />
                <span>Call Now</span>
              </a>
            </motion.div>
          </motion.div>

          <motion.aside
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            aria-label={`${settings.businessName} contact information`}
            className="relative overflow-hidden rounded-[2.25rem] border border-[#3A241A]/10 bg-[#FFF9EF]/72 p-6 shadow-[0_26px_80px_rgba(58,36,26,0.10)] sm:p-8 lg:p-10"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_0%,rgba(201,144,69,0.10),transparent_34%),linear-gradient(145deg,rgba(255,249,239,0.92),rgba(247,235,221,0.42))]" />
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />

            <div className="relative z-10">
              <div className="flex items-start gap-5">
                <MapPin
                  aria-hidden="true"
                  className="mt-1 h-7 w-7 shrink-0 text-[#9A6429]"
                  strokeWidth={1.8}
                />

                <div className="min-w-0">
                  <p className="text-sm font-bold uppercase leading-none tracking-[0.18em] text-[#8D5B26]">
                    Visit Us
                  </p>
                  <h3 className="mt-3 font-[Poppins] text-3xl font-bold leading-tight tracking-tight text-[#2A1B14] sm:text-4xl">
                    {settings.businessName}
                  </h3>
                </div>
              </div>

              <dl className="mt-9 grid gap-x-8 gap-y-0 border-y border-[#3A241A]/10 sm:grid-cols-2">
                {contactItems.map((item, index) => (
                  <div
                    key={item.label}
                    className={[
                      "min-w-0 py-5",
                      index < 2 ? "border-b border-[#3A241A]/10" : "",
                      index % 2 === 0 ? "sm:pr-6" : "sm:border-l sm:border-[#3A241A]/10 sm:pl-6",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <dt className="text-[11px] font-bold uppercase leading-none tracking-[0.18em] text-[#8D5B26]/86">
                      {item.label}
                    </dt>
                    <dd className="mt-2 break-words font-[Poppins] text-base font-bold leading-7 text-[#2A1B14] sm:text-lg">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                href={settings.googleMaps}
                className="group mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#2A1B14] outline-none transition duration-300 hover:text-[#8D5B26] focus-visible:ring-2 focus-visible:ring-[#B77932] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF9EF]"
              >
                <span>View on Google Maps</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 text-[#9A6429] transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </a>
            </div>
          </motion.aside>
        </div>
      </Container>
    </section>
  );
}
