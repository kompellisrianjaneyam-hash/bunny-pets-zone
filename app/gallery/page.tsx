
"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, MessageCircle, Sparkles, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import Container from "@/components/layout/Container";
import {
  getGalleryImages,
  type GalleryImage,
} from "@/lib/gallery";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
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

const imageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.56,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function getImageDimensions(image: string) {
  const match = image.match(/(\d+)x(\d+)/);

  if (!match) {
    return {
      width: 1000,
      height: 1000,
    };
  }

  return {
    width: Number(match[1]),
    height: Number(match[2]),
  };
}

function getImageTitle(index: number) {
  return `Image ${index + 1}`;
}

export default function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const selectedImage =
    selectedIndex === null ? null : galleryImages[selectedIndex] ?? null;

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const showPreviousImage = () => {
    setSelectedIndex((currentIndex) => {
      if (currentIndex === null) return currentIndex;
      return currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
    });
  };

  const showNextImage = () => {
    setSelectedIndex((currentIndex) => {
      if (currentIndex === null) return currentIndex;
      return currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1;
    });
  };

  useEffect(() => {
    let isMounted = true;

    async function loadGalleryImages() {
      try {
        setLoading(true);
        setError(null);

        const images = await getGalleryImages();

        if (isMounted) {
          setGalleryImages(images ?? []);
        }
      } catch (err) {
        console.error("Error loading gallery images:", err);

        if (isMounted) {
          setError("Unable to load gallery images right now.");
          setGalleryImages([]);
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

  useEffect(() => {
    if (selectedIndex === null) return;

    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }

      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }

      if (event.key === "ArrowRight") {
        showNextImage();
      }

      if (event.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }

        if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, galleryImages.length]);

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
              <span>Our Gallery</span>
            </motion.div>

            <motion.h1
              variants={fadeUpVariants}
              className="mt-7 text-balance font-[Poppins] text-5xl font-bold leading-tight tracking-tight text-[#2F2017] sm:text-6xl lg:text-7xl"
            >
              Happy Families &amp; Beautiful Pets
            </motion.h1>

            <motion.p
              variants={fadeUpVariants}
              className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-[#5B4A3F] sm:text-xl"
            >
              Browse real moments from Bunny Pets Zone. Every image showcases
              the happiness of pets and the families who welcomed them home.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      <section
        aria-labelledby="gallery-grid-heading"
        className="relative bg-[#FFF8F0] px-4 pb-24 sm:px-6 sm:pb-28 lg:px-8 lg:pb-32"
      >
        <Container>
          <h2 id="gallery-grid-heading" className="sr-only">
            Bunny Pets Zone gallery images
          </h2>

          {loading ? (
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="rounded-[2.25rem] border border-[#ECECEC] bg-white/58 p-8 text-center shadow-[0_26px_80px_rgba(47,32,23,0.10)] backdrop-blur-2xl sm:p-10 lg:p-12"
            >
              <h2 className="font-[Poppins] text-3xl font-bold tracking-tight text-[#2F2017] sm:text-4xl">
                Loading Gallery
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#5B4A3F] sm:text-lg">
                Please wait while we load the latest Bunny Pets Zone moments.
              </p>
            </motion.div>
          ) : error ? (
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="rounded-[2.25rem] border border-[#ECECEC] bg-white/58 p-8 text-center shadow-[0_26px_80px_rgba(47,32,23,0.10)] backdrop-blur-2xl sm:p-10 lg:p-12"
            >
              <h2 className="font-[Poppins] text-3xl font-bold tracking-tight text-[#2F2017] sm:text-4xl">
                Gallery Unavailable
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#5B4A3F] sm:text-lg">
                {error}
              </p>
            </motion.div>
          ) : galleryImages.length === 0 ? (
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="rounded-[2.25rem] border border-[#ECECEC] bg-white/58 p-8 text-center shadow-[0_26px_80px_rgba(47,32,23,0.10)] backdrop-blur-2xl sm:p-10 lg:p-12"
            >
              <h2 className="font-[Poppins] text-3xl font-bold tracking-tight text-[#2F2017] sm:text-4xl">
                No Gallery Images Yet
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#5B4A3F] sm:text-lg">
                New Bunny Pets Zone moments will appear here once they are added.
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="columns-2 gap-4 md:columns-3 md:gap-5 lg:columns-4 lg:gap-6"
            >
              {galleryImages.map((image, index) => {
                const dimensions = getImageDimensions(image.image_url);
                const title = getImageTitle(index);

                return (
                  <motion.button
                    key={image.id}
                    type="button"
                    variants={imageVariants}
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 320, damping: 24 }}
                    onClick={() => setSelectedIndex(index)}
                    aria-label={`Open ${title} image`}
                    className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-[28px] border border-[#ECECEC] bg-white/50 p-2 text-left shadow-xl shadow-[#2F2017]/5 outline-none backdrop-blur-xl transition-colors duration-300 hover:border-[#D59A3A] hover:shadow-2xl hover:shadow-[#2F2017]/10 focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0] md:mb-5 lg:mb-6"
                  >
                    <span className="block overflow-hidden rounded-[22px] bg-[#FFF8F0]">
                      <Image
                        src={image.image_url}
                        alt={title}
                        width={dimensions.width}
                        height={dimensions.height}
                        unoptimized
                        loading={index < 8 ? "eager" : "lazy"}
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                        className="h-auto w-full object-cover transition duration-500 ease-out group-hover:scale-105"
                      />
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          )}

          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            className="mt-20 overflow-hidden rounded-[2.25rem] border border-[#ECECEC] bg-white/58 p-8 text-center shadow-[0_26px_80px_rgba(47,32,23,0.10)] backdrop-blur-2xl sm:p-10 lg:p-12"
          >
            <h2 className="font-[Poppins] text-3xl font-bold tracking-tight text-[#2F2017] sm:text-4xl">
              Ready to Find Your Perfect Companion?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#5B4A3F] sm:text-lg">
              Visit Bunny Pets Zone or chat with us on WhatsApp to know about
              available pets.
            </p>

            <div className="mt-8 flex justify-center">
              <Link
                href="https://wa.me/917680904157"
                aria-label="Chat with Bunny Pets Zone on WhatsApp"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#D59A3A] px-8 text-base font-bold text-white shadow-xl shadow-[#D59A3A]/20 outline-none transition duration-300 hover:-translate-y-0.5 hover:bg-[#c68b31] hover:shadow-2xl hover:shadow-[#D59A3A]/25 focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0]"
              >
                <MessageCircle
                  aria-hidden="true"
                  className="h-5 w-5"
                  strokeWidth={2}
                />
                <span>Chat on WhatsApp</span>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      <AnimatePresence>
        {selectedImage && selectedIndex !== null ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-modal-title"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/72 p-4 backdrop-blur-xl sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              ref={modalRef}
              className="relative flex h-full max-h-[88vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-white/15 bg-black/50 shadow-2xl"
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 18 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-black/30 px-4 py-4 backdrop-blur-xl sm:px-6">
                <h2
                  id="gallery-modal-title"
                  className="font-[Poppins] text-lg font-bold text-white sm:text-xl"
                >
                  {getImageTitle(selectedIndex)}
                </h2>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeModal}
                  aria-label="Close gallery image"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white outline-none transition duration-300 hover:bg-white/18 focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                >
                  <X aria-hidden="true" className="h-5 w-5" strokeWidth={2.2} />
                </button>
              </div>

              <div className="relative min-h-0 flex-1 bg-black/20">
                <Image
                  src={selectedImage.image_url}
                  alt={getImageTitle(selectedIndex)}
                  fill
                  unoptimized
                  priority
                  sizes="100vw"
                  className="object-contain"
                />

                <button
                  type="button"
                  onClick={showPreviousImage}
                  aria-label="View previous image"
                  className="absolute left-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-xl outline-none backdrop-blur-xl transition duration-300 hover:bg-white/18 focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-black sm:left-5"
                >
                  <ArrowLeft
                    aria-hidden="true"
                    className="h-5 w-5"
                    strokeWidth={2.2}
                  />
                </button>

                <button
                  type="button"
                  onClick={showNextImage}
                  aria-label="View next image"
                  className="absolute right-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-xl outline-none backdrop-blur-xl transition duration-300 hover:bg-white/18 focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-black sm:right-5"
                >
                  <ArrowRight
                    aria-hidden="true"
                    className="h-5 w-5"
                    strokeWidth={2.2}
                  />
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}