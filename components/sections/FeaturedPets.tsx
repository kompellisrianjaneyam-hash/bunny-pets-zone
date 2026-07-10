
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
    "border-emerald-200 bg-emerald-50 text-emerald-700 shadow-emerald-900/5",
  sold_out: "border-red-200 bg-red-50 text-red-700 shadow-red-900/5",
  coming_soon:
    "border-amber-200 bg-amber-50 text-amber-700 shadow-amber-900/5",
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
      className="relative isolate overflow-hidden bg-[#FFF8F0] px-4 py-24 font-[Inter] sm:px-6 sm:py-28 lg:px-8 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(213,154,58,0.13),transparent_30%),radial-gradient(circle_at_86%_22%,rgba(255,214,153,0.30),transparent_28%),linear-gradient(180deg,#FFF8F0_0%,#FFF3E6_52%,#FFF8F0_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(213,154,58,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(213,154,58,0.04)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_72%)]" />
        <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-[#D59A3A]/10 blur-3xl" />
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
            className="inline-flex items-center gap-2 rounded-full border border-[#ECECEC] bg-white/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D59A3A] shadow-lg shadow-[#D59A3A]/5 backdrop-blur-xl"
          >
            <Heart aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
            <span>Featured Pets</span>
          </motion.div>

          <motion.h2
            id="featured-pets-heading"
            variants={fadeUpVariants}
            className="mt-7 text-balance font-[Poppins] text-4xl font-bold leading-tight tracking-tight text-[#2F2017] sm:text-5xl lg:text-6xl"
          >
            Meet Our Lovely Pets
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-[#5B4A3F] sm:text-xl"
          >
            Discover healthy, well-cared-for pets looking for a loving home.
          </motion.p>
        </motion.div>

        {loading ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <motion.article
                key={index}
                variants={cardVariants}
                className="group overflow-hidden rounded-[2rem] border border-[#ECECEC] bg-white/72 shadow-xl shadow-[#2F2017]/5 backdrop-blur-xl transition-colors duration-300 hover:border-[#D59A3A]"
              >
                <div className="relative aspect-square overflow-hidden bg-[#FFF8F0]">
                  <div className="h-full w-full animate-pulse bg-[#D59A3A]/10" />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="h-8 w-28 animate-pulse rounded-full bg-[#D59A3A]/10" />
                    <div className="h-5 w-5 animate-pulse rounded-full bg-[#D59A3A]/10" />
                  </div>

                  <div className="mt-5 h-8 w-4/5 animate-pulse rounded-full bg-[#D59A3A]/10" />
                  <div className="mt-4 h-16 w-full animate-pulse rounded-2xl bg-[#D59A3A]/10" />

                  <div className="mt-5 grid gap-3 text-sm">
                    <div className="flex items-center justify-between gap-4 border-b border-[#ECECEC] pb-3">
                      <div className="h-4 w-14 animate-pulse rounded-full bg-[#D59A3A]/10" />
                      <div className="h-4 w-20 animate-pulse rounded-full bg-[#D59A3A]/10" />
                    </div>

                    <div className="flex items-center justify-between gap-4 border-b border-[#ECECEC] pb-3">
                      <div className="h-4 w-10 animate-pulse rounded-full bg-[#D59A3A]/10" />
                      <div className="h-4 w-16 animate-pulse rounded-full bg-[#D59A3A]/10" />
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="h-4 w-12 animate-pulse rounded-full bg-[#D59A3A]/10" />
                      <div className="h-6 w-24 animate-pulse rounded-full bg-[#D59A3A]/10" />
                    </div>
                  </div>

                  <div className="mt-6 h-12 w-full animate-pulse rounded-full bg-[#D59A3A]/10" />
                </div>
              </motion.article>
            ))}
          </motion.div>
        ) : error ? (
          <div className="mt-16 rounded-[2rem] border border-[#ECECEC] bg-white/72 p-10 text-center shadow-xl shadow-[#2F2017]/5 backdrop-blur-xl">
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
          </div>
        ) : pets.length === 0 ? (
          <div className="mt-16 rounded-[2rem] border border-[#ECECEC] bg-white/72 p-10 text-center shadow-xl shadow-[#2F2017]/5 backdrop-blur-xl">
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
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
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
                  className="group overflow-hidden rounded-[2rem] border border-[#ECECEC] bg-white/72 shadow-xl shadow-[#2F2017]/5 backdrop-blur-xl transition-colors duration-300 hover:border-[#D59A3A]"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#FFF8F0]">
                    <img
                      src={imageSrc}
                      alt={`${pet.name}, ${pet.breed}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute left-4 top-4">
                      <span
                        className={[
                          "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-bold shadow-lg backdrop-blur-xl",
                          statusStyles[pet.status],
                        ].join(" ")}
                      >
                        {statusLabels[pet.status]}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="inline-flex items-center gap-2 rounded-full border border-[#ECECEC] bg-[#FFF8F0]/70 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#D59A3A]">
                        <CategoryIcon
                          aria-hidden="true"
                          className="h-4 w-4"
                          strokeWidth={2}
                        />
                        <span>{pet.category}</span>
                      </div>

                      <BadgeCheck
                        aria-hidden="true"
                        className="h-5 w-5 text-[#D59A3A]"
                        strokeWidth={2}
                      />
                    </div>

                    <h3 className="mt-5 font-[Poppins] text-2xl font-bold tracking-tight text-[#2F2017]">
                      {pet.name}
                    </h3>

                    {pet.description ? (
                      <p className="mt-4 line-clamp-2 text-sm leading-6 text-[#5B4A3F]">
                        {pet.description}
                      </p>
                    ) : null}

                    <dl className="mt-5 grid gap-3 text-sm">
                      <div className="flex items-center justify-between gap-4 border-b border-[#ECECEC] pb-3">
                        <dt className="font-medium text-[#5B4A3F]/80">Breed</dt>
                        <dd className="text-right font-bold text-[#2F2017]">
                          {pet.breed}
                        </dd>
                      </div>

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
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#D59A3A] bg-white/80 px-4 text-sm font-bold text-[#D59A3A] shadow-xl shadow-[#2F2017]/5 outline-none backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-2xl hover:shadow-[#D59A3A]/15 focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0]"
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
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] px-4 text-sm font-bold text-white shadow-xl shadow-emerald-900/15 outline-none transition duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-emerald-900/20 focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0]"
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