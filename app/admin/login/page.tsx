"use client";

import { motion, type Variants } from "framer-motion";
import { AlertCircle, Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.62,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

const supabase = useMemo(() => createClient(), []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    if (!email.trim()) {
      setErrorMessage("Please enter your admin email address.");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message || "Login failed. Please try again.");
      return;
    }

    router.replace("/admin");
    router.refresh();
  };

  return (
    <main className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden bg-[#FFF8F0] px-4 py-10 font-[Inter] sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(213,154,58,0.16),transparent_30%),radial-gradient(circle_at_84%_22%,rgba(255,214,153,0.34),transparent_30%),radial-gradient(circle_at_50%_92%,rgba(213,154,58,0.10),transparent_36%),linear-gradient(180deg,#FFF8F0_0%,#FFF3E6_52%,#FFF8F0_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(213,154,58,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(213,154,58,0.045)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_72%)]" />
        <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-[#D59A3A]/10 blur-3xl" />
        <div className="absolute -right-32 top-36 h-96 w-96 rounded-full bg-orange-200/45 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-amber-100/65 blur-3xl" />
      </div>

      <motion.section
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        aria-labelledby="admin-login-heading"
        className="relative w-full max-w-md overflow-hidden rounded-[2.25rem] border border-[#ECECEC] bg-white/62 p-6 shadow-[0_28px_90px_rgba(47,32,23,0.12)] backdrop-blur-2xl sm:p-8"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D59A3A]/12 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-orange-200/38 blur-3xl" />

        <div className="relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="relative h-24 w-24 overflow-hidden rounded-[1.75rem] border border-[#ECECEC] bg-white shadow-xl shadow-[#2F2017]/5">
              <Image
                src="/logos/bunny-pets-zone-logo.png"
                alt="Bunny Pets Zone logo"
                fill
                priority
                sizes="96px"
                className="object-contain p-2"
              />
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#ECECEC] bg-[#FFF8F0]/72 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D59A3A] shadow-lg shadow-[#D59A3A]/5 backdrop-blur-xl">
              <ShieldCheck
                aria-hidden="true"
                className="h-4 w-4"
                strokeWidth={2}
              />
              <span>Admin Dashboard</span>
            </div>

            <h1
              id="admin-login-heading"
              className="mt-5 font-[Poppins] text-3xl font-bold tracking-tight text-[#2F2017] sm:text-4xl"
            >
              Welcome Back
            </h1>

            <p className="mt-3 max-w-sm text-sm leading-6 text-[#5B4A3F]">
              Sign in securely to manage Bunny Pets Zone pets, gallery and store
              settings.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-bold text-[#2F2017]"
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#D59A3A]"
                  strokeWidth={2}
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@example.com"
                  className="h-14 w-full rounded-2xl border border-[#ECECEC] bg-white/72 pl-12 pr-4 text-base font-semibold text-[#2F2017] shadow-lg shadow-[#2F2017]/5 outline-none backdrop-blur-xl transition duration-300 placeholder:text-[#5B4A3F]/45 focus:border-[#D59A3A] focus:ring-2 focus:ring-[#D59A3A]/20"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-[#2F2017]"
                >
                  Password
                </label>
                <Link
                  href="/admin/forgot-password"
                  className="rounded-full text-sm font-bold text-[#D59A3A] outline-none transition duration-300 hover:underline focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0]"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="relative">
                <Lock
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#D59A3A]"
                  strokeWidth={2}
                />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                  className="h-14 w-full rounded-2xl border border-[#ECECEC] bg-white/72 pl-12 pr-14 text-base font-semibold text-[#2F2017] shadow-lg shadow-[#2F2017]/5 outline-none backdrop-blur-xl transition duration-300 placeholder:text-[#5B4A3F]/45 focus:border-[#D59A3A] focus:ring-2 focus:ring-[#D59A3A]/20"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-[#5B4A3F] outline-none transition duration-300 hover:bg-[#FFF8F0] hover:text-[#D59A3A] focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  {showPassword ? (
                    <EyeOff
                      aria-hidden="true"
                      className="h-5 w-5"
                      strokeWidth={2}
                    />
                  ) : (
                    <Eye
                      aria-hidden="true"
                      className="h-5 w-5"
                      strokeWidth={2}
                    />
                  )}
                </button>
              </div>
            </div>

            {errorMessage ? (
              <div
                role="alert"
                className="flex gap-3 rounded-2xl border border-red-200 bg-red-50/80 p-4 text-sm font-semibold leading-6 text-red-700 shadow-lg shadow-red-900/5"
              >
                <AlertCircle
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 shrink-0"
                  strokeWidth={2}
                />
                <span>{errorMessage}</span>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex h-14 w-full items-center justify-center rounded-full bg-[#D59A3A] px-8 text-base font-bold text-white shadow-xl shadow-[#D59A3A]/20 outline-none transition duration-300 hover:-translate-y-0.5 hover:bg-[#c68b31] hover:shadow-2xl hover:shadow-[#D59A3A]/25 focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0] disabled:pointer-events-none disabled:opacity-70"
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-3">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/35 border-t-white" />
                  Signing in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </motion.section>
    </main>
  );
}