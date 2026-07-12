"use client";

import {
  AnimatePresence,
  motion,
  type Variants,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Images,
  MessageCircle,
  Sparkles,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  getGalleryImages,
  type GalleryImage,
} from "@/lib/gallery";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const imageVariants: Variants = {
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
      duration: 0.52,
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
  const [galleryImages, setGalleryImages] =
    useState<GalleryImage[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [selectedIndex, setSelectedIndex] =
    useState<number | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  const closeButtonRef =
    useRef<HTMLButtonElement>(null);

  const selectedImage =
    selectedIndex === null
      ? null
      : galleryImages[selectedIndex] ?? null;

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const showPreviousImage = () => {
    setSelectedIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return currentIndex === 0
        ? galleryImages.length - 1
        : currentIndex - 1;
    });
  };

  const showNextImage = () => {
    setSelectedIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return currentIndex === galleryImages.length - 1
        ? 0
        : currentIndex + 1;
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
        console.error(
          "Error loading gallery images:",
          err,
        );

        if (isMounted) {
          setError(
            "Unable to load gallery images right now.",
          );

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
    if (selectedIndex === null) {
      return;
    }

    closeButtonRef.current?.focus();

    document.body.style.overflow = "hidden";

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        closeModal();
      }

      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }

      if (event.key === "ArrowRight") {
        showNextImage();
      }

      if (
        event.key === "Tab" &&
        modalRef.current
      ) {
        const focusableElements =
          modalRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
          );

        if (focusableElements.length === 0) {
          return;
        }

        const firstElement =
          focusableElements[0];

        const lastElement =
          focusableElements[
            focusableElements.length - 1
          ];

        if (
          event.shiftKey &&
          document.activeElement === firstElement
        ) {
          event.preventDefault();
          lastElement.focus();
        }

        if (
          !event.shiftKey &&
          document.activeElement === lastElement
        ) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow = "";

      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [
    selectedIndex,
    galleryImages.length,
  ]);

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#FFF9EF] font-[Inter]">
      {/* HERO */}

      <section
        className="
          relative
          isolate
          w-full
          overflow-hidden
          bg-[#FFF9EF]
          pb-20
          pt-32
          sm:pb-24
          sm:pt-36
          lg:pb-28
          lg:pt-40
        "
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[#FFF9EF]" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(201,144,69,0.15),transparent_30%),radial-gradient(circle_at_86%_24%,rgba(247,235,221,0.8),transparent_30%),linear-gradient(180deg,#FFF9EF_0%,#FFF4E4_52%,#FFF9EF_100%)]" />

          <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-[#B77932]/10 blur-3xl" />

          <div className="absolute -right-28 top-36 h-96 w-96 rounded-full bg-[#C99045]/14 blur-3xl" />
        </div>

        <div
          className="
            mx-auto
            w-full
            max-w-[1180px]
            px-5
            sm:px-8
            lg:px-10
          "
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="
              mx-auto
              flex
              w-full
              max-w-[900px]
              flex-col
              items-center
              justify-center
              text-center
            "
          >
            <motion.div
              variants={fadeUpVariants}
              className="
                mx-auto
                inline-flex
                min-h-10
                items-center
                justify-center
                gap-2
                rounded-full
                border
                border-[#3A241A]/10
                bg-[#FFF9EF]/72
                px-5
                py-2.5
                text-center
                text-xs
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#9A6429]
                shadow-[0_10px_32px_rgba(58,36,26,0.07)]
                backdrop-blur-xl
              "
            >
              <Sparkles
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-[#B77932]"
                strokeWidth={2}
              />

              <span>Our Gallery</span>
            </motion.div>

            <motion.h1
              variants={fadeUpVariants}
              className="
                mx-auto
                mt-8
                w-full
                max-w-[900px]
                text-center
                font-[Poppins]
                text-[2.75rem]
                font-bold
                leading-[1.08]
                tracking-[-0.04em]
                text-[#2A1B14]
                sm:text-[3.8rem]
                lg:text-[4.4rem]
              "
            >
              <span className="block w-full text-center">
                Happy Families
              </span>

              <span className="block w-full text-center text-[#9A6429]">
                &amp; Beautiful Pets
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUpVariants}
              className="
                mx-auto
                mt-8
                w-full
                max-w-[760px]
                text-center
                text-base
                font-medium
                leading-8
                text-[#5E4A3D]
                sm:text-lg
                sm:leading-9
              "
            >
              Browse real moments from Bunny Pets
              Zone. Every image showcases the
              happiness of pets and the families who
              welcomed them home.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* GALLERY */}

      <section
        aria-labelledby="gallery-grid-heading"
        className="
          relative
          w-full
          bg-[#FFF9EF]
          pb-28
          sm:pb-32
          lg:pb-36
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1180px]
            px-5
            sm:px-8
            lg:px-10
          "
        >
          <h2
            id="gallery-grid-heading"
            className="sr-only"
          >
            Bunny Pets Zone gallery images
          </h2>

          {loading ? (
            <GalleryState
              title="Loading Gallery"
              description="Please wait while we load the latest Bunny Pets Zone moments."
              loading
            />
          ) : error ? (
            <GalleryState
              title="Gallery Unavailable"
              description={error}
            />
          ) : galleryImages.length === 0 ? (
            <GalleryState
              title="No Gallery Images Yet"
              description="New Bunny Pets Zone moments will appear here once they are added."
            />
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="
                mx-auto
                w-full
                columns-1
                gap-7
                sm:columns-2
                lg:columns-3
                lg:gap-8
              "
            >
              {galleryImages.map(
                (image, index) => {
                  const dimensions =
                    getImageDimensions(
                      image.image_url,
                    );

                  const title =
                    getImageTitle(index);

                  return (
                    <motion.button
                      key={image.id}
                      type="button"
                      variants={imageVariants}
                      whileHover={{
                        y: -6,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 24,
                      }}
                      onClick={() =>
                        setSelectedIndex(index)
                      }
                      aria-label={`Open ${title} image`}
                      className="
                        group
                        mb-7
                        block
                        w-full
                        break-inside-avoid
                        overflow-hidden
                        rounded-[2rem]
                        border
                        border-[#3A241A]/10
                        bg-[#FFF9EF]/72
                        p-2.5
                        text-left
                        shadow-[0_20px_55px_rgba(58,36,26,0.08)]
                        outline-none
                        backdrop-blur-xl
                        transition
                        duration-300
                        hover:border-[#C99045]/45
                        hover:shadow-[0_28px_70px_rgba(58,36,26,0.12)]
                        focus-visible:ring-2
                        focus-visible:ring-[#C99045]
                        focus-visible:ring-offset-4
                        focus-visible:ring-offset-[#FFF9EF]
                        lg:mb-8
                      "
                    >
                      <span
                        className="
                          relative
                          block
                          overflow-hidden
                          rounded-[1.55rem]
                          bg-[#FFF4E4]
                        "
                      >
                        <Image
                          src={image.image_url}
                          alt={title}
                          width={dimensions.width}
                          height={dimensions.height}
                          unoptimized
                          loading={
                            index < 6
                              ? "eager"
                              : "lazy"
                          }
                          sizes="
                            (min-width: 1024px) 380px,
                            (min-width: 640px) 50vw,
                            100vw
                          "
                          className="
                            h-auto
                            w-full
                            object-cover
                            transition
                            duration-500
                            ease-out
                            group-hover:scale-[1.035]
                          "
                        />

                        <span
                          className="
                            pointer-events-none
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-[#2A1B14]/12
                            via-transparent
                            to-white/5
                            opacity-70
                            transition
                            duration-300
                            group-hover:opacity-40
                          "
                        />
                      </span>
                    </motion.button>
                  );
                },
              )}
            </motion.div>
          )}

          {/* CTA */}

          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.25,
            }}
            className="
              mx-auto
              mt-24
              w-full
              overflow-hidden
              rounded-[2.25rem]
              border
              border-[#3A241A]/10
              bg-[#FFF9EF]/72
              px-7
              py-12
              text-center
              shadow-[0_26px_80px_rgba(58,36,26,0.10)]
              backdrop-blur-2xl
              sm:px-12
              sm:py-14
              lg:px-16
              lg:py-16
            "
          >
            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                border
                border-[#C99045]/20
                bg-[#FFF4E4]
                text-[#B77932]
                shadow-[0_12px_30px_rgba(58,36,26,0.07)]
              "
            >
              <Images
                aria-hidden="true"
                className="h-6 w-6"
                strokeWidth={1.8}
              />
            </div>

            <h2
              className="
                mx-auto
                mt-7
                w-full
                max-w-[760px]
                text-center
                font-[Poppins]
                text-3xl
                font-bold
                leading-tight
                tracking-[-0.03em]
                text-[#2A1B14]
                sm:text-4xl
              "
            >
              Ready to Find Your Perfect Companion?
            </h2>

            <p
              className="
                mx-auto
                mt-6
                w-full
                max-w-[680px]
                text-center
                text-base
                leading-8
                text-[#5E4A3D]
                sm:text-lg
                sm:leading-9
              "
            >
              Visit Bunny Pets Zone or chat with us
              on WhatsApp to know about available
              pets.
            </p>

            <div className="mt-9 flex w-full justify-center">
              <Link
                href="https://wa.me/917680904157"
                aria-label="Chat with Bunny Pets Zone on WhatsApp"
                className="
                  inline-flex
                  min-h-[56px]
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-gradient-to-r
                  from-[#8A5522]
                  via-[#C99045]
                  to-[#A86424]
                  px-9
                  py-4
                  text-center
                  text-base
                  font-bold
                  leading-none
                  text-white
                  shadow-[0_16px_38px_rgba(138,85,34,0.24)]
                  outline-none
                  transition
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-[0_20px_46px_rgba(138,85,34,0.3)]
                  focus-visible:ring-2
                  focus-visible:ring-[#C99045]
                  focus-visible:ring-offset-4
                  focus-visible:ring-offset-[#FFF9EF]
                "
              >
                <MessageCircle
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0"
                  strokeWidth={2}
                />

                <span className="whitespace-nowrap">
                  Chat on WhatsApp
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* IMAGE MODAL */}

      <AnimatePresence>
        {selectedImage &&
        selectedIndex !== null ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-modal-title"
            className="
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              bg-black/72
              p-4
              backdrop-blur-xl
              sm:p-6
            "
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={closeModal}
          >
            <motion.div
              ref={modalRef}
              className="
                relative
                flex
                h-full
                max-h-[88vh]
                w-full
                max-w-[1180px]
                flex-col
                overflow-hidden
                rounded-[2rem]
                border
                border-white/15
                bg-black/50
                shadow-2xl
              "
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 16,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 16,
              }}
              transition={{
                duration: 0.24,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <div
                className="
                  flex
                  min-h-[76px]
                  items-center
                  justify-between
                  gap-5
                  border-b
                  border-white/10
                  bg-black/30
                  px-5
                  py-4
                  backdrop-blur-xl
                  sm:px-7
                "
              >
                <h2
                  id="gallery-modal-title"
                  className="
                    font-[Poppins]
                    text-lg
                    font-bold
                    text-white
                    sm:text-xl
                  "
                >
                  {getImageTitle(selectedIndex)}
                </h2>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeModal}
                  aria-label="Close gallery image"
                  className="
                    inline-flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/15
                    bg-white/10
                    text-white
                    outline-none
                    transition
                    duration-300
                    hover:bg-white/20
                    focus-visible:ring-2
                    focus-visible:ring-[#C99045]
                  "
                >
                  <X
                    aria-hidden="true"
                    className="h-5 w-5"
                    strokeWidth={2.2}
                  />
                </button>
              </div>

              <div className="relative min-h-0 flex-1 bg-black/20">
                <Image
                  src={selectedImage.image_url}
                  alt={getImageTitle(
                    selectedIndex,
                  )}
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
                  className="
                    absolute
                    left-4
                    top-1/2
                    inline-flex
                    h-14
                    w-14
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/15
                    bg-black/40
                    text-white
                    shadow-xl
                    backdrop-blur-xl
                    transition
                    hover:bg-black/60
                  "
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
                  className="
                    absolute
                    right-4
                    top-1/2
                    inline-flex
                    h-14
                    w-14
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/15
                    bg-black/40
                    text-white
                    shadow-xl
                    backdrop-blur-xl
                    transition
                    hover:bg-black/60
                  "
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

function GalleryState({
  title,
  description,
  loading = false,
}: {
  title: string;
  description: string;
  loading?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      className="
        mx-auto
        w-full
        max-w-[760px]
        rounded-[2.25rem]
        border
        border-[#3A241A]/10
        bg-[#FFF9EF]/72
        px-8
        py-12
        text-center
        shadow-[0_26px_80px_rgba(58,36,26,0.10)]
        backdrop-blur-2xl
        sm:px-12
        sm:py-14
      "
    >
      <div
        className="
          mx-auto
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          border
          border-[#C99045]/20
          bg-[#FFF4E4]
          text-[#B77932]
        "
      >
        <Images
          aria-hidden="true"
          className={`h-6 w-6 ${
            loading ? "animate-pulse" : ""
          }`}
          strokeWidth={1.8}
        />
      </div>

      <h2
        className="
          mx-auto
          mt-7
          w-full
          text-center
          font-[Poppins]
          text-3xl
          font-bold
          leading-tight
          tracking-[-0.03em]
          text-[#2A1B14]
          sm:text-4xl
        "
      >
        {title}
      </h2>

      <p
        className="
          mx-auto
          mt-5
          w-full
          max-w-[560px]
          text-center
          text-base
          leading-8
          text-[#5E4A3D]
          sm:text-lg
        "
      >
        {description}
      </p>
    </motion.div>
  );
}