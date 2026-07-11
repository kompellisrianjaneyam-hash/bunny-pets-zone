import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bunny Pets Zone | Premium Pet Store in Hyderabad",
  description:
    "Bunny Pets Zone is a trusted pet store in Kondapur, Hyderabad offering healthy dogs, cats, birds and hamsters.",

  icons: {
    icon: "/logos/bunny-pets-zone-logo.png",
    shortcut: "/logos/bunny-pets-zone-logo.png",
    apple: "/logos/bunny-pets-zone-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}