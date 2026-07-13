"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type Viewport = {
  width: number;
  height: number;
};

type Spark = {
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  moveX: number;
  moveY: number;
  opacity: number;
};

type Orb = {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
};

const SPARKS: readonly Spark[] = [
  { left: 7, top: 24, size: 2, delay: 0.1, duration: 3.6, moveX: 12, moveY: -68, opacity: 0.7 },
  { left: 12, top: 73, size: 4, delay: 0.4, duration: 4.1, moveX: -8, moveY: -92, opacity: 0.9 },
  { left: 17, top: 42, size: 2, delay: 0.8, duration: 3.8, moveX: 10, moveY: -76, opacity: 0.72 },
  { left: 22, top: 84, size: 5, delay: 0.2, duration: 4.4, moveX: 14, moveY: -108, opacity: 1 },
  { left: 27, top: 31, size: 3, delay: 1, duration: 3.9, moveX: -12, moveY: -83, opacity: 0.8 },
  { left: 31, top: 65, size: 2, delay: 0.55, duration: 3.7, moveX: 7, moveY: -72, opacity: 0.68 },
  { left: 35, top: 17, size: 4, delay: 1.2, duration: 4.2, moveX: -10, moveY: -99, opacity: 0.92 },
  { left: 39, top: 78, size: 3, delay: 0.35, duration: 4, moveX: 11, moveY: -88, opacity: 0.82 },
  { left: 43, top: 38, size: 2, delay: 0.75, duration: 3.6, moveX: -7, moveY: -69, opacity: 0.7 },
  { left: 47, top: 89, size: 5, delay: 1.1, duration: 4.5, moveX: 13, moveY: -112, opacity: 1 },
  { left: 51, top: 21, size: 3, delay: 0.15, duration: 3.9, moveX: -9, moveY: -81, opacity: 0.84 },
  { left: 55, top: 69, size: 2, delay: 0.9, duration: 3.7, moveX: 8, moveY: -74, opacity: 0.7 },
  { left: 59, top: 34, size: 4, delay: 0.45, duration: 4.2, moveX: 12, moveY: -97, opacity: 0.94 },
  { left: 63, top: 82, size: 3, delay: 1.25, duration: 4, moveX: -11, moveY: -90, opacity: 0.82 },
  { left: 67, top: 14, size: 2, delay: 0.6, duration: 3.6, moveX: 7, moveY: -67, opacity: 0.68 },
  { left: 71, top: 58, size: 5, delay: 0.25, duration: 4.4, moveX: -13, moveY: -106, opacity: 1 },
  { left: 75, top: 29, size: 3, delay: 1.05, duration: 3.9, moveX: 10, moveY: -85, opacity: 0.84 },
  { left: 79, top: 76, size: 2, delay: 0.5, duration: 3.7, moveX: -8, moveY: -73, opacity: 0.7 },
  { left: 83, top: 44, size: 4, delay: 1.3, duration: 4.2, moveX: 13, moveY: -101, opacity: 0.94 },
  { left: 87, top: 87, size: 3, delay: 0.7, duration: 4, moveX: -10, moveY: -91, opacity: 0.82 },
  { left: 91, top: 19, size: 2, delay: 0.3, duration: 3.6, moveX: 9, moveY: -70, opacity: 0.7 },
  { left: 95, top: 62, size: 5, delay: 1.15, duration: 4.5, moveX: -14, moveY: -110, opacity: 1 },
  { left: 10, top: 53, size: 3, delay: 1.4, duration: 4, moveX: 8, moveY: -87, opacity: 0.82 },
  { left: 25, top: 92, size: 2, delay: 0.65, duration: 3.8, moveX: -7, moveY: -78, opacity: 0.7 },
  { left: 38, top: 51, size: 4, delay: 0.05, duration: 4.3, moveX: 11, moveY: -103, opacity: 0.95 },
  { left: 62, top: 48, size: 3, delay: 0.85, duration: 3.9, moveX: -9, moveY: -84, opacity: 0.82 },
  { left: 74, top: 93, size: 2, delay: 1.35, duration: 3.7, moveX: 7, moveY: -71, opacity: 0.7 },
  { left: 89, top: 37, size: 4, delay: 0.55, duration: 4.2, moveX: -12, moveY: -98, opacity: 0.94 },
];

