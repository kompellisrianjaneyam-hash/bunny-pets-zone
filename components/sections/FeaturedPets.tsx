"use client";

import { motion, type Variants } from "framer-motion";
import {
  BadgeCheck,
  Cat,
  Dog,
  Feather,
  Heart,
  MessageCircle,
  PawPrint,
  Phone,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";

import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { getAllPets, type Pet } from "@/lib/pets";

const settings = {
  phone: "7680904157",
  whatsapp: "7680904157",
};

const categoryIcons: Record<Pet["category"], typeof PawPrint> = {
  Dog,
  Cat,
  Bird: Feather,
  Hamster: PawPrint,
};

const statusLabels: Record<Pet["status"], string> = {
  available: "Available",
  sold_out: "Sold Out",
  coming_soon: "Coming Soon",
};

const statusStyles: Record<Pet["status"], string> = {
  available:
    "border-emerald-200/80 bg-emerald-50/78 text-emerald-700 shadow-emerald-900/5",
  sold_out: "border-red-200/80 bg-red-50/78 text-red-700 shadow-red-900/5",
  coming_soon:
    "border-amber-200/80 bg-amber-50/78 text-amber-700 shadow-amber-900/5",
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
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
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function formatPrice(price: number | null) {
  if (price === null) {
    return "Contact for price";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function FeaturedPets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPets() {
      try {
        setLoading(true);
        setError(null);

        const data = await getAllPets();

        if (isMounted) {
          setPets(
            (data ?? [])
              .filter(
                (pet) =>
                  pet.featured_homepage === true &&
                  pet.show_on_website === true,
              )
              .slice(0, 4),
          );
        }
      } catch (err) {
        console.error("Error loading featured pets:", err);

        if (isMounted) {
          setError("Unable to load featured pets right now.");
          setPets([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadPets();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="pets"
      aria-labelledby="featured-pets-heading"
      className="relative isolate overflow-hidden bg-[#FFF8F0] px-4 py-20 font-[Inter] sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(213,154,58,0.13),transparent_30%),radial-gradient(circle_at_84%_18%,rgba(255,214,153,0.30),transparent_28%),radial-gradient(circle_at_50%_92%,rgba(255,255,255,0.70),transparent_32%),linear-gradient(180deg,#FFF8F0_0%,#FFF3E6_52%,#FFF8F0_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(213,154,58,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(213,154,58,0.035)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_72%)]" />
        <div className="absolute -left-28 top-16 h-80 w-80 rounded-full bg-[#D59A3A]/10 blur-3xl" />
        <div className="absolute -right-28 bottom-10 h-96 w-96 rounded-full bg-orange-200/42 blur-3xl" />
      </div>

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            variants={fadeUpVariants}
            className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/54 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D59A3A] shadow-lg shadow-[#D59A3A]/5 backdrop-blur-2xl"
          >
            <Sparkles aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
            <span>Meet Your New Best Friend</span>
          </motion.div>

          <motion.h2
            id="featured-pets-heading"
            variants={fadeUpVariants}
            className="mt-7 text-balance font-[Poppins] text-4xl font-bold leading-tight tracking-tight text-[#2F2017] sm:text-5xl lg:text-6xl"
          >
            Featured Pets
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="mx-auto mt-5 max-w-[600px] text-pretty text-lg leading-8 text-[#5B4A3F] sm:text-xl"
          >
            Discover loving companions waiting to become part of your family.
          </motion.p>
        </motion.div>

        {loading ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {Array.from({ length: 3 }).map((_, index) => (
              <motion.article
                key={index}
                variants={cardVariants}
                className="relative overflow-hidden rounded-[2.25rem] border border-white/60 bg-white/52 p-2 shadow-[0_24px_80px_rgba(47,32,23,0.10)] backdrop-blur-2xl"
              >
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />
                <div className="aspect-[5/4] animate-pulse rounded-[1.8rem] bg-[#D59A3A]/10" />
                <div className="p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="h-8 w-28 animate-pulse rounded-full bg-[#D59A3A]/10" />
                    <div className="h-8 w-8 animate-pulse rounded-full bg-[#D59A3A]/10" />
                  </div>
                  <div className="mt-5 h-8 w-4/5 animate-pulse rounded-full bg-[#D59A3A]/10" />
                  <div className="mt-4 h-12 w-full animate-pulse rounded-2xl bg-[#D59A3A]/10" />
                  <div className="mt-5 grid gap-3">
                    <div className="h-4 w-full animate-pulse rounded-full bg-[#D59A3A]/10" />
                    <div className="h-4 w-4/5 animate-pulse rounded-full bg-[#D59A3A]/10" />
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="h-12 animate-pulse rounded-full bg-[#D59A3A]/10" />
                    <div className="h-12 animate-pulse rounded-full bg-[#D59A3A]/10" />
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        ) : error ? (
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mx-auto mt-14 max-w-2xl rounded-[2.25rem] border border-white/60 bg-white/56 p-10 text-center shadow-[0_24px_80px_rgba(47,32,23,0.10)] backdrop-blur-2xl"
          >
            <PawPrint
              aria-hidden="true"
              className="mx-auto h-10 w-10 text-[#D59A3A]"
              strokeWidth={1.8}
            />
            <p className="mt-5 font-[Poppins] text-2xl font-bold text-[#2F2017]">
              Featured pets unavailable
            </p>
            <p className="mx-auto mt-3 max-w-md text-base leading-7 text-[#5B4A3F]">
              {error}
            </p>
          </motion.div>
        ) : pets.length === 0 ? (
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mx-auto mt-14 max-w-2xl rounded-[2.25rem] border border-white/60 bg-white/56 p-10 text-center shadow-[0_24px_80px_rgba(47,32,23,0.10)] backdrop-blur-2xl"
          >
            <PawPrint
              aria-hidden="true"
              className="mx-auto h-10 w-10 text-[#D59A3A]"
              strokeWidth={1.8}
            />
            <p className="mt-5 font-[Poppins] text-2xl font-bold text-[#2F2017]">
              No featured pets available.
            </p>
            <p className="mx-auto mt-3 max-w-md text-base leading-7 text-[#5B4A3F]">
              Please check back soon to meet our lovely pets.
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {pets.map((pet) => {
              const CategoryIcon = categoryIcons[pet.category] ?? PawPrint;
              const imageSrc = pet.images?.[0] ?? "/images/pet-placeholder.jpg";
              const whatsappMessage = `Hi Bunny Pets Zone, I'm interested in ${pet.name}`;
              const whatsappHref = `https://wa.me/91${
                settings.whatsapp
              }?text=${encodeURIComponent(whatsappMessage)}`;

              return (
                <motion.article
                  key={pet.id}
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  className="group relative overflow-hidden rounded-[2.25rem] border border-white/60 bg-white/52 p-2 shadow-[0_24px_80px_rgba(47,32,23,0.10)] backdrop-blur-2xl transition duration-300 hover:border-[#D59A3A]/45 hover:bg-white/64 hover:shadow-[0_30px_96px_rgba(47,32,23,0.14)]"
                >
                  <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/95 to-transparent" />
                  <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#D59A3A]/10 blur-3xl" />

                  <div className="relative aspect-[5/4] overflow-hidden rounded-[1.8rem] bg-[#FFF8F0]">
                    <img
                      src={imageSrc}
                      alt={`${pet.name}, ${pet.breed}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2F2017]/34 via-transparent to-white/8" />

                    <div className="absolute left-4 top-4">
                      <span
                        className={[
                          "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-bold shadow-lg backdrop-blur-2xl",
                          statusStyles[pet.status],
                        ].join(" ")}
                      >
                        {statusLabels[pet.status]}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/58 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#D59A3A] shadow-lg shadow-[#2F2017]/5 backdrop-blur-2xl">
                        <CategoryIcon
                          aria-hidden="true"
                          className="h-4 w-4"
                          strokeWidth={2}
                        />
                        <span>{pet.category}</span>
                      </div>

                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-white/58 text-[#D59A3A] shadow-lg shadow-[#2F2017]/5 backdrop-blur-2xl">
                        <BadgeCheck
                          aria-hidden="true"
                          className="h-5 w-5"
                          strokeWidth={2}
                        />
                      </span>
                    </div>
                  </div>

                  <div className="relative p-5 sm:p-6">
                    <h3 className="font-[Poppins] text-2xl font-bold tracking-tight text-[#2F2017]">
                      {pet.name}
                    </h3>

                    <p className="mt-2 text-sm font-bold text-[#5B4A3F]">
                      {pet.breed} • {pet.category}
                    </p>

                    {pet.description ? (
                      <p className="mt-4 line-clamp-2 text-sm leading-6 text-[#5B4A3F]">
                        {pet.description}
                      </p>
                    ) : null}

                    <dl className="mt-5 grid gap-3 text-sm">
                      <div className="flex items-center justify-between gap-4 border-b border-[#ECECEC] pb-3">
                        <dt className="font-medium text-[#5B4A3F]/80">Age</dt>
                        <dd className="text-right font-bold text-[#2F2017]">
                          {pet.age ?? ""}
                        </dd>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <dt className="font-medium text-[#5B4A3F]/80">Price</dt>
                        <dd className="text-right font-[Poppins] text-lg font-bold text-[#D59A3A]">
                          {formatPrice(pet.price)}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <a
                        href={`tel:${settings.phone}`}
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#D59A3A]/70 bg-white/72 px-4 text-sm font-bold text-[#D59A3A] shadow-xl shadow-[#2F2017]/5 outline-none backdrop-blur-2xl transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-2xl hover:shadow-[#D59A3A]/15 focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0]"
                      >
                        <Phone
                          aria-hidden="true"
                          className="h-4 w-4 text-[#D59A3A]"
                          strokeWidth={2.2}
                        />
                        <span>Call Now</span>
                      </a>

                      <a
                        href={whatsappHref}
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] px-4 text-sm font-bold text-white shadow-xl shadow-emerald-900/15 outline-none transition duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-emerald-900/20 focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0]"
                      >
                        <MessageCircle
                          aria-hidden="true"
                          className="h-4 w-4 text-white"
                          strokeWidth={2.2}
                        />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        )}

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-14 flex justify-center [&_a]:h-14 [&_a]:rounded-full [&_a]:px-8 [&_a]:text-base [&_a]:font-bold"
        >
          <Button href="/pets">View All Pets</Button>
        </motion.div>
      </Container>
    </section>
  );
}