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
    "border-emerald-700/15 bg-emerald-50/88 text-emerald-800 shadow-emerald-950/5",
  sold_out:
    "border-red-700/15 bg-red-50/88 text-red-800 shadow-red-950/5",
  coming_soon:
    "border-amber-700/15 bg-amber-50/88 text-amber-800 shadow-amber-950/5",
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
      className="relative isolate overflow-visible bg-[#FFF9EF] py-28 font-[Inter] sm:py-32 lg:py-36"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-screen overflow-hidden">
        <div className="absolute inset-0 bg-[#FFF9EF]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(247,235,221,0.88),transparent_34%),radial-gradient(circle_at_84%_18%,rgba(201,144,69,0.12),transparent_30%),radial-gradient(circle_at_50%_92%,rgba(255,255,255,0.66),transparent_34%),linear-gradient(180deg,#FFF9EF_0%,#FFF4E4_52%,#FFF9EF_100%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(58,36,26,0.025)_46%,transparent_74%)]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="
          mx-auto
          flex
          w-[calc(100%-2rem)]
          max-w-[900px]
          flex-col
          items-center
          justify-center
          text-center
          lg:relative
          lg:left-[50vw]
          lg:mx-0
          lg:w-[900px]
          lg:-translate-x-1/2
        "
      >
        <motion.div
          variants={fadeUpVariants}
          className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-[#3A241A]/10 bg-[#FFF9EF]/70 px-4 py-2 text-center text-xs font-bold uppercase tracking-[0.18em] text-[#8D5B26] shadow-lg shadow-[#3A241A]/5"
        >
          <Sparkles
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-[#B77932]"
            strokeWidth={2}
          />

          <span>Meet Your New Best Friend</span>
        </motion.div>

        <motion.h2
          id="featured-pets-heading"
          variants={fadeUpVariants}
          className="mt-8 w-full text-center font-[Poppins] text-4xl font-bold leading-[1.18] tracking-[-0.035em] text-[#2A1B14] sm:text-5xl sm:leading-[1.15] lg:text-[3.6rem] lg:leading-[1.12]"
        >
          Featured Pets
        </motion.h2>

        <motion.div
          variants={fadeUpVariants}
          aria-hidden="true"
          className="mt-8 flex w-full items-center justify-center gap-3"
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
          className="mx-auto mt-8 max-w-[700px] text-center text-base leading-8 text-[#5E4A3D] sm:text-lg sm:leading-9"
        >
          Discover loving companions waiting to become part of your family.
        </motion.p>
      </motion.div>

      {loading ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.14 }}
          className="
            mx-auto
            mt-20
            grid
            w-[calc(100%-2rem)]
            max-w-[1120px]
            grid-cols-1
            gap-8
            md:grid-cols-2
            lg:relative
            lg:left-[50vw]
            lg:mx-0
            lg:mt-24
            lg:w-[1120px]
            lg:-translate-x-1/2
            lg:grid-cols-3
            lg:gap-10
          "
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <motion.article
              key={index}
              variants={cardVariants}
              className="relative overflow-hidden rounded-[1.75rem] border border-[#3A241A]/[0.07] bg-[#FFFEFB] p-2 shadow-[0_18px_48px_rgba(58,36,26,0.065)]"
            >
              <div className="aspect-[5/4] animate-pulse rounded-[1.4rem] bg-[#B77932]/10" />

              <div className="p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="h-8 w-28 animate-pulse rounded-full bg-[#B77932]/10" />
                  <div className="h-8 w-8 animate-pulse rounded-full bg-[#B77932]/10" />
                </div>

                <div className="mt-5 h-8 w-4/5 animate-pulse rounded-full bg-[#B77932]/10" />

                <div className="mt-4 h-12 w-full animate-pulse rounded-2xl bg-[#B77932]/10" />

                <div className="mt-5 grid gap-3">
                  <div className="h-4 w-full animate-pulse rounded-full bg-[#B77932]/10" />
                  <div className="h-4 w-4/5 animate-pulse rounded-full bg-[#B77932]/10" />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="h-12 animate-pulse rounded-full bg-[#B77932]/10" />
                  <div className="h-12 animate-pulse rounded-full bg-[#B77932]/10" />
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
          className="
            mx-auto
            mt-20
            w-[calc(100%-2rem)]
            max-w-2xl
            rounded-[1.75rem]
            border
            border-[#3A241A]/[0.07]
            bg-[#FFFEFB]
            p-10
            text-center
            shadow-[0_18px_48px_rgba(58,36,26,0.065)]
            lg:relative
            lg:left-[50vw]
            lg:mx-0
            lg:-translate-x-1/2
          "
        >
          <PawPrint
            aria-hidden="true"
            className="mx-auto h-10 w-10 text-[#B77932]"
            strokeWidth={1.8}
          />

          <p className="mt-5 font-[Poppins] text-2xl font-bold text-[#2A1B14]">
            Featured pets unavailable
          </p>

          <p className="mx-auto mt-3 max-w-md text-base leading-7 text-[#5E4A3D]">
            {error}
          </p>
        </motion.div>
      ) : pets.length === 0 ? (
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="
            mx-auto
            mt-20
            w-[calc(100%-2rem)]
            max-w-2xl
            rounded-[1.75rem]
            border
            border-[#3A241A]/[0.07]
            bg-[#FFFEFB]
            p-10
            text-center
            shadow-[0_18px_48px_rgba(58,36,26,0.065)]
            lg:relative
            lg:left-[50vw]
            lg:mx-0
            lg:-translate-x-1/2
          "
        >
          <PawPrint
            aria-hidden="true"
            className="mx-auto h-10 w-10 text-[#B77932]"
            strokeWidth={1.8}
          />

          <p className="mt-5 font-[Poppins] text-2xl font-bold text-[#2A1B14]">
            No featured pets available.
          </p>

          <p className="mx-auto mt-3 max-w-md text-base leading-7 text-[#5E4A3D]">
            Please check back soon to meet our lovely pets.
          </p>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.14 }}
          className="
            mx-auto
            mt-20
            grid
            w-[calc(100%-2rem)]
            max-w-[1120px]
            grid-cols-1
            gap-8
            md:grid-cols-2
            lg:relative
            lg:left-[50vw]
            lg:mx-0
            lg:mt-24
            lg:w-[1120px]
            lg:-translate-x-1/2
            lg:grid-cols-3
            lg:gap-10
          "
        >
          {pets.map((pet) => {
            const CategoryIcon =
              categoryIcons[pet.category] ?? PawPrint;

            const imageSrc =
              pet.images?.[0] ?? "/images/pet-placeholder.jpg";

            const whatsappMessage = `Hi Bunny Pets Zone, I'm interested in ${pet.name}`;

            const whatsappHref = `https://wa.me/91${
              settings.whatsapp
            }?text=${encodeURIComponent(whatsappMessage)}`;

            return (
              <motion.article
                key={pet.id}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 24,
                }}
                className="group relative overflow-hidden rounded-[1.75rem] border border-[#3A241A]/[0.07] bg-[#FFFEFB] p-2 shadow-[0_18px_48px_rgba(58,36,26,0.065)] transition duration-300 hover:border-[#B77932]/25 hover:shadow-[0_24px_64px_rgba(58,36,26,0.10)]"
              >
                <div className="relative aspect-[5/4] overflow-hidden rounded-[1.4rem] bg-[#FFF4E4]">
                  <img
                    src={imageSrc}
                    alt={`${pet.name}, ${pet.breed}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2A1B14]/40 via-[#2A1B14]/5 to-transparent" />

                  <div className="absolute left-4 top-4">
                    <span
                      className={[
                        "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-bold shadow-lg",
                        statusStyles[pet.status],
                      ].join(" ")}
                    >
                      {statusLabels[pet.status]}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-[#FFF9EF]/90 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#8D5B26] shadow-lg">
                      <CategoryIcon
                        aria-hidden="true"
                        className="h-4 w-4 text-[#B77932]"
                        strokeWidth={2}
                      />

                      <span>{pet.category}</span>
                    </div>

                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-[#FFF9EF]/90 text-[#B77932] shadow-lg">
                      <BadgeCheck
                        aria-hidden="true"
                        className="h-5 w-5"
                        strokeWidth={2}
                      />
                    </span>
                  </div>
                </div>

                <div className="relative p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase leading-none tracking-[0.18em] text-[#9A6429]/82">
                        Companion
                      </p>

                      <h3 className="mt-2 truncate font-[Poppins] text-2xl font-bold leading-tight tracking-tight text-[#2A1B14]">
                        {pet.name}
                      </h3>
                    </div>

                    <Heart
                      aria-hidden="true"
                      className="mt-1 h-5 w-5 shrink-0 text-[#B77932]/72"
                      strokeWidth={1.9}
                    />
                  </div>

                  <p className="mt-2 truncate text-sm font-bold leading-5 text-[#6A4B35]">
                    {pet.breed}

                    <span className="mx-2 text-[#C99045]/70">
                      /
                    </span>

                    <span className="font-semibold text-[#6A4B35]/78">
                      {pet.category}
                    </span>
                  </p>

                  {pet.description ? (
                    <p className="mt-4 line-clamp-2 rounded-2xl border border-[#3A241A]/8 bg-[#FFF4E4]/46 px-3 py-2.5 text-sm leading-6 text-[#5E4A3D]/88">
                      {pet.description}
                    </p>
                  ) : null}

                  <dl className="mt-5 grid overflow-hidden rounded-2xl border border-[#3A241A]/8 bg-white/32 text-sm">
                    <div className="flex items-center justify-between gap-4 border-b border-[#3A241A]/8 px-3 py-2.5">
                      <dt className="font-semibold uppercase tracking-[0.12em] text-[#7A6253]/74">
                        Age
                      </dt>

                      <dd className="text-right font-bold text-[#2A1B14]">
                        {pet.age ?? ""}
                      </dd>
                    </div>

                    <div className="flex items-center justify-between gap-4 px-3 py-2.5">
                      <dt className="font-semibold uppercase tracking-[0.12em] text-[#7A6253]/74">
                        Price
                      </dt>

                      <dd className="text-right font-[Poppins] text-lg font-bold text-[#9A6429]">
                        {formatPrice(pet.price)}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <a
                      href={`tel:${settings.phone}`}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#B77932]/45 bg-[#FFF9EF] px-4 text-sm font-bold text-[#8D5B26] shadow-lg outline-none transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFF4E4] focus-visible:ring-2 focus-visible:ring-[#C99045] focus-visible:ring-offset-4"
                    >
                      <Phone
                        aria-hidden="true"
                        className="h-4 w-4 text-[#B77932]"
                        strokeWidth={2.2}
                      />

                      <span>Call Now</span>
                    </a>

                    <a
                      href={whatsappHref}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1F9F5C] to-[#128C7E] px-4 text-sm font-bold text-white shadow-lg shadow-emerald-900/15 outline-none transition duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-4"
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
        className="
          mx-auto
          mt-20
          flex
          w-full
          justify-center
          pb-4
          lg:relative
          lg:left-[50vw]
          lg:mx-0
          lg:w-[1120px]
          lg:-translate-x-1/2
          [&_a]:h-14
          [&_a]:rounded-full
          [&_a]:px-8
          [&_a]:text-base
          [&_a]:font-bold
        "
      >
        <Button href="/pets">View All Pets</Button>
      </motion.div>
    </section>
  );
}