const ORBS: readonly Orb[] = [
  { x: 12, y: 22, size: 160, delay: 0, duration: 5.8 },
  { x: 83, y: 18, size: 210, delay: 0.4, duration: 6.2 },
  { x: 8, y: 78, size: 240, delay: 0.7, duration: 6.5 },
  { x: 88, y: 72, size: 180, delay: 0.2, duration: 5.9 },
  { x: 30, y: 12, size: 110, delay: 0.9, duration: 5.6 },
  { x: 70, y: 88, size: 130, delay: 0.5, duration: 6.1 },
];

const RINGS = [
  { size: 190, delay: 0 },
  { size: 290, delay: 0.08 },
  { size: 410, delay: 0.16 },
  { size: 550, delay: 0.24 },
  { size: 720, delay: 0.32 },
] as const;

const TOTAL_DURATION_SECONDS = 7.8;
const TOTAL_DURATION_MS = 7900;
const REDUCED_DURATION_MS = 950;

export default function EntranceReveal() {
  const shouldReduceMotion = useReducedMotion();
  const previousOverflow = useRef("");
  const [visible, setVisible] = useState(true);
  const [viewport, setViewport] = useState<Viewport>({
    width: 1440,
    height: 900,
  });

  useEffect(() => {
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewport();

    window.addEventListener("resize", updateViewport, {
      passive: true,
    });

    const timer = window.setTimeout(
      () => setVisible(false),
      shouldReduceMotion ? REDUCED_DURATION_MS : TOTAL_DURATION_MS,
    );

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", updateViewport);
      document.body.style.overflow = previousOverflow.current;
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = previousOverflow.current;
    }
  }, [visible]);

  const scene = useMemo(() => {
    const mobile = viewport.width < 640;
    const tablet = viewport.width >= 640 && viewport.width < 1024;
    const short = viewport.height < 700;

    const centerX = viewport.width / 2;
    const centerY = viewport.height * (short ? 0.42 : 0.45);

    const targetX = mobile ? 48 : tablet ? 66 : 82;
    const targetY = mobile ? 46 : 58;

    const logoMoveX = targetX - centerX;
    const logoMoveY = targetY - centerY;

    const arcPath = `M ${centerX} ${centerY}
      C ${centerX - viewport.width * 0.05} ${centerY - viewport.height * 0.27},
        ${targetX + viewport.width * 0.16} ${targetY + viewport.height * 0.16},
        ${targetX} ${targetY}`;

    return {
      mobile,
      short,
      centerX,
      centerY,
      targetX,
      targetY,
      logoMoveX,
      logoMoveY,
      arcPath,
    };
  }, [viewport]);

  if (shouldReduceMotion) {
    return (
      <AnimatePresence>
        {visible && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[9999] h-[100dvh] w-screen overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#FFFFF8_0%,#FFF8EA_35%,#FBE8C5_70%,#E7B968_140%)]" />

            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/logos/bunny-pets-zone-logo.png"
                alt=""
                width={500}
                height={500}
                priority
                className="h-auto w-[220px] object-contain sm:w-[300px]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[9999] h-[100dvh] w-screen overflow-hidden [transform:translateZ(0)]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          {/* CINEMATIC CREAM-GOLD WORLD */}

          <div className="absolute inset-0 bg-[#FBE8C5]" />

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,#FFFFFA_0%,#FFF8EA_20%,#FBE8C5_47%,#F4D29A_76%,#E7B968_120%)]" />

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,transparent_30%,rgba(216,154,43,0.03)_56%,rgba(122,62,8,0.09)_90%,rgba(42,22,8,0.16)_145%)]" />

          {/* MOVING AURORA ORBS */}

          {ORBS.map((orb, index) => (
            <motion.div
              key={`orb-${index}`}
              className="absolute rounded-full bg-[radial-gradient(circle,rgba(255,255,247,.5)_0%,rgba(255,231,163,.25)_35%,rgba(216,154,43,.08)_62%,transparent_75%)] [will-change:transform,opacity]"
              style={{
                left: `${orb.x}%`,
                top: `${orb.y}%`,
                width: orb.size,
                height: orb.size,
                marginLeft: -orb.size / 2,
                marginTop: -orb.size / 2,
              }}
              initial={{
                opacity: 0,
                transform: "translate3d(0px, 20px, 0px) scale(0.82)",
              }}
              animate={{
                opacity: [0, 0.72, 0.42, 0.68, 0],
                transform: [
                  "translate3d(0px, 20px, 0px) scale(0.82)",
                  "translate3d(12px, 0px, 0px) scale(1)",
                  "translate3d(-8px, -12px, 0px) scale(1.08)",
                  "translate3d(7px, -20px, 0px) scale(0.98)",
                  "translate3d(0px, -30px, 0px) scale(0.9)",
                ],
              }}
              transition={{
                duration: orb.duration,
                delay: orb.delay,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* CENTRAL 3D PORTAL */}

          <motion.div
            className="absolute left-1/2 top-[45%] z-[2] h-[min(72vw,720px)] w-[min(72vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full [will-change:transform,opacity]"
            initial={{
              opacity: 0,
              transform:
                "translate(-50%, -50%) translateZ(0) scale(0.45) rotate(0deg)",
            }}
            animate={{
              opacity: [0, 1, 1, 0.72, 0],
              transform: [
                "translate(-50%, -50%) translateZ(0) scale(0.45) rotate(0deg)",
                "translate(-50%, -50%) translateZ(0) scale(0.92) rotate(18deg)",
                "translate(-50%, -50%) translateZ(0) scale(1) rotate(42deg)",
                "translate(-50%, -50%) translateZ(0) scale(1.08) rotate(72deg)",
                "translate(-50%, -50%) translateZ(0) scale(1.18) rotate(100deg)",
              ],
            }}
            transition={{
              duration: 3.2,
              times: [0, 0.24, 0.55, 0.78, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="absolute inset-[8%] rounded-full border border-[#E7B968]/45" />
            <div className="absolute inset-[18%] rounded-full border border-[#D89A2B]/35" />
            <div className="absolute inset-[28%] rounded-full border border-[#B86A0D]/25" />

            <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,240,.85)_22deg,transparent_52deg,transparent_118deg,rgba(248,212,122,.75)_145deg,transparent_178deg,transparent_240deg,rgba(216,154,43,.62)_270deg,transparent_305deg)] opacity-70" />

            <div className="absolute inset-[14%] rounded-full bg-[radial-gradient(circle,rgba(255,255,248,.96)_0%,rgba(255,240,191,.62)_30%,rgba(248,212,122,.22)_56%,transparent_73%)]" />
          </motion.div>

          {/* 3D GOLDEN EMBLEM / PAW */}

          <motion.div
            className="absolute left-1/2 top-[43%] z-20 [perspective:1100px] [will-change:transform,opacity]"
            initial={{
              opacity: 0,
              transform:
                "translate3d(-50%, -58%, 0px) scale(0.38) rotateX(34deg) rotateY(-28deg) rotateZ(-12deg)",
            }}
            animate={{
              opacity: [0, 0, 1, 1, 1, 0],
              transform: [
                "translate3d(-50%, -58%, 0px) scale(0.38) rotateX(34deg) rotateY(-28deg) rotateZ(-12deg)",
                "translate3d(-50%, -58%, 0px) scale(0.38) rotateX(34deg) rotateY(-28deg) rotateZ(-12deg)",
                "translate3d(-50%, -50%, 0px) scale(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
                "translate3d(-50%, -52%, 0px) scale(1.04) rotateX(-4deg) rotateY(6deg) rotateZ(1deg)",
                "translate3d(-50%, -48%, 0px) scale(0.98) rotateX(3deg) rotateY(-4deg) rotateZ(-1deg)",
                "translate3d(-50%, -42%, 0px) scale(0.66) rotateX(18deg) rotateY(22deg) rotateZ(8deg)",
              ],
            }}
            transition={{
              duration: 3.55,
              times: [0, 0.08, 0.32, 0.56, 0.78, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="relative">
              <motion.div
                className="absolute left-1/2 top-1/2 -z-10 h-[145%] w-[155%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,247,.95),rgba(255,231,163,.72)_27%,rgba(216,154,43,.28)_53%,transparent_74%)]"
                animate={{
                  opacity: [0.4, 0.9, 0.58, 0.88, 0.4],
                  transform: [
                    "translate(-50%, -50%) scale(0.82)",
                    "translate(-50%, -50%) scale(1.08)",
                    "translate(-50%, -50%) scale(0.96)",
                    "translate(-50%, -50%) scale(1.12)",
                    "translate(-50%, -50%) scale(0.88)",
                  ],
                }}
                transition={{
                  duration: 3.5,
                  ease: "easeInOut",
                }}
              />

              <Image
                src="/animations/golden-paw.png"
                alt=""
                width={720}
                height={720}
                priority
                sizes="(max-width: 430px) 250px, (max-width: 640px) 285px, (max-width: 1024px) 350px, 420px"
                className="h-auto w-[245px] select-none object-contain drop-shadow-[0_18px_25px_rgba(122,62,8,.34)] min-[390px]:w-[260px] min-[430px]:w-[280px] sm:w-[330px] lg:w-[390px] xl:w-[420px] [@media(max-height:700px)]:w-[215px] sm:[@media(max-height:700px)]:w-[275px]"
              />
            </div>
          </motion.div>

          {/* ENERGY SHOCKWAVE */}

          <div className="absolute left-1/2 top-[54%] z-10 -translate-x-1/2 -translate-y-1/2">
            {RINGS.map((ring, index) => (
              <motion.div
                key={`ring-${index}`}
                className="absolute left-1/2 top-1/2 rounded-[50%] border border-[#F8D47A] [will-change:transform,opacity]"
                style={{
                  width: ring.size,
                  height: ring.size * 0.19,
                  marginLeft: -ring.size / 2,
                  marginTop: -(ring.size * 0.19) / 2,
                  boxShadow:
                    index < 2
                      ? "0 0 10px rgba(255,255,240,.9), 0 0 25px rgba(248,212,122,.7)"
                      : "0 0 8px rgba(216,154,43,.5)",
                }}
                initial={{
                  opacity: 0,
                  transform: "translateZ(0) scale(0.08)",
                }}
                animate={{
                  opacity: [0, 0, 1, 0.62, 0],
                  transform: [
                    "translateZ(0) scale(0.08)",
                    "translateZ(0) scale(0.08)",
                    "translateZ(0) scale(0.42)",
                    "translateZ(0) scale(0.78)",
                    "translateZ(0) scale(1)",
                  ],
                }}
                transition={{
                  duration: 2.25,
                  delay: 2.65 + ring.delay,
                  times: [0, 0.08, 0.32, 0.68, 1],
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}
          </div>

          <motion.div
            className="absolute left-1/2 top-[54%] z-[11] h-[8px] w-[min(76vw,570px)] rounded-[50%] bg-[#FFFFED] [will-change:transform,opacity]"
            initial={{
              opacity: 0,
              transform: "translate(-50%, -50%) scaleX(0.05)",
            }}
            animate={{
              opacity: [0, 0, 1, 0.85, 0],
              transform: [
                "translate(-50%, -50%) scaleX(0.05)",
                "translate(-50%, -50%) scaleX(0.05)",
                "translate(-50%, -50%) scaleX(1)",
                "translate(-50%, -50%) scaleX(1.18)",
                "translate(-50%, -50%) scaleX(1.32)",
              ],
            }}
            transition={{
              duration: 2.2,
              delay: 2.65,
              times: [0, 0.08, 0.3, 0.65, 1],
              ease: "easeOut",
            }}
            style={{
              boxShadow:
                "0 0 12px #FFFFED, 0 0 28px #FFE7A3, 0 0 60px rgba(248,212,122,.88)",
            }}
          />

          {/* FLOATING GOLD SPARKS */}

          {SPARKS.map((spark, index) => (
            <motion.span
              key={`spark-${index}`}
              className="absolute z-[12] rounded-full [will-change:transform,opacity]"
              style={{
                left: `${spark.left}%`,
                top: `${spark.top}%`,
                width: spark.size,
                height: spark.size,
                background:
                  spark.size >= 4 ? "#FFE7A3" : "#D89A2B",
                boxShadow:
                  spark.size >= 4
                    ? "0 0 7px #FFFFED, 0 0 16px rgba(248,212,122,.8)"
                    : "0 0 8px rgba(216,154,43,.65)",
              }}
              initial={{
                opacity: 0,
                transform: "translate3d(0px, 12px, 0px) scale(0.45)",
              }}
              animate={{
                opacity: [
                  0,
                  spark.opacity,
                  spark.opacity * 0.55,
                  spark.opacity,
                  0,
                ],
                transform: [
                  "translate3d(0px, 12px, 0px) scale(0.45)",
                  `translate3d(${spark.moveX * 0.3}px, ${spark.moveY * 0.25}px, 0px) scale(1)`,
                  `translate3d(${spark.moveX}px, ${spark.moveY * 0.62}px, 0px) scale(1.2)`,
                  `translate3d(${spark.moveX * 0.55}px, ${spark.moveY * 0.82}px, 0px) scale(0.8)`,
                  `translate3d(${spark.moveX * 0.2}px, ${spark.moveY}px, 0px) scale(0.35)`,
                ],
              }}
              transition={{
                duration: spark.duration,
                delay: spark.delay,
                repeat: 1,
                repeatDelay: 0.05,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* LOGO MATERIALISES FROM PORTAL */}

          <motion.div
            className="absolute left-1/2 top-[45%] z-30 [will-change:transform,opacity]"
            initial={{
              opacity: 0,
              transform:
                "translate3d(-50%, -30%, 0px) scale(0.38) rotateY(-22deg)",
            }}
            animate={{
              opacity: [0, 0, 1, 1, 1, 0.72],
              transform: [
                "translate3d(-50%, -30%, 0px) scale(0.38) rotateY(-22deg)",
                "translate3d(-50%, -30%, 0px) scale(0.38) rotateY(-22deg)",
                "translate3d(-50%, -50%, 0px) scale(1.06) rotateY(0deg)",
                "translate3d(-50%, -50%, 0px) scale(1) rotateY(0deg)",
                "translate3d(-50%, -50%, 0px) scale(1) rotateY(0deg)",
                `translate3d(calc(-50% + ${scene.logoMoveX}px), calc(-50% + ${scene.logoMoveY}px), 0px) scale(${scene.mobile ? 0.2 : 0.22}) rotateY(0deg)`,
              ],
            }}
            transition={{
              duration: 4.7,
              delay: 3.05,
              times: [0, 0.09, 0.25, 0.36, 0.76, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="relative">
              <motion.div
                className="absolute left-1/2 top-1/2 -z-10 h-[150%] w-[170%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,247,.96),rgba(255,231,163,.76)_24%,rgba(248,212,122,.36)_48%,transparent_74%)]"
                initial={{
                  opacity: 0,
                  transform: "translate(-50%, -50%) scale(0.6)",
                }}
                animate={{
                  opacity: [0, 0, 1, 0.72, 0.45],
                  transform: [
                    "translate(-50%, -50%) scale(0.6)",
                    "translate(-50%, -50%) scale(0.6)",
                    "translate(-50%, -50%) scale(1.16)",
                    "translate(-50%, -50%) scale(1)",
                    "translate(-50%, -50%) scale(0.9)",
                  ],
                }}
                transition={{
                  duration: 3.8,
                  delay: 3.05,
                  times: [0, 0.12, 0.34, 0.62, 1],
                  ease: "easeOut",
                }}
              />

              <Image
                src="/logos/bunny-pets-zone-logo.png"
                alt=""
                width={560}
                height={560}
                priority
                sizes="(max-width: 430px) 215px, (max-width: 640px) 240px, (max-width: 1024px) 300px, 350px"
                className="h-auto w-[210px] select-none object-contain min-[390px]:w-[220px] min-[430px]:w-[240px] sm:w-[280px] md:w-[300px] lg:w-[335px] xl:w-[350px] [@media(max-height:700px)]:w-[185px] sm:[@media(max-height:700px)]:w-[235px]"
              />
            </div>
          </motion.div>

          {/* BRAND REVEAL */}

          <motion.div
            className="absolute left-1/2 top-[68%] z-[29] flex w-[min(94vw,820px)] -translate-x-1/2 flex-col items-center px-4 text-center [@media(max-height:700px)]:top-[69%]"
            initial={{
              opacity: 0,
              transform: "translate3d(-50%, 22px, 0px)",
            }}
            animate={{
              opacity: [0, 0, 1, 1, 0],
              transform: [
                "translate3d(-50%, 22px, 0px)",
                "translate3d(-50%, 22px, 0px)",
                "translate3d(-50%, 0px, 0px)",
                "translate3d(-50%, 0px, 0px)",
                "translate3d(-50%, -8px, 0px)",
              ],
            }}
            transition={{
              duration: 4.1,
              delay: 3.4,
              times: [0, 0.1, 0.28, 0.78, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h1 className="font-serif text-[clamp(2rem,5vw,3.8rem)] font-bold leading-[1.03] tracking-[-0.03em] text-[#2A1608] drop-shadow-[0_2px_1px_rgba(255,255,255,.5)] [@media(max-height:700px)]:text-[clamp(1.7rem,4vw,2.8rem)]">
              Bunny Pets Zone
            </h1>

            <div className="mt-3 flex w-full items-center justify-center gap-3 sm:mt-4 sm:gap-5">
              <motion.span
                className="h-px bg-[linear-gradient(to_right,transparent,#D89A2B)]"
                initial={{ width: 0, opacity: 0 }}
                animate={{
                  width: ["0px", "0px", "clamp(34px,12vw,135px)"],
                  opacity: [0, 0, 1],
                }}
                transition={{
                  duration: 1.2,
                  delay: 4.1,
                  ease: "easeOut",
                }}
              />

              <motion.span
                className="whitespace-nowrap text-[clamp(0.78rem,2.2vw,1.2rem)] font-medium tracking-[0.01em] text-[#4A2B16]"
                initial={{
                  opacity: 0,
                  transform: "translate3d(0px, 8px, 0px)",
                }}
                animate={{
                  opacity: [0, 1],
                  transform: [
                    "translate3d(0px, 8px, 0px)",
                    "translate3d(0px, 0px, 0px)",
                  ],
                }}
                transition={{
                  duration: 0.75,
                  delay: 4.15,
                  ease: "easeOut",
                }}
              >
                Find Your Perfect Companion
              </motion.span>

              <motion.span
                className="h-px bg-[linear-gradient(to_left,transparent,#D89A2B)]"
                initial={{ width: 0, opacity: 0 }}
                animate={{
                  width: ["0px", "0px", "clamp(34px,12vw,135px)"],
                  opacity: [0, 0, 1],
                }}
                transition={{
                  duration: 1.2,
                  delay: 4.1,
                  ease: "easeOut",
                }}
              />
            </div>

            <motion.div
              className="relative mt-3 h-7 w-8"
              initial={{
                opacity: 0,
                transform: "translateZ(0) scale(0.4)",
              }}
              animate={{
                opacity: [0, 1],
                transform: [
                  "translateZ(0) scale(0.4)",
                  "translateZ(0) scale(1)",
                ],
              }}
              transition={{
                duration: 0.55,
                delay: 4.65,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="absolute bottom-[1px] left-1/2 h-[12px] w-[15px] -translate-x-1/2 rounded-[55%_55%_44%_44%] bg-[#D89A2B]" />
              <span className="absolute left-[2px] top-[4px] h-[7px] w-[6px] -rotate-[26deg] rounded-full bg-[#D89A2B]" />
              <span className="absolute left-[8px] top-[1px] h-[7px] w-[6px] -rotate-[8deg] rounded-full bg-[#D89A2B]" />
              <span className="absolute right-[8px] top-[1px] h-[7px] w-[6px] rotate-[8deg] rounded-full bg-[#D89A2B]" />
              <span className="absolute right-[2px] top-[4px] h-[7px] w-[6px] rotate-[26deg] rounded-full bg-[#D89A2B]" />
            </motion.div>
          </motion.div>

          {/* GOLD LIGHT ARC TO NAVBAR */}

          <svg
            className="absolute inset-0 z-[28] h-full w-full overflow-visible"
            viewBox={`0 0 ${viewport.width} ${viewport.height}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="creative-entrance-trail"
                x1="100%"
                y1="100%"
                x2="0%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#FFFFED" />
                <stop offset="25%" stopColor="#FFE7A3" />
                <stop offset="55%" stopColor="#D89A2B" />
                <stop offset="100%" stopColor="#B86A0D" />
              </linearGradient>

              <filter
                id="creative-entrance-glow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="4" result="glowBlur" />
                <feMerge>
                  <feMergeNode in="glowBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <motion.path
              d={scene.arcPath}
              fill="none"
              stroke="url(#creative-entrance-trail)"
              strokeWidth={scene.mobile ? 2 : 2.6}
              strokeLinecap="round"
              filter="url(#creative-entrance-glow)"
              initial={{
                pathLength: 0,
                opacity: 0,
              }}
              animate={{
                pathLength: [0, 0, 1, 1],
                opacity: [0, 0, 1, 0],
              }}
              transition={{
                duration: 7.6,
                times: [0, 0.82, 0.94, 1],
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </svg>

          {/* FINAL SOFT FLOOR LIGHT */}

          <motion.div
            className="absolute inset-x-[4%] bottom-[2%] h-[34%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,242,.38),rgba(255,231,163,.18)_36%,rgba(216,154,43,.07)_60%,transparent_77%)] [will-change:transform,opacity]"
            animate={{
              opacity: [0.35, 0.7, 0.48, 0.68, 0.3],
              transform: [
                "translateZ(0) scale(0.9)",
                "translateZ(0) scale(1.04)",
                "translateZ(0) scale(0.98)",
                "translateZ(0) scale(1.07)",
                "translateZ(0) scale(1)",
              ],
            }}
            transition={{
              duration: TOTAL_DURATION_SECONDS,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}