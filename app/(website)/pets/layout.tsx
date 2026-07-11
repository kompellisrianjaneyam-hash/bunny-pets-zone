import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Available Pets in Hyderabad | Dogs, Cats, Birds & Hamsters",

  description:
    "Explore available dogs, cats, birds and hamsters at Bunny Pets Zone in Kondapur, Hyderabad. Browse healthy pets and enquire directly on WhatsApp.",

  keywords: [
    "available pets in Hyderabad",
    "pets for sale in Hyderabad",
    "pet store in Kondapur",
    "pet shop in Hyderabad",
    "puppies in Hyderabad",
    "dogs in Hyderabad",
    "cats in Hyderabad",
    "birds in Hyderabad",
    "hamsters in Hyderabad",
    "Bunny Pets Zone pets",
    "healthy pets Hyderabad",
  ],

  alternates: {
    canonical: "/pets",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/pets",
    siteName: "Bunny Pets Zone",
    title:
      "Available Pets in Hyderabad | Dogs, Cats, Birds & Hamsters",
    description:
      "Browse healthy dogs, cats, birds and hamsters available at Bunny Pets Zone in Kondapur, Hyderabad.",
    images: [
      {
        url: "/logos/bunny-pets-zone-logo.png",
        width: 512,
        height: 512,
        alt: "Available Pets at Bunny Pets Zone in Hyderabad",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Available Pets in Hyderabad | Bunny Pets Zone",
    description:
      "Browse dogs, cats, birds and hamsters at Bunny Pets Zone in Kondapur, Hyderabad.",
    images: ["/logos/bunny-pets-zone-logo.png"],
  },
};

export default function PetsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}