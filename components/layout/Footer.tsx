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
    <footer className="relative isolate bg-[#FFF9EF] px-4 pt-20 font-[Inter] sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#FFF9EF_0%,#FFF4E4_55%,#F7EBDD_100%)]" />

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          className="grid gap-6 lg:grid-cols-[1.35fr_0.75fr_1fr_1fr]"
        >
          {/* Bunny Pets Zone */}
          <motion.div variants={fadeUpVariants}>
            <Link
              href="/"
              aria-label={`${settings.businessName} home`}
              className="inline-flex items-center gap-4 rounded-2xl outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-[#B77932] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF9EF]"
            >
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-[#ECE0CE] bg-[#FFF9EF] shadow-sm shadow-[#2A1B14]/5">
                <Image
                  src={settings.logo}
                  alt={`${settings.businessName} logo`}
                  fill
                  sizes="64px"
                  className="object-contain p-1.5"
                />
              </span>

              <span>
                <span className="block font-[Poppins] text-xl font-bold leading-snug text-[#2A1B14]">
                  {settings.businessName}
                </span>
                <span className="mt-1 block text-sm font-semibold leading-relaxed text-[#B77932]">
                  Healthy Pets. Happy Families.
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-base leading-8 text-[#3A241A]">
              Premium pets raised with love and care in Hyderabad.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.nav
            variants={fadeUpVariants}
            aria-label="Footer quick links"
            className="lg:border-l lg:border-[#ECE0CE] lg:pl-8"
          >
            <h2 className="pl-0.5 pt-0.5 font-[Poppins] text-lg font-bold leading-snug tracking-tight text-[#2A1B14]">
              Quick Links
            </h2>

            <ul className="mt-6 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex text-base font-semibold text-[#3A241A] outline-none transition duration-300 hover:translate-x-0.5 hover:text-[#B77932] focus-visible:ring-2 focus-visible:ring-[#B77932] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF9EF]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Contact */}
          <motion.div
            variants={fadeUpVariants}
            className="lg:border-l lg:border-[#ECE0CE] lg:pl-8"
          >
            <h2 className="pl-0.5 pt-0.5 font-[Poppins] text-lg font-bold leading-snug tracking-tight text-[#2A1B14]">
              Contact
            </h2>

            <ul className="mt-6 space-y-5">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <span className="flex min-w-0 gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#B77932]/10 text-[#B77932]">
                      <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                    </span>

                    <span className="min-w-0">
                      <span className="block text-xs font-bold uppercase tracking-[0.16em] text-[#B77932]">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-sm font-semibold leading-6 text-[#2A1B14]">
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
                        className="block outline-none transition duration-300 hover:translate-x-0.5 focus-visible:ring-2 focus-visible:ring-[#B77932] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF9EF]"
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

          {/* Visit Us */}
          <motion.div
            variants={fadeUpVariants}
            className="lg:border-l lg:border-[#ECE0CE] lg:pl-8"
          >
            <h2 className="relative z-10 pl-0.5 pt-0.5 font-[Poppins] text-lg font-bold leading-snug tracking-tight text-[#2A1B14]">
              Visit Us
            </h2>

            <Sparkles
              aria-hidden="true"
              className="mt-5 h-5 w-5 text-[#B77932]"
              strokeWidth={1.8}
            />

            <p className="mt-4 text-base leading-8 text-[#3A241A]">
              Visit our pet store in Kondapur and find your perfect
              companion.
            </p>

            <div className="mt-5 h-px w-12 bg-[#C99045]/70" />
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-12 flex flex-col gap-4 border-t border-[#ECE0CE] py-8 text-center text-sm font-medium text-[#3A241A] sm:flex-row sm:items-center sm:justify-between sm:text-left"
        >
          <p>© 2026 {settings.businessName}. All Rights Reserved.</p>

          <p>
            Designed &amp; Developed by{" "}
            <Link
              href="https://kangitensoftwares.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#B77932] outline-none transition duration-300 hover:underline focus-visible:rounded focus-visible:ring-2 focus-visible:ring-[#B77932] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF9EF]"
            >
              Kangiten Softwares
            </Link>
          </p>
        </motion.div>
      </Container>
    </footer>
  );
}