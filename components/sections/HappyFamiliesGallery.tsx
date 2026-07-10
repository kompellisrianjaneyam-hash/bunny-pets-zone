
"use client";

import { motion, type Variants } from "framer-motion";
import { Images, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import {
  getGalleryImages,
  type GalleryImage,
} from "@/lib/gallery";

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
            <Sparkles aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
            <span>Happy Families</span>
          </motion.div>

          <motion.h2
            id="happy-families-gallery-heading"
            variants={fadeUpVariants}
            className="mt-7 text-balance font-[Poppins] text-4xl font-bold leading-tight tracking-tight text-[#2F2017] sm:text-5xl lg:text-6xl"
          >
            Real Families.
            <span className="block text-[#D59A3A]">Real Happiness.</span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-[#5B4A3F] sm:text-xl"
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
            viewport={{ once: true, amount: 0.15 }}
            className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.article
                key={index}
                variants={cardVariants}
                className="group overflow-hidden rounded-[2rem] border border-[#ECECEC] bg-white/50 p-2 shadow-xl shadow-[#2F2017]/5 backdrop-blur-xl transition-colors duration-300 hover:border-[#D59A3A] hover:shadow-2xl hover:shadow-[#2F2017]/10"
              >
                <div className="aspect-[8/9] overflow-hidden rounded-[1.6rem] bg-[#FFF8F0]">
                  <div className="h-full w-full animate-pulse bg-[#D59A3A]/10" />
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
            className="mt-16 rounded-[2rem] border border-[#ECECEC] bg-white/50 p-10 text-center shadow-xl shadow-[#2F2017]/5 backdrop-blur-xl"
          >
            <Images
              aria-hidden="true"
              className="mx-auto h-10 w-10 text-[#D59A3A]"
              strokeWidth={1.8}
            />
            <p className="mt-5 font-[Poppins] text-2xl font-bold text-[#2F2017]">
              No gallery images yet.
            </p>
            <p className="mx-auto mt-3 max-w-md text-base leading-7 text-[#5B4A3F]">
              Happy family moments will appear here once they are added.
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {homepageImages.map((image) => (
              <motion.article
                key={image.id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
                className="group overflow-hidden rounded-[2rem] border border-[#ECECEC] bg-white/50 p-2 shadow-xl shadow-[#2F2017]/5 backdrop-blur-xl transition-colors duration-300 hover:border-[#D59A3A] hover:shadow-2xl hover:shadow-[#2F2017]/10"
              >
                <div className="aspect-[8/9] overflow-hidden rounded-[1.6rem] bg-[#FFF8F0]">
                  <img
                    src={image.image_url}
                    alt="Happy family with their pet from Bunny Pets Zone"
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
                  />
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
          className="mt-14 flex justify-center [&_a]:h-14 [&_a]:rounded-full [&_a]:px-8 [&_a]:text-base [&_a]:font-bold"
        >
          <Button href="/gallery">
            <span className="inline-flex items-center gap-2">
              <Images aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
              View Full Gallery
            </span>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}