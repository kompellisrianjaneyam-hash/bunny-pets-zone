"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type NavItem = {
  label: string;
  href: string;
};

const navItems = [
  { label: "Home", href: "/" },
  { label: "Pets", href: "/pets" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const phoneHref = "tel:7680904157";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const updateHash = () => setActiveHash(window.location.hash);

    updateHash();
    window.addEventListener("hashchange", updateHash);

    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const activeHref = useMemo(() => {
    if (pathname === "/" && activeHash) {
      return `/${activeHash}`;
    }

    return pathname === "/" ? "/" : pathname;
  }, [activeHash, pathname]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Primary navigation"
          className="mx-auto flex h-20 max-w-7xl items-center justify-between rounded-[2rem] border border-[#ECECEC] bg-white/78 px-4 shadow-[0_18px_60px_rgba(47,32,23,0.10)] backdrop-blur-xl transition-all duration-300 sm:px-6 lg:px-7"
        >
          <Link
            href="/"
            aria-label="Bunny Pets Zone home"
            onClick={closeMenu}
            className="flex min-w-0 items-center gap-3 rounded-2xl outline-none transition duration-300 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0]"
          >
            <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#ECECEC] sm:h-14 sm:w-14">
              <Image
                src="/logos/bunny-pets-zone-logo.png"
                alt="Bunny Pets Zone logo"
                fill
                priority
                sizes="56px"
                className="object-contain p-1"
              />
            </span>

            <span className="hidden min-w-0 flex-col sm:flex">
              <span className="truncate text-base font-bold leading-tight text-[#2F2017]">
                Bunny Pets Zone
              </span>
              <span className="truncate text-xs font-semibold leading-tight text-[#5B4A3F]/75">
                Kondapur, Hyderabad
              </span>
            </span>
          </Link>

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 lg:flex">
            {navItems.map((item) => {
              const active = activeHref === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "group relative rounded-full py-2 text-sm font-semibold outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-white",
                    active
                      ? "text-[#D59A3A]"
                      : "text-[#2F2017] hover:text-[#D59A3A]",
                  ].join(" ")}
                >
                  {item.label}
                  <span
                    className={[
                      "absolute -bottom-1 left-1/2 h-1 rounded-full bg-[#D59A3A] transition-all duration-300",
                      active
                        ? "w-5 -translate-x-1/2 opacity-100"
                        : "w-0 -translate-x-1/2 opacity-0 group-hover:w-5 group-hover:opacity-100",
                    ].join(" ")}
                  />
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={phoneHref}
              aria-label="Call Bunny Pets Zone"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#D59A3A] px-4 text-sm font-bold text-white shadow-[0_12px_30px_rgba(213,154,58,0.26)] outline-none transition duration-300 hover:-translate-y-0.5 hover:bg-[#c68b31] hover:shadow-[0_16px_38px_rgba(213,154,58,0.32)] focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-white sm:px-5"
            >
              <Phone aria-hidden="true" className="h-4 w-4" strokeWidth={2.2} />
              <span className="hidden sm:inline">Call Now</span>
            </Link>

            <button
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-controls="mobile-navigation"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((current) => !current)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ECECEC] bg-white/72 text-[#2F2017] shadow-sm outline-none transition duration-300 hover:text-[#D59A3A] focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-white lg:hidden"
            >
              {isMenuOpen ? (
                <X aria-hidden="true" className="h-5 w-5" strokeWidth={2.2} />
              ) : (
                <Menu
                  aria-hidden="true"
                  className="h-5 w-5"
                  strokeWidth={2.2}
                />
              )}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close mobile navigation overlay"
              className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[2px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />

            <motion.aside
              id="mobile-navigation"
              aria-label="Mobile navigation"
              className="fixed bottom-4 right-4 top-4 z-50 flex w-[min(calc(100vw-2rem),380px)] flex-col overflow-hidden rounded-[2rem] border border-[#ECECEC] bg-[#FFF8F0]/92 p-5 shadow-[0_24px_80px_rgba(47,32,23,0.18)] backdrop-blur-2xl lg:hidden"
              initial={{ opacity: 0, x: 36, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 36, scale: 0.98 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between gap-4">
                <Link
                  href="/"
                  aria-label="Bunny Pets Zone home"
                  onClick={closeMenu}
                  className="flex min-w-0 items-center gap-3 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0]"
                >
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#ECECEC]">
                    <Image
                      src="/logos/bunny-pets-zone-logo.png"
                      alt="Bunny Pets Zone logo"
                      fill
                      sizes="48px"
                      className="object-contain p-1"
                    />
                  </span>

                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold leading-tight text-[#2F2017]">
                      Bunny Pets Zone
                    </span>
                    <span className="block truncate text-xs font-semibold leading-tight text-[#5B4A3F]/75">
                      Kondapur, Hyderabad
                    </span>
                  </span>
                </Link>

                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={closeMenu}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#ECECEC] bg-white/72 text-[#2F2017] outline-none transition duration-300 hover:text-[#D59A3A] focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0]"
                >
                  <X aria-hidden="true" className="h-5 w-5" strokeWidth={2.2} />
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-2" aria-label="Mobile menu links">
                {navItems.map((item, index) => {
                  const active = activeHref === item.href;

                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.22,
                        delay: 0.06 + index * 0.04,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        aria-current={active ? "page" : undefined}
                        className={[
                          "flex h-14 items-center justify-between rounded-2xl px-5 text-base font-bold outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0]",
                          active
                            ? "bg-white/80 text-[#D59A3A] shadow-sm"
                            : "text-[#2F2017] hover:bg-white/64 hover:text-[#D59A3A]",
                        ].join(" ")}
                      >
                        <span>{item.label}</span>
                        <span
                          className={[
                            "h-2 w-2 rounded-full transition",
                            active ? "bg-[#D59A3A]" : "bg-transparent",
                          ].join(" ")}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mt-auto pt-8">
                <Link
                  href={phoneHref}
                  aria-label="Call Bunny Pets Zone"
                  onClick={closeMenu}
                  className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#D59A3A] px-6 text-base font-bold text-white shadow-[0_16px_38px_rgba(213,154,58,0.28)] outline-none transition duration-300 hover:-translate-y-0.5 hover:bg-[#c68b31] focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0]"
                >
                  <Phone
                    aria-hidden="true"
                    className="h-5 w-5"
                    strokeWidth={2.2}
                  />
                  <span>Call Now</span>
                </Link>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}