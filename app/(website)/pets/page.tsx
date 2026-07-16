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

import Button from "@/components/ui/Button";
import { getAllPets, type Pet } from "@/lib/pets";

type FilterCategory = "All" | "Dog" | "Cat" | "Bird" | "Hamster";

const businessWhatsapp = "7680904157";

const filters: {
  label: string;
  value: FilterCategory;
  icon: typeof PawPrint;
}[] = [
  {
    label: "All Pets",
    value: "All",
    icon: PawPrint,
  },
  {
    label: "Dogs",
    value: "Dog",
    icon: Dog,
  },
  {
    label: "Cats",
    value: "Cat",
    icon: Cat,
  },
  {
    label: "Birds",
    value: "Bird",
    icon: Bird,
  },
  {
    label: "Hamsters",
    value: "Hamster",
    icon: Ham,
  },
];

const statusLabels: Record<Pet["status"], string> = {
  available: "Available",
  sold_out: "Sold Out",
  coming_soon: "Coming Soon",
};

const statusStyles: Record<Pet["status"], string> = {
  available: "border-emerald-200 bg-emerald-50 text-emerald-700",
  sold_out: "border-red-200 bg-red-50 text-red-700",
  coming_soon: "border-amber-200 bg-amber-50 text-amber-700",
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
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.52,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardVariants: Variants = {
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
      duration: 0.54,
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

  return `https://wa.me/91${businessWhatsapp}?text=${encodeURIComponent(
    message,
  )}`;
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
          setPets(
            (data ?? []).filter(
              (pet) => pet.show_on_website === true,
            ),
          );
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
        selectedCategory === "All" ||
        pet.category === selectedCategory;

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
    <main className="min-h-screen w-full overflow-x-hidden bg-[#FFF9EF] font-[Inter]">
      <section className="relative isolate w-full overflow-hidden bg-[#FFF9EF] py-20 sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[#FFF9EF]" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(201,144,69,0.15),transparent_30%),radial-gradient(circle_at_86%_24%,rgba(247,235,221,0.8),transparent_30%),linear-gradient(180deg,#FFF9EF_0%,#FFF4E4_52%,#FFF9EF_100%)]" />

          <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-[#B77932]/10 blur-3xl" />

          <div className="absolute -right-28 top-36 h-96 w-96 rounded-full bg-[#C99045]/14 blur-3xl" />
        </div>

        <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8 lg:px-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto flex w-full flex-col items-center justify-center text-center"
          >
            <motion.div
              variants={fadeUpVariants}
              className="mx-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#3A241A]/10 bg-[#FFF9EF]/75 px-5 py-2.5 text-center text-xs font-bold uppercase tracking-[0.18em] text-[#9A6429] shadow-[0_10px_30px_rgba(58,36,26,0.06)] backdrop-blur-xl"
            >
              <Sparkles
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-[#B77932]"
                strokeWidth={2}
              />

              <span>Our Pets</span>
            </motion.div>

            <motion.h1
              variants={fadeUpVariants}
              className="mx-auto mt-8 w-full max-w-[1000px] text-center font-[Poppins] text-[2.7rem] font-bold leading-[1.08] tracking-[-0.04em] text-[#2A1B14] sm:text-[3.7rem] lg:text-[4.3rem]"
            >
              Find Your Perfect Companion
            </motion.h1>

            <motion.p
              variants={fadeUpVariants}
              className="mx-auto mt-6 w-full max-w-[760px] text-center text-base font-medium leading-8 text-[#5E4A3D] sm:text-lg sm:leading-9"
            >
              Browse our healthy and well-cared-for pets. Contact us directly
              on WhatsApp for availability and more information.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="relative w-full bg-[#FFF9EF] pb-20 sm:pb-24 lg:pb-28">
        <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8 lg:px-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto flex w-full flex-col items-center justify-center text-center"
          >
            <motion.div
              variants={fadeUpVariants}
              aria-label="Filter pets by category"
              className="mx-auto flex w-full max-w-[900px] flex-wrap items-center justify-center gap-4"
            >
              {filters.map((filter) => {
                const Icon = filter.icon;

                const isActive =
                  selectedCategory === filter.value;

                return (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() =>
                      setSelectedCategory(filter.value)
                    }
                    aria-pressed={isActive}
                    className={[
                      "inline-flex min-h-[58px] min-w-[140px] items-center justify-center gap-3 rounded-full border px-7 py-4 text-center text-sm font-bold leading-none outline-none transition duration-300",
                      isActive
                        ? "border-[#C99045] bg-gradient-to-r from-[#8A5522] via-[#C99045] to-[#A86424] text-white shadow-[0_16px_38px_rgba(138,85,34,0.24)]"
                        : "border-[#3A241A]/10 bg-[#FFF9EF]/72 text-[#2A1B14] shadow-[0_12px_30px_rgba(58,36,26,0.06)] backdrop-blur-xl hover:-translate-y-0.5 hover:border-[#C99045]/45 hover:text-[#9A6429]",
                    ].join(" ")}
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0"
                      strokeWidth={2}
                    />

                    <span className="whitespace-nowrap">
                      {filter.label}
                    </span>
                  </button>
                );
              })}
            </motion.div>

            <motion.div
              variants={fadeUpVariants}
              className="mx-auto mt-8 w-full max-w-[820px]"
            >
              <label
                htmlFor="pet-search"
                className="sr-only"
              >
                Search pets
              </label>

              <div className="relative w-full">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-[#B77932]"
                  strokeWidth={2}
                />

                <input
                  id="pet-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  placeholder="Search pets..."
                  className="min-h-[64px] w-full rounded-full border border-[#3A241A]/10 bg-[#FFF9EF]/72 py-4 pl-16 pr-7 text-base font-semibold leading-6 text-[#2A1B14] shadow-[0_16px_42px_rgba(58,36,26,0.07)] outline-none backdrop-blur-xl transition duration-300 placeholder:text-[#5E4A3D]/50 focus:border-[#C99045] focus:ring-2 focus:ring-[#C99045]/20"
                />
              </div>
            </motion.div>
          </motion.div>

          {loading ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mx-auto mt-20 flex w-full flex-wrap items-stretch justify-center gap-8"
            >
              {Array.from({ length: 3 }).map((_, index) => (
                <motion.article
                  key={index}
                  variants={cardVariants}
                  className="w-full max-w-[360px] overflow-hidden rounded-[2rem] border border-[#3A241A]/10 bg-[#FFF9EF]/72 shadow-[0_20px_55px_rgba(58,36,26,0.08)] backdrop-blur-xl"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#FFF4E4]">
                    <div className="h-full w-full animate-pulse bg-[#B77932]/10" />
                  </div>

                  <div className="p-7">
                    <div className="mx-auto h-8 w-32 animate-pulse rounded-full bg-[#B77932]/10" />

                    <div className="mx-auto mt-6 h-8 w-4/5 animate-pulse rounded-full bg-[#B77932]/10" />

                    <div className="mx-auto mt-7 w-full overflow-hidden rounded-[1.35rem] border border-[#3A241A]/[0.07] bg-[#FFFCF7]/70 px-5 sm:px-6">
                      {Array.from({ length: 4 }).map(
                        (_, rowIndex) => (
                          <div
                            key={rowIndex}
                            className="flex min-h-[68px] items-center justify-between gap-5 border-b border-[#3A241A]/[0.08] py-5 last:border-b-0"
                          >
                            <div className="h-4 w-16 animate-pulse rounded-full bg-[#B77932]/10" />

                            <div className="h-4 w-24 animate-pulse rounded-full bg-[#B77932]/10" />
                          </div>
                        ),
                      )}
                    </div>

                    <div className="mt-7 min-h-[56px] w-full animate-pulse rounded-full bg-[#B77932]/10" />
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : error ? (
            <EmptyState
              title="Something went wrong"
              description={error}
            />
          ) : pets.length === 0 ? (
            <EmptyState
              title="No pets available."
              description="Please check back soon to find your perfect companion."
            />
          ) : filteredPets.length === 0 ? (
            <EmptyState
              title="No pets found"
              description="Try a different category or search term to find your perfect companion."
            />
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mx-auto mt-20 flex w-full flex-wrap items-stretch justify-center gap-8"
            >
              {filteredPets.map((pet) => {
                const CategoryIcon =
                  categoryIcons[pet.category];

                const whatsappHref =
                  createWhatsappHref(pet);

                const imageSrc =
                  pet.images?.[0] ??
                  "/images/pet-placeholder.jpg";

                return (
                  <motion.article
                    key={pet.id}
                    variants={cardVariants}
                    whileHover={{ y: -6 }}
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 24,
                    }}
                    className="group relative w-full max-w-[360px] overflow-hidden rounded-[2rem] border border-[#3A241A]/10 bg-[#FFF9EF]/72 shadow-[0_20px_55px_rgba(58,36,26,0.08)] backdrop-blur-xl transition duration-300 hover:border-[#C99045]/45 hover:shadow-[0_28px_70px_rgba(58,36,26,0.12)]"
                  >
                    <Link
                      href={`/pets/${pet.slug}`}
                      aria-label={`View details for ${pet.name}`}
                      className="absolute inset-0 z-10 rounded-[2rem]"
                    />

               <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#FFF8EE] via-[#FFF4E6] to-[#FDF0DE] p-5">
  <div
    className="
      relative
      flex
      h-full
      w-full
      items-center
      justify-center
      overflow-hidden
      rounded-[1.6rem]
      border
      border-white/70
      bg-white
      shadow-[0_18px_45px_rgba(58,36,26,0.10)]
    "
  >
    <img
      src={imageSrc}
      alt={pet.name}
      loading="lazy"
      className="
        max-h-full
        max-w-full
        object-contain
        transition-transform
        duration-500
        ease-out
        group-hover:scale-105
      "
    />
  </div>

  <div className="absolute left-5 top-5">
    <span
      className={[
        "inline-flex min-h-[36px] items-center justify-center rounded-full border px-4 py-2 text-center text-xs font-bold leading-none shadow-lg backdrop-blur-xl",
        statusStyles[pet.status],
      ].join(" ")}
    >
      {statusLabels[pet.status]}
    </span>
  </div>
</div>

                    <div className="relative z-20 p-7">
                      <div className="flex flex-wrap items-center justify-center gap-3">
                        <div className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-full border border-[#3A241A]/10 bg-[#FFF4E4]/72 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-[#9A6429]">
                          <CategoryIcon
                            aria-hidden="true"
                            className="h-4 w-4 shrink-0"
                            strokeWidth={2}
                          />

                          <span className="whitespace-nowrap">
                            {pet.category}
                          </span>
                        </div>

                        {pet.featured_homepage ? (
                          <div className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-full border border-[#3A241A]/10 bg-[#FFF4E4]/72 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-[#9A6429]">
                            <BadgeCheck
                              aria-hidden="true"
                              className="h-4 w-4 shrink-0"
                              strokeWidth={2}
                            />

                            <span className="whitespace-nowrap">
                              Featured
                            </span>
                          </div>
                        ) : null}
                      </div>

                      <h3 className="mt-7 text-center font-[Poppins] text-2xl font-bold leading-tight tracking-[-0.025em] text-[#2A1B14]">
                        {pet.name}
                      </h3>

                      {pet.description ? (
                        <p className="mt-4 line-clamp-2 text-center text-sm leading-7 text-[#5E4A3D]">
                          {pet.description}
                        </p>
                      ) : null}

                      <dl className="mx-auto mt-7 w-full overflow-hidden rounded-[1.35rem] border border-[#3A241A]/[0.07] bg-[#FFFCF7]/70 px-5 sm:px-6">
                        <PetDetailRow
                          label="Breed"
                          value={pet.breed}
                        />

                        <PetDetailRow
                          label="Type"
                          value={pet.pet_type}
                        />

                        <PetDetailRow
                          label="Age"
                          value={pet.age ?? ""}
                        />

                        <div className="flex min-h-[68px] w-full items-center justify-between gap-5 py-5">
                          <dt className="shrink-0 text-left text-sm font-medium text-[#5E4A3D]/80">
                            Price
                          </dt>

                          <dd className="min-w-0 max-w-[65%] break-words text-right font-[Poppins] text-lg font-bold leading-6 text-[#B77932]">
                            {formatPrice(pet.price)}
                          </dd>
                        </div>
                      </dl>

                      <div className="relative z-30 mt-8 [&_a]:flex [&_a]:min-h-[56px] [&_a]:w-full [&_a]:items-center [&_a]:justify-center [&_a]:rounded-full [&_a]:px-6 [&_a]:py-4 [&_a]:text-center [&_a]:text-sm [&_a]:font-bold [&_a]:leading-none">
                        <Button href={whatsappHref}>
                          Enquire on WhatsApp
                        </Button>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}

function PetDetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-h-[68px] w-full items-center justify-between gap-5 border-b border-[#3A241A]/[0.08] py-5">
      <dt className="shrink-0 text-left text-sm font-medium text-[#5E4A3D]/80">
        {label}
      </dt>

      <dd className="min-w-0 max-w-[65%] break-words text-right text-sm font-bold leading-6 text-[#2A1B14]">
        {value}
      </dd>
    </div>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto mt-20 flex w-full max-w-[760px] flex-col items-center justify-center rounded-[2rem] border border-[#3A241A]/10 bg-[#FFF9EF]/72 px-8 py-12 text-center shadow-[0_20px_55px_rgba(58,36,26,0.08)] backdrop-blur-xl sm:px-12">
      <PawPrint
        aria-hidden="true"
        className="mx-auto h-11 w-11 text-[#B77932]"
        strokeWidth={1.8}
      />

      <p className="mx-auto mt-6 w-full text-center font-[Poppins] text-2xl font-bold leading-tight text-[#2A1B14]">
        {title}
      </p>

      <p className="mx-auto mt-4 w-full max-w-[520px] text-center text-base leading-8 text-[#5E4A3D]">
        {description}
      </p>
    </div>
  );
}