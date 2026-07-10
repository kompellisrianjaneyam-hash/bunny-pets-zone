
"use client";

import { motion, type Variants } from "framer-motion";
import {
  BadgeCheck,
  Bird,
  Cat,
  Dog,
  Ham,
  PawPrint,
  Search,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { getAllPets, type Pet } from "@/lib/pets";

type FilterCategory = "All" | "Dog" | "Cat" | "Bird" | "Hamster";

const businessWhatsapp = "7680904157";

const filters: { label: string; value: FilterCategory; icon: typeof PawPrint }[] =
  [
    { label: "All", value: "All", icon: PawPrint },
    { label: "Dogs", value: "Dog", icon: Dog },
    { label: "Cats", value: "Cat", icon: Cat },
    { label: "Birds", value: "Bird", icon: Bird },
    { label: "Hamsters", value: "Hamster", icon: Ham },
  ];

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

const categoryIcons: Record<Pet["category"], typeof PawPrint> = {
  Dog,
  Cat,
  Bird,
  Hamster: Ham,
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
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

function createWhatsappHref(pet: Pet) {
  const message = `Hi Bunny Pets Zone,

I'm interested in:

${pet.name}

Breed:
${pet.breed}

Type:
${pet.pet_type}

Age:
${pet.age ?? ""}

Could you please share more information?`;

  return `https://wa.me/91${businessWhatsapp}?text=${encodeURIComponent(message)}`;
}

export default function PetsPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<FilterCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadPets() {
      try {
        setLoading(true);
        setError(null);

        const data = await getAllPets();

        if (isMounted) {
          setPets((data ?? []).filter((pet) => pet.show_on_website === true));
        }
      } catch (err) {
        console.error("Error loading pets:", err);

        if (isMounted) {
          setError("Unable to load pets right now.");
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

  const filteredPets = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return pets.filter((pet) => {
      const matchesCategory =
        selectedCategory === "All" || pet.category === selectedCategory;

      const matchesSearch =
        query.length === 0 ||
        pet.name.toLowerCase().includes(query) ||
        pet.breed.toLowerCase().includes(query) ||
        pet.pet_type.toLowerCase().includes(query) ||
        (pet.description ?? "").toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [pets, searchQuery, selectedCategory]);

  return (
    <main className="min-h-screen bg-[#FFF8F0] font-[Inter]">
      <section className="relative isolate overflow-hidden bg-[#FFF8F0] px-4 pb-20 pt-36 sm:px-6 sm:pb-24 sm:pt-40 lg:px-8 lg:pb-28 lg:pt-44">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(213,154,58,0.15),transparent_30%),radial-gradient(circle_at_86%_24%,rgba(255,214,153,0.32),transparent_28%),linear-gradient(180deg,#FFF8F0_0%,#FFF3E6_52%,#FFF8F0_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(213,154,58,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(213,154,58,0.04)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_72%)]" />
          <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-[#D59A3A]/10 blur-3xl" />
          <div className="absolute -right-28 top-36 h-96 w-96 rounded-full bg-orange-200/42 blur-3xl" />
        </div>

        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div
              variants={fadeUpVariants}
              className="inline-flex items-center gap-2 rounded-full border border-[#ECECEC] bg-white/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D59A3A] shadow-lg shadow-[#D59A3A]/5 backdrop-blur-xl"
            >
              <Sparkles aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              <span>Our Pets</span>
            </motion.div>

            <motion.h1
              variants={fadeUpVariants}
              className="mt-7 text-balance font-[Poppins] text-5xl font-bold leading-tight tracking-tight text-[#2F2017] sm:text-6xl lg:text-7xl"
            >
              Find Your Perfect Companion
            </motion.h1>

            <motion.p
              variants={fadeUpVariants}
              className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-[#5B4A3F] sm:text-xl"
            >
              Browse our healthy and well-cared-for pets. Contact us directly on
              WhatsApp for availability and more information.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      <section
        aria-labelledby="pets-list-heading"
        className="relative bg-[#FFF8F0] px-4 pb-24 sm:px-6 sm:pb-28 lg:px-8 lg:pb-32"
      >
        <Container>
          <h2 id="pets-list-heading" className="sr-only">
            Available pets list
          </h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-wrap justify-center gap-3"
              aria-label="Filter pets by category"
            >
              {filters.map((filter) => {
                const Icon = filter.icon;
                const isActive = selectedCategory === filter.value;

                return (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() => setSelectedCategory(filter.value)}
                    aria-pressed={isActive}
                    className={[
                      "relative inline-flex h-12 items-center gap-2 rounded-full border px-5 text-sm font-bold outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0]",
                      isActive
                        ? "border-[#D59A3A] bg-[#D59A3A] text-white shadow-xl shadow-[#D59A3A]/20"
                        : "border-[#ECECEC] bg-white/58 text-[#2F2017] shadow-lg shadow-[#2F2017]/5 backdrop-blur-xl hover:-translate-y-0.5 hover:border-[#D59A3A]/45 hover:text-[#D59A3A]",
                    ].join(" ")}
                  >
                    <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                    <span>{filter.label}</span>
                  </button>
                );
              })}
            </motion.div>

            <motion.div variants={fadeUpVariants} className="mx-auto max-w-2xl">
              <label htmlFor="pet-search" className="sr-only">
                Search pets
              </label>
              <div className="relative">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#D59A3A]"
                  strokeWidth={2}
                />
                <input
                  id="pet-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search pets..."
                  className="h-16 w-full rounded-full border border-[#ECECEC] bg-white/62 pl-14 pr-6 text-base font-semibold text-[#2F2017] shadow-xl shadow-[#2F2017]/5 outline-none backdrop-blur-xl transition duration-300 placeholder:text-[#5B4A3F]/50 focus:border-[#D59A3A] focus:ring-2 focus:ring-[#D59A3A]/20"
                />
              </div>
            </motion.div>
          </motion.div>

          {loading ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {Array.from({ length: 8 }).map((_, index) => (
                <motion.article
                  key={index}
                  variants={cardVariants}
                  className="group relative overflow-hidden rounded-[2rem] border border-[#ECECEC] bg-white/72 shadow-xl shadow-[#2F2017]/5 backdrop-blur-xl transition-colors duration-300 hover:border-[#D59A3A]"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#FFF8F0]">
                    <div className="h-full w-full animate-pulse bg-[#D59A3A]/10" />
                  </div>

                  <div className="relative z-20 p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="h-8 w-28 animate-pulse rounded-full bg-[#D59A3A]/10" />
                      <div className="h-5 w-5 animate-pulse rounded-full bg-[#D59A3A]/10" />
                    </div>

                    <div className="mt-5 h-8 w-4/5 animate-pulse rounded-full bg-[#D59A3A]/10" />

                    <div className="mt-5 grid gap-3 text-sm">
                      <div className="flex items-center justify-between gap-4 border-b border-[#ECECEC] pb-3">
                        <div className="h-4 w-14 animate-pulse rounded-full bg-[#D59A3A]/10" />
                        <div className="h-4 w-20 animate-pulse rounded-full bg-[#D59A3A]/10" />
                      </div>

                      <div className="flex items-center justify-between gap-4 border-b border-[#ECECEC] pb-3">
                        <div className="h-4 w-12 animate-pulse rounded-full bg-[#D59A3A]/10" />
                        <div className="h-4 w-24 animate-pulse rounded-full bg-[#D59A3A]/10" />
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

                    <div className="relative z-30 mt-6 h-12 w-full animate-pulse rounded-full bg-[#D59A3A]/10" />
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : error ? (
            <div className="mt-14 rounded-[2rem] border border-[#ECECEC] bg-white/58 p-10 text-center shadow-xl shadow-[#2F2017]/5 backdrop-blur-xl">
              <PawPrint
                aria-hidden="true"
                className="mx-auto h-10 w-10 text-[#D59A3A]"
                strokeWidth={1.8}
              />
              <p className="mt-5 font-[Poppins] text-2xl font-bold text-[#2F2017]">
                Something went wrong
              </p>
              <p className="mx-auto mt-3 max-w-md text-base leading-7 text-[#5B4A3F]">
                {error}
              </p>
            </div>
          ) : pets.length === 0 ? (
            <div className="mt-14 rounded-[2rem] border border-[#ECECEC] bg-white/58 p-10 text-center shadow-xl shadow-[#2F2017]/5 backdrop-blur-xl">
              <PawPrint
                aria-hidden="true"
                className="mx-auto h-10 w-10 text-[#D59A3A]"
                strokeWidth={1.8}
              />
              <p className="mt-5 font-[Poppins] text-2xl font-bold text-[#2F2017]">
                No pets available.
              </p>
              <p className="mx-auto mt-3 max-w-md text-base leading-7 text-[#5B4A3F]">
                Please check back soon to find your perfect companion.
              </p>
            </div>
          ) : (
            <>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
              >
                {filteredPets.map((pet) => {
                  const CategoryIcon = categoryIcons[pet.category];
                  const whatsappHref = createWhatsappHref(pet);
                  const imageSrc = pet.images?.[0] ?? "/images/pet-placeholder.jpg";

                  return (
                    <motion.article
                      key={pet.id}
                      variants={cardVariants}
                      whileHover={{ y: -8 }}
                      transition={{ type: "spring", stiffness: 320, damping: 24 }}
                      className="group relative overflow-hidden rounded-[2rem] border border-[#ECECEC] bg-white/72 shadow-xl shadow-[#2F2017]/5 backdrop-blur-xl transition-colors duration-300 hover:border-[#D59A3A]"
                    >
                      <Link
                        href={`/pets/${pet.slug}`}
                        aria-label={`View details for ${pet.name}`}
                        className="absolute inset-0 z-10 rounded-[2rem] outline-none focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0]"
                      />

                      <div className="relative aspect-square overflow-hidden bg-[#FFF8F0]">
                        <img
                          src={imageSrc}
                          alt={pet.name}
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

                      <div className="relative z-20 p-6">
                        <div className="flex items-center justify-between gap-4">
                          <div className="inline-flex items-center gap-2 rounded-full border border-[#ECECEC] bg-[#FFF8F0]/70 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#D59A3A]">
                            <CategoryIcon
                              aria-hidden="true"
                              className="h-4 w-4"
                              strokeWidth={2}
                            />
                            <span>{pet.category}</span>
                          </div>

                          {pet.featured_homepage ? (
                            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#ECECEC] bg-[#FFF8F0]/70 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#D59A3A]">
                              <BadgeCheck
                                aria-hidden="true"
                                className="h-4 w-4 text-[#D59A3A]"
                                strokeWidth={2}
                              />
                              <span>Featured</span>
                            </div>
                          ) : null}
                        </div>

                        <h3 className="mt-5 font-[Poppins] text-2xl font-bold tracking-tight text-[#2F2017]">
                          {pet.name}
                        </h3>

                        {pet.description ? (
                          <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#5B4A3F]">
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
                            <dt className="font-medium text-[#5B4A3F]/80">Type</dt>
                            <dd className="text-right font-bold text-[#2F2017]">
                              {pet.pet_type}
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

                        <div className="relative z-30 mt-6 [&_a]:h-12 [&_a]:w-full [&_a]:rounded-full [&_a]:text-sm [&_a]:font-bold">
                          <Button href={whatsappHref}>Enquire on WhatsApp</Button>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </motion.div>

              {filteredPets.length === 0 ? (
                <div className="mt-14 rounded-[2rem] border border-[#ECECEC] bg-white/58 p-10 text-center shadow-xl shadow-[#2F2017]/5 backdrop-blur-xl">
                  <PawPrint
                    aria-hidden="true"
                    className="mx-auto h-10 w-10 text-[#D59A3A]"
                    strokeWidth={1.8}
                  />
                  <p className="mt-5 font-[Poppins] text-2xl font-bold text-[#2F2017]">
                    No pets found
                  </p>
                  <p className="mx-auto mt-3 max-w-md text-base leading-7 text-[#5B4A3F]">
                    Try a different category or search term to find your perfect
                    companion.
                  </p>
                </div>
              ) : null}
            </>
          )}

          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            className="mt-20 overflow-hidden rounded-[2.25rem] border border-[#ECECEC] bg-white/58 p-8 text-center shadow-[0_26px_80px_rgba(47,32,23,0.10)] backdrop-blur-2xl sm:p-10 lg:p-12"
          >
            <h2 className="font-[Poppins] text-3xl font-bold tracking-tight text-[#2F2017] sm:text-4xl">
              Need help choosing the right pet?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#5B4A3F] sm:text-lg">
              Message Bunny Pets Zone on WhatsApp and our team will guide you
              with availability, care details and the best match for your family.
            </p>
            <div className="mt-8 flex justify-center [&_a]:h-14 [&_a]:rounded-full [&_a]:px-8 [&_a]:text-base [&_a]:font-bold">
              <Button
                href={`https://wa.me/91${businessWhatsapp}?text=${encodeURIComponent(
                  "Hi Bunny Pets Zone,\nI'm looking for a pet. Could you please help me choose the right companion?",
                )}`}
              >
                Chat on WhatsApp
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}