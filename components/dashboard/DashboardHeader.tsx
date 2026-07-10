"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

type DashboardHeaderProps = {
  title: string;
};

export default function DashboardHeader({
  title,
}: DashboardHeaderProps) {
  const [today, setToday] = useState("");
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const now = new Date();

    setToday(
      new Intl.DateTimeFormat("en-IN", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(now)
    );

    setDateTime(now.toISOString());
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
     className="ml-0 rounded-[2rem] border border-[#ECECEC] bg-white/64 px-5 py-5 shadow-[0_18px_60px_rgba(47,32,23,0.08)] backdrop-blur-2xl sm:px-6 lg:px-7"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-bold text-[#D59A3A]">
            Bunny Pets Zone Admin
          </p>

          <h1 className="mt-1 truncate font-[Poppins] text-2xl font-bold tracking-tight text-[#2F2017] sm:text-3xl">
            {title}
          </h1>
        </div>

        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <div className="inline-flex h-12 items-center gap-2 rounded-full border border-[#ECECEC] bg-[#FFF8F0]/70 px-4 text-sm font-semibold text-[#5B4A3F] shadow-lg shadow-[#2F2017]/5 backdrop-blur-xl">
            <CalendarDays
              className="h-4 w-4 text-[#D59A3A]"
              strokeWidth={2}
            />

            {today && (
              <time dateTime={dateTime}>
                {today}
              </time>
            )}
          </div>

          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#ECECEC] bg-[#D59A3A] font-[Poppins] text-base font-bold text-white shadow-lg shadow-[#D59A3A]/20"
            aria-label="Admin profile"
          >
            A
          </div>
        </div>
      </div>
    </motion.header>
  );
}