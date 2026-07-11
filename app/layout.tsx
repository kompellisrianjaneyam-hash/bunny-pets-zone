import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://bunny-pets-zone.vercel.app";

const petStoreJsonLd = {
  "@context": "https://schema.org",
  "@type": "PetStore",
  "@id": `${siteUrl}/#petstore`,
  name: "Bunny Pets Zone",
  url: siteUrl,
  logo: `${siteUrl}/logos/bunny-pets-zone-logo.png`,
  image: `${siteUrl}/logos/bunny-pets-zone-logo.png`,
  telephone: "+91-7680904157",
  description:
    "Bunny Pets Zone is a pet store in Kondapur, Hyderabad offering healthy dogs, cats, birds and hamsters.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kondapur",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "22:00",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Bunny Pets Zone | Pet Store in Kondapur, Hyderabad",
    template: "%s | Bunny Pets Zone",
  },

  description:
    "Bunny Pets Zone is a trusted pet store in Kondapur, Hyderabad offering healthy dogs, cats, birds and hamsters. Explore available pets and find your new companion.",

  keywords: [
    "Bunny Pets Zone",
    "pet store in Kondapur",
    "pet store in Hyderabad",
    "pets in Kondapur",
    "pets in Hyderabad",
    "puppies in Hyderabad",
    "dogs in Hyderabad",
    "cats in Hyderabad",
    "birds in Hyderabad",
    "hamsters in Hyderabad",
    "pet shop in Kondapur",
    "pet shop in Hyderabad",
    "healthy pets Hyderabad",
  ],

  applicationName: "Bunny Pets Zone",

  authors: [
    {
      name: "Bunny Pets Zone",
      url: siteUrl,
    },
  ],

  creator: "Bunny Pets Zone",
  publisher: "Bunny Pets Zone",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Bunny Pets Zone",
    title: "Bunny Pets Zone | Pet Store in Kondapur, Hyderabad",
    description:
      "Explore healthy dogs, cats, birds and hamsters at Bunny Pets Zone in Kondapur, Hyderabad. Find your new companion.",
    images: [
      {
        url: "/logos/bunny-pets-zone-logo.png",
        width: 512,
        height: 512,
        alt: "Bunny Pets Zone - Pet Store in Kondapur, Hyderabad",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Bunny Pets Zone | Pet Store in Kondapur, Hyderabad",
    description:
      "Explore healthy pets at Bunny Pets Zone in Kondapur, Hyderabad and find your new companion.",
    images: ["/logos/bunny-pets-zone-logo.png"],
  },

  icons: {
    icon: "/logos/bunny-pets-zone-logo.png",
    shortcut: "/logos/bunny-pets-zone-logo.png",
    apple: "/logos/bunny-pets-zone-logo.png",
  },

  category: "Pet Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(petStoreJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}