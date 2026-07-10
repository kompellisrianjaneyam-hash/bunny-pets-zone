"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const settings = {
  businessName: "Bunny Pets Zone",
  address: "Kondapur, Hyderabad",
  phone: "7680904157",
  logo: "/logos/bunny-pets-zone-logo.png",
};

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Pets", href: "/pets" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const navbarVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const mobileMenuVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.32,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.055,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function classNames(...classes: Array<string | false>) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <motion.header
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className="fixed left-0 right-0 top-0 z-50"
    >
      <motion.nav
        variants={itemVariants}
        aria-label="Primary navigation"
        className={classNames(
          "relative w-full overflow-hidden border-b px-4 py-3 shadow-[0_18px_70px_rgba(47,32,23,0.10)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 sm:px-6 lg:px-8",
          isScrolled
            ? "border-white/75 bg-white/82 shadow-[0_22px_86px_rgba(47,32,23,0.16)]"
            : "border-white/55 bg-white/56 shadow-[0_16px_64px_rgba(47,32,23,0.10)]",
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/58 via-white/18 to-[#D59A3A]/10" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D59A3A]/18 to-transparent" />
        <div className="pointer-events-none absolute -left-20 top-1/2 h-32 w-72 -translate-y-1/2 rounded-full bg-white/34 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-1/2 h-32 w-72 -translate-y-1/2 rounded-full bg-[#D59A3A]/12 blur-3xl" />

        <div className="relative mx-auto flex h-[70px] w-full items-center justify-between gap-8">
          <motion.div
            variants={itemVariants}
            className="flex min-w-0 flex-1 justify-start"
          >
            <Link
              href="/"
              aria-label="Bunny Pets Zone home"
              className="group flex min-w-0 items-center gap-3 rounded-full outline-none transition duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0]"
            >
              <span className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/85 bg-white/72 shadow-xl shadow-[#D59A3A]/12 ring-1 ring-[#D59A3A]/8 transition duration-300 group-hover:scale-105 group-hover:shadow-[#D59A3A]/22">
                <Image
                  src={settings.logo}
                  alt={`${settings.businessName} logo`}
                  width={52}
                  height={52}
                  priority
                  className="h-full w-full object-cover"
                />
              </span>

              <span className="hidden min-w-0 leading-none sm:block">
                <span className="block truncate font-[Poppins] text-[15px] font-bold tracking-tight text-[#2F2017]">
                  {settings.businessName}
                </span>
                <span className="mt-1.5 block truncate font-[Inter] text-[11px] font-semibold tracking-[0.01em] text-[#5B4A3F]/78">
                  {settings.address}
                </span>
              </span>
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="hidden items-center justify-center gap-1 rounded-full border border-white/60 bg-white/42 p-1.5 shadow-inner shadow-white/60 backdrop-blur-2xl lg:flex"
          >
            {navLinks.map((link) => {
              const isActive = isActivePath(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                    className={classNames(
                    "group relative inline-flex h-10 items-center justify-center rounded-full px-5 font-[Inter] text-[13px] font-bold tracking-tight outline-none transition duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0]",
                    isActive
                      ? "bg-[#D59A3A]/13 text-[#D59A3A] shadow-lg shadow-[#D59A3A]/10"
                      : "text-[#2F2017]/82 hover:text-[#D59A3A]",
                  )}
                >
                  <span>{link.label}</span>
                  <span
                    className={classNames(
                      "absolute bottom-1.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-[#D59A3A] transition-all duration-300",
                      isActive ? "w-5" : "w-0 group-hover:w-5",
                    )}
                  />
                </Link>
              );
            })}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="hidden flex-1 justify-end pr-1 lg:flex"
          >
            <a
              href={`tel:${settings.phone}`}
              className="group relative inline-flex h-11 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#D59A3A] via-[#E7B85C] to-[#C6852F] px-5 font-[Inter] text-[13px] font-bold text-white shadow-xl shadow-[#D59A3A]/25 outline-none transition duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#D59A3A]/35 focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0]"
            >
              <span className="absolute inset-x-0 top-0 h-1/2 bg-white/20 opacity-80 transition duration-300 group-hover:opacity-100" />
              <span className="absolute -left-8 top-0 h-full w-6 rotate-12 bg-white/30 blur-sm transition duration-700 group-hover:left-[120%]" />
              <Phone
                aria-hidden="true"
                className="relative h-4 w-4"
                strokeWidth={2.2}
              />
              <span className="relative">Call Now</span>
            </a>
          </motion.div>

          <motion.button
            variants={itemVariants}
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/58 text-[#2F2017] shadow-lg shadow-[#2F2017]/5 outline-none backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:text-[#D59A3A] focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0] lg:hidden"
          >
            {isMobileMenuOpen ? (
              <X aria-hidden="true" className="h-5 w-5" strokeWidth={2.2} />
            ) : (
              <Menu
                aria-hidden="true"
                className="h-5 w-5"
                strokeWidth={2.2}
              />
            )}
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mx-4 mt-3 overflow-hidden rounded-[2rem] border border-white/65 bg-white/82 p-3 shadow-[0_28px_90px_rgba(47,32,23,0.18)] backdrop-blur-2xl backdrop-saturate-150 sm:mx-6 lg:hidden"
          >
            <div className="grid gap-1">
              {navLinks.map((link) => {
                const isActive = isActivePath(pathname, link.href);

                return (
                  <motion.div key={link.href} variants={itemVariants}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={classNames(
                        "flex h-12 items-center rounded-2xl px-4 font-[Inter] text-sm font-bold outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-white",
                        isActive
                          ? "bg-[#D59A3A]/12 text-[#D59A3A]"
                          : "text-[#2F2017] hover:bg-[#FFF8F0]/80 hover:text-[#D59A3A]",
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div variants={itemVariants} className="pt-2">
                <a
                  href={`tel:${settings.phone}`}
                  className="group relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#D59A3A] via-[#E7B85C] to-[#C6852F] px-6 font-[Inter] text-sm font-bold text-white shadow-xl shadow-[#D59A3A]/25 outline-none transition duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-[#D59A3A]/35 focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-white"
                >
                  <span className="absolute inset-x-0 top-0 h-1/2 bg-white/20 opacity-80 transition duration-300 group-hover:opacity-100" />
                  <Phone
                    aria-hidden="true"
                    className="relative h-4 w-4"
                    strokeWidth={2.2}
                  />
                  <span className="relative">Call Now</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}