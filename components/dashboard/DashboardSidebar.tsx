"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ImageIcon,
  LoaderCircle,
  LogOut,
  Menu,
  PawPrint,
  Settings,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  useEffect,
  useState,
  type ComponentType,
} from "react";

import { createClient } from "@/lib/supabase/client";

type NavigationItem = {
  label: string;
  href: string;
  icon: ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;
};

const navigationItems: NavigationItem[] = [
  {
    label: "Pets",
    href: "/admin/pets",
    icon: PawPrint,
  },
  {
    label: "Gallery",
    href: "/admin/gallery",
    icon: ImageIcon,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

const drawerVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -28,
    scale: 0.98,
  },

  visible: {
    opacity: 1,
    x: 0,
    scale: 1,

    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  exit: {
    opacity: 0,
    x: -28,
    scale: 0.98,

    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const navItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -10,
  },

  visible: (index: number) => ({
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.26,
      delay: index * 0.045,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function SidebarContent({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signOut({
        scope: "local",
      });

      if (error) {
        console.error("Logout error:", error);
        setIsLoggingOut(false);
        return;
      }

      onNavigate?.();

      router.replace("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Unexpected logout error:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#ECECEC] bg-white/62 p-4 shadow-[0_24px_80px_rgba(47,32,23,0.10)] backdrop-blur-2xl">
      <Link
        href="/admin"
        onClick={onNavigate}
        aria-label="Bunny Pets Zone dashboard home"
        className="flex items-center gap-3 rounded-[1.5rem] p-3 outline-none transition duration-300 hover:bg-[#FFF8F0]/70 focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-white"
      >
        <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-[#ECECEC] bg-white shadow-lg shadow-[#2F2017]/5">
          <Image
            src="/logos/bunny-pets-zone-logo.png"
            alt="Bunny Pets Zone logo"
            fill
            priority
            sizes="56px"
            className="object-contain p-1"
          />
        </span>

        <span className="min-w-0">
          <span className="block truncate font-[Poppins] text-base font-bold leading-tight text-[#2F2017]">
            Bunny Pets Zone
          </span>

          <span className="mt-1 block truncate text-xs font-semibold text-[#5B4A3F]">
            Admin Dashboard
          </span>
        </span>
      </Link>

      <nav
        aria-label="Dashboard navigation"
        className="mt-8 space-y-2"
      >
        {navigationItems.map((item, index) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <motion.div
              key={item.href}
              custom={index}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
            >
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "group flex h-13 items-center gap-3 rounded-[1.35rem] px-4 text-sm font-bold outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-white",

                  isActive
                    ? "bg-[#D59A3A] text-white shadow-xl shadow-[#D59A3A]/20"
                    : "text-[#5B4A3F] hover:bg-[#FFF8F0]/80 hover:text-[#D59A3A]",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex h-9 w-9 items-center justify-center rounded-2xl transition duration-300",

                    isActive
                      ? "bg-white/18 text-white"
                      : "bg-[#D59A3A]/10 text-[#D59A3A] group-hover:scale-105",
                  ].join(" ")}
                >
                  <Icon
                    aria-hidden="true"
                    className="h-5 w-5"
                    strokeWidth={2}
                  />
                </span>

                <span>{item.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <div className="mt-auto pt-6">
        <button
          type="button"
          aria-label={isLoggingOut ? "Logging out" : "Logout"}
          disabled={isLoggingOut}
          onClick={handleLogout}
          className="group flex h-13 w-full items-center gap-3 rounded-[1.35rem] border border-[#ECECEC] bg-white/58 px-4 text-sm font-bold text-[#5B4A3F] shadow-lg shadow-[#2F2017]/5 outline-none backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-[#D59A3A]/45 hover:text-[#D59A3A] focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-white disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#D59A3A]/10 text-[#D59A3A] transition duration-300 group-hover:scale-105">
            {isLoggingOut ? (
              <LoaderCircle
                aria-hidden="true"
                className="h-5 w-5 animate-spin"
                strokeWidth={2}
              />
            ) : (
              <LogOut
                aria-hidden="true"
                className="h-5 w-5"
                strokeWidth={2}
              />
            )}
          </span>

          <span>
            {isLoggingOut ? "Logging out..." : "Logout"}
          </span>
        </button>
      </div>
    </div>
  );
}

export default function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );

      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[280px] bg-[#FFF8F0] p-4 lg:block">
        <SidebarContent />
      </aside>

      <div className="fixed inset-x-0 top-0 z-40 border-b border-[#ECECEC] bg-[#FFF8F0]/82 px-4 py-3 shadow-lg shadow-[#2F2017]/5 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            aria-label="Bunny Pets Zone dashboard home"
            className="flex items-center gap-3 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0]"
          >
            <span className="relative h-11 w-11 overflow-hidden rounded-2xl border border-[#ECECEC] bg-white shadow-sm">
              <Image
                src="/logos/bunny-pets-zone-logo.png"
                alt="Bunny Pets Zone logo"
                fill
                priority
                sizes="44px"
                className="object-contain p-1"
              />
            </span>

            <span>
              <span className="block text-sm font-bold leading-tight text-[#2F2017]">
                Bunny Pets Zone
              </span>

              <span className="block text-xs font-semibold leading-tight text-[#5B4A3F]">
                Admin Dashboard
              </span>
            </span>
          </Link>

          <button
            type="button"
            aria-label="Open dashboard menu"
            aria-expanded={isOpen}
            aria-controls="dashboard-mobile-sidebar"
            onClick={() => setIsOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ECECEC] bg-white/72 text-[#2F2017] shadow-sm outline-none transition duration-300 hover:text-[#D59A3A] focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0]"
          >
            <Menu
              aria-hidden="true"
              className="h-5 w-5"
              strokeWidth={2.2}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close dashboard menu overlay"
              className="fixed inset-0 z-50 bg-black/18 backdrop-blur-sm lg:hidden"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() => setIsOpen(false)}
            />

            <motion.aside
              id="dashboard-mobile-sidebar"
              aria-label="Mobile dashboard sidebar"
              className="fixed bottom-4 left-4 top-4 z-[60] w-[min(calc(100vw-2rem),320px)] lg:hidden"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="relative h-full">
                <button
                  type="button"
                  aria-label="Close dashboard menu"
                  onClick={() => setIsOpen(false)}
                  className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#ECECEC] bg-white/82 text-[#2F2017] shadow-sm outline-none transition duration-300 hover:text-[#D59A3A] focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-white"
                >
                  <X
                    aria-hidden="true"
                    className="h-5 w-5"
                    strokeWidth={2.2}
                  />
                </button>

                <SidebarContent
                  onNavigate={() => setIsOpen(false)}
                />
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}