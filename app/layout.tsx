import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";

export const metadata: Metadata = {
  title: "Bunny Pets Zone",
  description: "Premium Pet Store in Hyderabad",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#FFF8F0] text-[#2F2017] antialiased">
        <Navbar />

        {/* Offset for the fixed navbar */}
        <main className="pt-24 lg:pt-28">
          {children}
        </main>

        <Footer />

        <FloatingActions />
      </body>
    </html>
  );
}