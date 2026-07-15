"use client";

import { motion, type Variants } from "framer-motion";
import {
  BadgeCheck,
  CalendarDays,
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
    "border-emerald-700/15 bg-emerald-50/90 text-emerald-800",
  sold_out: "border-red-700/15 bg-red-50/90 text-red-800",
  coming_soon:
    "border-amber-700/15 bg-amber-50/90 text-amber-800",
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
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
      duration: 0.5,
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
      className="relative isolate w-full overflow-hidden bg-[#FFF9EF] py-24 font-[Inter] sm:py-28 lg:py-36"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#FFF9EF]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(247,235,221,0.88),transparent_34%),radial-gradient(circle_at_84%_18%,rgba(201,144,69,0.12),transparent_30%),radial-gradient(circle_at_50%_92%,rgba(255,255,255,0.66),transparent_34%),linear-gradient(180deg,#FFF9EF_0%,#FFF4E4_52%,#FFF9EF_100%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(58,36,26,0.025)_46%,transparent_74%)]" />
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto flex w-full max-w-[900px] flex-col items-center justify-center text-center"
        >
          <motion.div
            variants={fadeUpVariants}
            className="mx-auto inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-[#3A241A]/10 bg-[#FFF9EF]/70 px-4 py-2 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#B77932] sm:text-xs sm:tracking-[0.24em]"
          >
            <Sparkles
              aria-hidden="true"
              className="h-4 w-4 shrink-0"
              strokeWidth={1.8}
            />

            <span>Meet Your New Best Friend</span>
          </motion.div>

          <motion.h2
            id="featured-pets-heading"
            variants={fadeUpVariants}
            className="mx-auto mt-7 w-full text-center font-[Poppins] text-4xl font-bold leading-[1.12] tracking-[-0.04em] text-[#2A1B14] sm:text-5xl lg:text-[3.7rem]"
          >
            Featured Pets
          </motion.h2>

          <motion.div
            variants={fadeUpVariants}
            aria-hidden="true"
            className="mx-auto mt-7 flex w-full items-center justify-center gap-3"
          >
            <span className="h-px w-12 bg-[#C99045]/55" />

            <PawPrint
              className="h-5 w-5 shrink-0 text-[#C99045]"
              strokeWidth={1.7}
            />

            <span className="h-px w-12 bg-[#C99045]/55" />
          </motion.div>

          <motion.p
            variants={fadeUpVariants}
            className="mx-auto mt-7 max-w-[680px] text-center text-base leading-8 text-[#5B4A3F] sm:text-lg sm:leading-9"
          >
            Discover loving companions waiting to become part of your family.
          </motion.p>
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
                className="w-full max-w-[410px] overflow-hidden rounded-[2rem] border border-[#3A241A]/10 bg-[#FFF9EF]/72 shadow-[0_20px_55px_rgba(58,36,26,0.08)] backdrop-blur-xl"
              >
                <div className="aspect-[4/3] animate-pulse bg-[#B77932]/10" />

                <div className="p-6 sm:p-7">
                  <div className="h-9 w-36 animate-pulse rounded-full bg-[#B77932]/10" />

                  <div className="mt-6 h-8 w-3/4 animate-pulse rounded-full bg-[#B77932]/10" />

                  <div className="mt-4 h-5 w-2/3 animate-pulse rounded-full bg-[#B77932]/10" />

                  <div className="mt-8 space-y-3">
                    {Array.from({ length: 4 }).map((__, rowIndex) => (
                      <div
                        key={rowIndex}
                        className="h-16 w-full animate-pulse rounded-2xl bg-[#B77932]/10"
                      />
                    ))}
                  </div>

                  <div className="mt-7 h-14 w-full animate-pulse rounded-full bg-[#B77932]/10" />
                </div>
              </motion.article>
            ))}
          </motion.div>
        ) : error ? (
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto mt-20 max-w-[720px] rounded-[2rem] border border-[#3A241A]/10 bg-[#FFF9EF]/75 px-6 py-12 text-center shadow-[0_20px_55px_rgba(58,36,26,0.08)]"
          >
            <h3 className="font-[Poppins] text-2xl font-bold text-[#2A1B14]">
              Something went wrong
            </h3>

            <p className="mt-4 text-base leading-8 text-[#5B4A3F]">
              {error}
            </p>
          </motion.div>
        ) : pets.length === 0 ? (
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto mt-20 max-w-[720px] rounded-[2rem] border border-[#3A241A]/10 bg-[#FFF9EF]/75 px-6 py-12 text-center shadow-[0_20px_55px_rgba(58,36,26,0.08)]"
          >
            <h3 className="font-[Poppins] text-2xl font-bold text-[#2A1B14]">
              No pets available.
            </h3>

            <p className="mt-4 text-base leading-8 text-[#5B4A3F]">
              Please check back soon to find your perfect companion.
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto mt-20 flex w-full flex-wrap items-stretch justify-center gap-8"
          >
            {pets.map((pet) => {
              const CategoryIcon = categoryIcons[pet.category];

              const imageSrc =
                pet.images?.[0] ?? "/images/pet-placeholder.jpg";

              const whatsappMessage = encodeURIComponent(
                `Hi Bunny Pets Zone, I'm interested in ${pet.name}. Could you please share more information?`,
              );

              const whatsappHref = `https://wa.me/91${settings.whatsapp}?text=${whatsappMessage}`;

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
                  className="group relative flex w-full max-w-[410px] flex-col overflow-hidden rounded-[2rem] border border-[#3A241A]/10 bg-[#FFF9EF]/78 shadow-[0_20px_55px_rgba(58,36,26,0.08)] backdrop-blur-xl transition duration-300 hover:border-[#C99045]/45 hover:shadow-[0_28px_70px_rgba(58,36,26,0.12)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#FFF4E4]">
                    <img
                      src={imageSrc}
                      alt={pet.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
                    />

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

                    <div className="absolute bottom-5 left-5">
                      <div className="inline-flex min-h-[38px] items-center justify-center gap-2 rounded-full border border-[#C99045]/30 bg-[#FFF9EF]/95 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#9A6429] shadow-lg backdrop-blur-xl">
                        <CategoryIcon
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0"
                          strokeWidth={2}
                        />

                        <span>{pet.category}</span>
                      </div>
                    </div>

                    {pet.featured_homepage ? (
                      <div className="absolute bottom-5 right-5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C99045]/25 bg-[#FFF9EF]/95 text-[#B77932] shadow-lg backdrop-blur-xl">
                          <BadgeCheck
                            aria-hidden="true"
                            className="h-5 w-5"
                            strokeWidth={2}
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-1 flex-col px-5 pb-6 pt-6 min-[390px]:px-6 sm:p-7">
                    <div className="relative pr-12">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B77932]">
                        Companion
                      </p>

                      <h3 className="mt-2 break-words font-[Poppins] text-2xl font-bold leading-tight tracking-[-0.025em] text-[#2A1B14]">
                        {pet.name}
                      </h3>

                      <Heart
                        aria-hidden="true"
                        className="absolute right-1 top-2 h-6 w-6 text-[#C99045] sm:right-2"
                        strokeWidth={1.8}
                      />
                    </div>

                    <p className="mt-3 break-words pr-2 text-base font-semibold leading-7 text-[#5B4A3F]">
                      {pet.breed}
                      {pet.pet_type ? `/${pet.pet_type}` : ""}
                    </p>

                    {pet.description ? (
                      <p className="mt-3 break-words pr-2 text-sm leading-7 text-[#5B4A3F]">
                        {pet.description}
                      </p>
                    ) : null}

                    <dl className="mt-7 overflow-hidden rounded-[1.4rem] border border-[#C99045]/25 bg-[#FFFDF9]">
                      <div className="grid min-h-[64px] grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-3 border-b border-[#3A241A]/10 px-4 py-4 min-[390px]:px-5 sm:px-6">
                        <dt className="flex min-w-0 items-center gap-3 text-sm font-semibold text-[#A76519]">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFF4E4]">
                            <PawPrint
                              className="h-4 w-4"
                              strokeWidth={1.9}
                            />
                          </span>

                          <span>Breed</span>
                        </dt>

                        <dd className="min-w-0 pr-2 text-right text-sm font-bold leading-5 text-[#2A1B14] min-[390px]:pr-3">
                          <span className="ml-auto block max-w-[150px] break-words">
                            {pet.breed}
                          </span>
                        </dd>
                      </div>

                      <div className="grid min-h-[64px] grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-3 border-b border-[#3A241A]/10 px-4 py-4 min-[390px]:px-5 sm:px-6">
                        <dt className="flex min-w-0 items-center gap-3 text-sm font-semibold text-[#A76519]">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFF4E4]">
                            <CategoryIcon
                              className="h-4 w-4"
                              strokeWidth={1.9}
                            />
                          </span>

                          <span>Type</span>
                        </dt>

                        <dd className="min-w-0 pr-2 text-right text-sm font-bold leading-5 text-[#2A1B14] min-[390px]:pr-3">
                          <span className="ml-auto block max-w-[150px] break-words">
                            {pet.pet_type || pet.category}
                          </span>
                        </dd>
                      </div>

                      <div className="grid min-h-[64px] grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-3 border-b border-[#3A241A]/10 px-4 py-4 min-[390px]:px-5 sm:px-6">
                        <dt className="flex min-w-0 items-center gap-3 text-sm font-semibold text-[#A76519]">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFF4E4]">
                            <CalendarDays
                              className="h-4 w-4"
                              strokeWidth={1.9}
                            />
                          </span>

                          <span>Age</span>
                        </dt>

                        <dd className="min-w-0 pr-2 text-right text-sm font-bold leading-5 text-[#2A1B14] min-[390px]:pr-3">
                          <span className="ml-auto block max-w-[150px] break-words">
                            {pet.age || "Not specified"}
                          </span>
                        </dd>
                      </div>

                      <div className="grid min-h-[68px] grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-3 px-4 py-4 min-[390px]:px-5 sm:px-6">
                        <dt className="flex min-w-0 items-center gap-3 text-sm font-semibold text-[#A76519]">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFF4E4] text-base font-bold">
                            ₹
                          </span>

                          <span>Price</span>
                        </dt>

                        <dd className="min-w-0 pr-2 text-right font-[Poppins] text-lg font-bold leading-6 text-[#A76519] min-[390px]:pr-3">
                          <span className="ml-auto block max-w-[160px] break-words">
                            {formatPrice(pet.price)}
                          </span>
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-7 grid grid-cols-1 gap-3 min-[390px]:grid-cols-2">
                      <a
                        href={`tel:${settings.phone}`}
                        className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full border border-[#B77932]/45 bg-[#FFF9EF] px-5 py-3 text-center text-sm font-bold text-[#8D5B26] shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFF4E4]"
                      >
                        <Phone
                          className="h-5 w-5 shrink-0 text-[#B77932]"
                          strokeWidth={2}
                        />

                        <span className="whitespace-nowrap">Call Now</span>
                      </a>

                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#0AA66A] px-5 py-3 text-center text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-[#078C59]"
                      >
                        <MessageCircle
                          className="h-5 w-5 shrink-0"
                          strokeWidth={2}
                        />

                        <span className="whitespace-nowrap">WhatsApp</span>
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
          viewport={{ once: true, amount: 0.25 }}
          className="mx-auto mt-16 flex w-full items-center justify-center px-4"
        >
          <a
            href="/pets"
            className="inline-flex min-h-[60px] min-w-[190px] items-center justify-center whitespace-nowrap rounded-full bg-[#DFA02D] px-8 py-4 text-center text-base font-bold leading-none text-white shadow-[0_14px_32px_rgba(183,121,50,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#C98E28] hover:shadow-[0_18px_38px_rgba(183,121,50,0.28)]"
          >
            View All Pets
          </a>
        </motion.div>
      </div>
    </section>
  );
}