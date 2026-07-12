"use client";

import { motion, type Variants } from "framer-motion";
import { Images, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import Button from "@/components/ui/Button";
import { getGalleryImages, type GalleryImage } from "@/lib/gallery";

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

export default function HappyFamiliesGallery() {
  const [homepageImages, setHomepageImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadGalleryImages() {
      try {
        setLoading(true);

        const images = await getGalleryImages();

        if (isMounted) {
          setHomepageImages(
            (images ?? [])
              .filter((image) => image.show_on_homepage === true)
              .slice(0, 8),
          );
        }
      } catch (error) {
        console.error("Error loading homepage gallery images:", error);

        if (isMounted) {
          setHomepageImages([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadGalleryImages();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="gallery"
      aria-labelledby="happy-families-gallery-heading"
      className="relative isolate overflow-visible bg-[#FFF9EF] py-28 font-[Inter] sm:py-32 lg:py-36"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-screen overflow-hidden">
        <div className="absolute inset-0 bg-[#FFF9EF]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(247,235,221,0.82),transparent_34%),radial-gradient(circle_at_86%_22%,rgba(201,144,69,0.11),transparent_30%),linear-gradient(180deg,#FFF9EF_0%,#FFF4E4_52%,#FFF9EF_100%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(58,36,26,0.025)_46%,transparent_76%)]" />
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

          <span>Happy Families</span>
        </motion.div>

        <motion.h2
          id="happy-families-gallery-heading"
          variants={fadeUpVariants}
          className="mt-8 w-full text-center font-[Poppins] text-4xl font-bold leading-[1.18] tracking-[-0.035em] text-[#2A1B14] sm:text-5xl sm:leading-[1.15] lg:text-[3.6rem] lg:leading-[1.12]"
        >
          <span className="block text-center">Real Families.</span>

          <span className="block text-center text-[#9A6429]">
            Real Happiness.
          </span>
        </motion.h2>

        <motion.div
          variants={fadeUpVariants}
          aria-hidden="true"
          className="mt-8 flex w-full items-center justify-center gap-3"
        >
          <span className="h-px w-12 bg-[#C99045]/55" />

          <Images
            className="h-5 w-5 shrink-0 text-[#C99045]"
            strokeWidth={1.7}
          />

          <span className="h-px w-12 bg-[#C99045]/55" />
        </motion.div>

        <motion.p
          variants={fadeUpVariants}
          className="mx-auto mt-8 max-w-[700px] text-center text-base leading-8 text-[#5E4A3D] sm:text-lg sm:leading-9"
        >
          Every smile tells a story. Meet some of the wonderful families who
          found their perfect companion at Bunny Pets Zone.
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
          {Array.from({ length: 6 }).map((_, index) => (
            <motion.article
              key={index}
              variants={cardVariants}
              className="overflow-hidden rounded-[1.75rem] border border-[#3A241A]/[0.07] bg-[#FFFEFB] p-2 shadow-[0_18px_48px_rgba(58,36,26,0.065)]"
            >
              <div className="aspect-[8/9] overflow-hidden rounded-[1.4rem] bg-[#FFF4E4]">
                <div className="h-full w-full animate-pulse bg-[#B77932]/10" />
              </div>
            </motion.article>
          ))}
        </motion.div>
      ) : homepageImages.length === 0 ? (
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
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
          <Images
            aria-hidden="true"
            className="mx-auto h-10 w-10 text-[#B77932]"
            strokeWidth={1.8}
          />

          <p className="mt-5 font-[Poppins] text-2xl font-bold text-[#2A1B14]">
            No gallery images yet.
          </p>

          <p className="mx-auto mt-3 max-w-md text-base leading-7 text-[#5E4A3D]">
            Happy family moments will appear here once they are added.
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
          {homepageImages.map((image) => (
            <motion.article
              key={image.id}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 24,
              }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-[#3A241A]/[0.07] bg-[#FFFEFB] p-2 shadow-[0_18px_48px_rgba(58,36,26,0.065)] transition duration-300 hover:border-[#B77932]/25 hover:shadow-[0_24px_64px_rgba(58,36,26,0.10)]"
            >
              <div className="relative aspect-[8/9] overflow-hidden rounded-[1.4rem] bg-[#FFF4E4]">
                <img
                  src={image.image_url}
                  alt="Happy family with their pet from Bunny Pets Zone"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2A1B14]/24 via-transparent to-transparent opacity-70 transition duration-300 group-hover:opacity-50" />

                <div className="pointer-events-none absolute inset-x-5 bottom-5 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-70" />
              </div>
            </motion.article>
          ))}
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
        <Button href="/gallery">
          <span className="inline-flex items-center gap-2">
            <Images
              aria-hidden="true"
              className="h-5 w-5"
              strokeWidth={2}
            />

            View Full Gallery
          </span>
        </Button>
      </motion.div>
    </section>
  );
}