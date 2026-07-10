"use client";

import { motion, type Variants } from "framer-motion";
import { Clock3, MapPin, Phone, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Container from "@/components/layout/Container";

const settings = {
  businessName: "Bunny Pets Zone",
  logo: "/logos/bunny-pets-zone-logo.png",
  phone: "7680904157",
  address: "Kondapur, Hyderabad",
  businessHours: "10:00 AM - 10:00 PM",
};

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Pets", href: "/pets" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const contactItems = [
  {
    label: "Phone",
    value: settings.phone,
    icon: Phone,
    href: `tel:${settings.phone}`,
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
      delayChildren: 0.05,
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
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#FFF8F0] px-4 pt-20 font-[Inter] sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(213,154,58,0.12),transparent_30%),radial-gradient(circle_at_86%_24%,rgba(255,214,153,0.28),transparent_28%),linear-gradient(180deg,#FFF8F0_0%,#FFF3E6_54%,#FFF8F0_100%)]" />
        <div className="absolute -left-28 top-12 h-80 w-80 rounded-full bg-[#D59A3A]/10 blur-3xl" />
        <div className="absolute -right-28 bottom-0 h-96 w-96 rounded-full bg-orange-200/42 blur-3xl" />
      </div>

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          className="grid gap-6 lg:grid-cols-[1.35fr_0.75fr_1fr_1fr]"
        >
          <motion.div
            variants={fadeUpVariants}
            className="rounded-[2rem] border border-[#ECECEC] bg-white/50 p-7 shadow-xl shadow-[#2F2017]/5 backdrop-blur-xl"
          >
            <Link
              href="/"
              aria-label={`${settings.businessName} home`}
              className="inline-flex items-center gap-4 rounded-2xl outline-none transition duration-300 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0]"
            >
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-3xl border border-[#ECECEC] bg-white shadow-lg shadow-[#2F2017]/5">
                <Image
                  src={settings.logo}
                  alt={`${settings.businessName} logo`}
                  fill
                  sizes="64px"
                  className="object-contain p-1.5"
                />
              </span>

              <span>
                <span className="block font-[Poppins] text-xl font-bold leading-tight text-[#2F2017]">
                  {settings.businessName}
                </span>
                <span className="mt-1 block text-sm font-semibold text-[#D59A3A]">
                  Healthy Pets. Happy Families.
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-base leading-8 text-[#5B4A3F]">
              Premium pets raised with love and care in Hyderabad.
            </p>
          </motion.div>

          <motion.nav
            variants={fadeUpVariants}
            aria-label="Footer quick links"
            className="rounded-[2rem] border border-[#ECECEC] bg-white/50 p-7 shadow-xl shadow-[#2F2017]/5 backdrop-blur-xl"
          >
            <h2 className="font-[Poppins] text-lg font-bold tracking-tight text-[#2F2017]">
              Quick Links
            </h2>

            <ul className="mt-6 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex rounded-full text-base font-semibold text-[#5B4A3F] outline-none transition duration-300 hover:translate-x-1 hover:text-[#D59A3A] focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div
            variants={fadeUpVariants}
            className="rounded-[2rem] border border-[#ECECEC] bg-white/50 p-7 shadow-xl shadow-[#2F2017]/5 backdrop-blur-xl"
          >
            <h2 className="font-[Poppins] text-lg font-bold tracking-tight text-[#2F2017]">
              Contact
            </h2>

            <ul className="mt-6 space-y-5">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <span className="flex gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#D59A3A]/12 text-[#D59A3A]">
                      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
                    </span>

                    <span>
                      <span className="block text-xs font-bold uppercase tracking-[0.16em] text-[#D59A3A]">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-sm font-semibold leading-6 text-[#5B4A3F]">
                        {item.value}
                      </span>
                    </span>
                  </span>
                );

                return (
                  <li key={item.label}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="block rounded-2xl outline-none transition duration-300 hover:translate-x-1 focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0]"
                      >
                        {content}
                      </Link>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            className="relative overflow-hidden rounded-[2rem] border border-[#ECECEC] bg-white/50 p-7 shadow-xl shadow-[#2F2017]/5 backdrop-blur-xl"
          >
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#D59A3A]/12 blur-3xl" />

            <div className="relative z-10">
              <h2 className="font-[Poppins] text-lg font-bold tracking-tight text-[#2F2017]">
                Visit Us
              </h2>

              <div className="mt-6 rounded-[1.5rem] border border-[#ECECEC] bg-[#FFF8F0]/70 p-6 shadow-inner shadow-white/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D59A3A]/12 text-[#D59A3A]">
                  <Sparkles aria-hidden="true" className="h-6 w-6" strokeWidth={1.8} />
                </div>

                <p className="mt-5 text-base font-semibold leading-8 text-[#5B4A3F]">
                  Visit our pet store in Kondapur and find your perfect
                  companion.
                </p>

                <div className="mt-6 h-1.5 w-20 rounded-full bg-[#D59A3A]" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-12 flex flex-col gap-4 border-t border-[#ECECEC] py-8 text-center text-sm font-medium text-[#5B4A3F] sm:flex-row sm:items-center sm:justify-between sm:text-left"
        >
          <p>© 2026 {settings.businessName}. All Rights Reserved.</p>

          <p>
            Designed &amp; Developed by{" "}
            <Link
              href="https://kangitensoftwares.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#D59A3A] outline-none transition duration-300 hover:underline focus-visible:rounded focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0]"
            >
              Kangiten Softwares
            </Link>
          </p>
        </motion.div>
      </Container>
    </footer>
  );
}