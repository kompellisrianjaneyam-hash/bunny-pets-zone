"use client";

import { motion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

const settings = {
  businessName: "Bunny Pets Zone",
  phone: "7680904157",
  whatsapp: "7680904157",
  address: "Kondapur, Hyderabad",
  businessHours: "10:00 AM - 10:00 PM",
  workingDays: "Monday - Sunday",
  googleMaps:
    "https://www.google.com/maps/search/?api=1&query=Bunny+Pets+Zone+Kondapur+Hyderabad",
};

type ContactItem = {
  label: string;
  value: string;
  icon: LucideIcon;
  href?: string;
};

const whatsappHref = `https://wa.me/91${settings.whatsapp}`;
const phoneHref = `tel:${settings.phone}`;
const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  settings.address,
)}&output=embed`;

const contactItems: ContactItem[] = [
  {
    label: "Phone Number",
    value: settings.phone,
    icon: Phone,
    href: phoneHref,
  },
  {
    label: "WhatsApp Number",
    value: settings.whatsapp,
    icon: MessageCircle,
    href: whatsappHref,
  },
  {
    label: "Address",
    value: settings.address,
    icon: MapPin,
    href: settings.googleMaps,
  },
  {
    label: "Business Hours",
    value: settings.businessHours,
    icon: Clock3,
  },
  {
    label: "Working Days",
    value: settings.workingDays,
    icon: CalendarDays,
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
      duration: 0.68,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] font-[Inter]">
      <section className="relative isolate overflow-hidden bg-[#FFF8F0] px-4 pb-16 pt-36 sm:px-6 sm:pb-20 sm:pt-40 lg:px-8 lg:pb-24 lg:pt-44">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(213,154,58,0.15),transparent_30%),radial-gradient(circle_at_86%_24%,rgba(255,214,153,0.32),transparent_28%),linear-gradient(180deg,#FFF8F0_0%,#FFF3E6_52%,#FFF8F0_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(213,154,58,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(213,154,58,0.04)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_72%)]" />
          <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-[#D59A3A]/10 blur-3xl" />
          <div className="absolute -right-28 top-36 h-96 w-96 rounded-full bg-orange-200/42 blur-3xl" />
        </div>

        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div
              variants={fadeUpVariants}
              className="inline-flex items-center gap-2 rounded-full border border-[#ECECEC] bg-white/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D59A3A] shadow-lg shadow-[#D59A3A]/5 backdrop-blur-xl"
            >
              <Sparkles aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              <span>Contact Us</span>
            </motion.div>

            <motion.h1
              variants={fadeUpVariants}
              className="mt-7 text-balance font-[Poppins] text-5xl font-bold leading-tight tracking-tight text-[#2F2017] sm:text-6xl lg:text-7xl"
            >
              Visit {settings.businessName}
            </motion.h1>

            <motion.p
              variants={fadeUpVariants}
              className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-[#5B4A3F] sm:text-xl"
            >
              We're always happy to help you find the perfect companion. Visit
              our pet store in {settings.address} or contact us through WhatsApp
              or phone.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      <section className="relative bg-[#FFF8F0] px-4 pb-24 sm:px-6 sm:pb-28 lg:px-8 lg:pb-32">
        <Container>
          <div className="grid items-stretch gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:gap-10">
            <motion.article
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              aria-labelledby="contact-info-heading"
              className="relative overflow-hidden rounded-[2.25rem] border border-[#ECECEC] bg-white/58 p-5 shadow-[0_26px_80px_rgba(47,32,23,0.10)] backdrop-blur-2xl sm:p-6 lg:p-7"
            >
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D59A3A]/12 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-orange-200/38 blur-3xl" />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D59A3A]">
                      Store Details
                    </p>
                    <h2
                      id="contact-info-heading"
                      className="mt-3 font-[Poppins] text-3xl font-bold tracking-tight text-[#2F2017] sm:text-4xl"
                    >
                      {settings.businessName}
                    </h2>
                  </div>

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-[#D59A3A]/12 text-[#D59A3A] shadow-lg shadow-[#D59A3A]/10">
                    <MapPin
                      aria-hidden="true"
                      className="h-7 w-7"
                      strokeWidth={1.8}
                    />
                  </div>
                </div>

                <div className="mt-7 grid gap-3">
                  {contactItems.map((item) => {
                    const Icon = item.icon;
                    const content = (
                      <span className="flex items-center gap-4">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D59A3A]/12 text-[#D59A3A] shadow-sm">
                          <Icon
                            aria-hidden="true"
                            className="h-6 w-6"
                            strokeWidth={1.8}
                          />
                        </span>

                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-[#5B4A3F]">
                            {item.label}
                          </span>
                          <span className="mt-1 block break-words font-[Poppins] text-xl font-bold leading-tight text-[#2F2017]">
                            {item.value}
                          </span>
                        </span>
                      </span>
                    );

                    const className =
                      "rounded-[1.45rem] border border-[#ECECEC] bg-white/64 px-4 py-4 shadow-lg shadow-[#2F2017]/5 outline-none backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-[#D59A3A]/45 focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0]";

                    return item.href ? (
                      <Link
                        key={item.label}
                        href={item.href}
                        target={
                          item.href === settings.googleMaps ? "_blank" : undefined
                        }
                        rel={
                          item.href === settings.googleMaps
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className={className}
                      >
                        {content}
                      </Link>
                    ) : (
                      <div key={item.label} className={className}>
                        {content}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="[&_a]:h-13 [&_a]:w-full [&_a]:rounded-full [&_a]:px-4 [&_a]:text-sm [&_a]:font-bold">
                    <Button href={whatsappHref}>
                      <span className="inline-flex items-center gap-2">
                        <MessageCircle
                          aria-hidden="true"
                          className="h-4 w-4"
                          strokeWidth={2}
                        />
                        Chat
                      </span>
                    </Button>
                  </div>

                  <div className="[&_a]:h-13 [&_a]:w-full [&_a]:rounded-full [&_a]:px-4 [&_a]:text-sm [&_a]:font-bold">
                    <Button href={phoneHref} variant="secondary">
                      <span className="inline-flex items-center gap-2">
                        <Phone
                          aria-hidden="true"
                          className="h-4 w-4"
                          strokeWidth={2}
                        />
                        Call
                      </span>
                    </Button>
                  </div>

                  <Link
                    href={settings.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View Bunny Pets Zone on Google Maps"
                    className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-[#ECECEC] bg-white/64 px-4 text-sm font-bold text-[#2F2017] shadow-xl shadow-[#2F2017]/5 outline-none backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-[#D59A3A]/45 hover:text-[#D59A3A] focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0]"
                  >
                    Maps
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4"
                      strokeWidth={2}
                    />
                  </Link>
                </div>
              </div>
            </motion.article>

            <motion.section
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              aria-labelledby="map-heading"
              className="relative overflow-hidden rounded-[2.25rem] border border-[#ECECEC] bg-white/58 p-3 shadow-[0_26px_80px_rgba(47,32,23,0.10)] backdrop-blur-2xl"
            >
              <h2 id="map-heading" className="sr-only">
                Google Map location for {settings.businessName}
              </h2>

              <div className="overflow-hidden rounded-[1.85rem] bg-[#FFF8F0]">
                <iframe
                  title={`${settings.businessName} location map`}
                  src={mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[420px] w-full border-0 sm:h-[520px] lg:h-[650px]"
                  aria-label={`${settings.businessName} map showing ${settings.address}`}
                />
              </div>
            </motion.section>
          </div>

          <motion.section
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            aria-labelledby="visit-store-heading"
            className="mt-20 overflow-hidden rounded-[2.25rem] border border-[#ECECEC] bg-white/58 p-8 text-center shadow-[0_26px_80px_rgba(47,32,23,0.10)] backdrop-blur-2xl sm:p-10 lg:p-12"
          >
            <h2
              id="visit-store-heading"
              className="font-[Poppins] text-3xl font-bold tracking-tight text-[#2F2017] sm:text-4xl"
            >
              We'd Love to Meet You
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#5B4A3F] sm:text-lg">
              Visit {settings.businessName} today and discover healthy,
              well-cared-for pets waiting for their forever home.
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
          </motion.section>
        </Container>
      </section>
    </main>
  );
}