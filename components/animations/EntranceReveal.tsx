"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type Viewport = {
  width: number;
  height: number;
};

type Particle = {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  driftX: number;
  rise: number;
  opacity: number;
};

const PARTICLES: readonly Particle[] = [
  { x: 5, y: 70, size: 2, delay: 0.1, duration: 3.2, driftX: 10, rise: 72, opacity: 0.7 },
  { x: 9, y: 38, size: 3, delay: 0.5, duration: 3.5, driftX: -8, rise: 85, opacity: 0.85 },
  { x: 13, y: 82, size: 5, delay: 0.8, duration: 3.8, driftX: 14, rise: 94, opacity: 1 },
  { x: 17, y: 23, size: 2, delay: 0.25, duration: 3.3, driftX: -12, rise: 70, opacity: 0.65 },
  { x: 21, y: 58, size: 3, delay: 1, duration: 3.7, driftX: 8, rise: 102, opacity: 0.8 },
  { x: 25, y: 76, size: 2, delay: 0.6, duration: 3.2, driftX: -7, rise: 80, opacity: 0.75 },
  { x: 29, y: 32, size: 5, delay: 1.2, duration: 3.9, driftX: 13, rise: 108, opacity: 1 },
  { x: 33, y: 88, size: 3, delay: 0.35, duration: 3.5, driftX: -10, rise: 91, opacity: 0.8 },
  { x: 37, y: 18, size: 2, delay: 0.75, duration: 3.25, driftX: 6, rise: 68, opacity: 0.65 },
  { x: 40, y: 65, size: 4, delay: 1.35, duration: 3.8, driftX: -13, rise: 105, opacity: 0.95 },
  { x: 43, y: 42, size: 2, delay: 0.15, duration: 3.1, driftX: 9, rise: 76, opacity: 0.7 },
  { x: 46, y: 84, size: 3, delay: 0.9, duration: 3.6, driftX: -8, rise: 98, opacity: 0.85 },
  { x: 49, y: 12, size: 5, delay: 0.55, duration: 4, driftX: 11, rise: 112, opacity: 1 },
  { x: 52, y: 71, size: 2, delay: 1.15, duration: 3.4, driftX: -6, rise: 82, opacity: 0.7 },
  { x: 55, y: 29, size: 3, delay: 0.3, duration: 3.5, driftX: 12, rise: 89, opacity: 0.85 },
  { x: 58, y: 91, size: 4, delay: 1.4, duration: 3.8, driftX: -11, rise: 106, opacity: 0.95 },
  { x: 61, y: 53, size: 2, delay: 0.65, duration: 3.2, driftX: 7, rise: 73, opacity: 0.7 },
  { x: 64, y: 16, size: 5, delay: 0.95, duration: 4.1, driftX: -14, rise: 116, opacity: 1 },
  { x: 67, y: 79, size: 3, delay: 0.4, duration: 3.6, driftX: 10, rise: 95, opacity: 0.85 },
  { x: 70, y: 37, size: 2, delay: 1.3, duration: 3.3, driftX: -9, rise: 78, opacity: 0.7 },
  { x: 73, y: 67, size: 4, delay: 0.2, duration: 3.7, driftX: 13, rise: 103, opacity: 0.95 },
  { x: 76, y: 24, size: 2, delay: 0.8, duration: 3.25, driftX: -7, rise: 72, opacity: 0.65 },
  { x: 79, y: 86, size: 5, delay: 1.1, duration: 3.9, driftX: 12, rise: 110, opacity: 1 },
  { x: 82, y: 47, size: 3, delay: 0.3, duration: 3.5, driftX: -10, rise: 88, opacity: 0.85 },
  { x: 85, y: 13, size: 2, delay: 1.45, duration: 3.2, driftX: 8, rise: 69, opacity: 0.7 },
  { x: 88, y: 73, size: 4, delay: 0.55, duration: 3.7, driftX: -12, rise: 100, opacity: 0.95 },
  { x: 91, y: 34, size: 2, delay: 0.85, duration: 3.4, driftX: 7, rise: 81, opacity: 0.7 },
  { x: 94, y: 81, size: 5, delay: 0.1, duration: 4, driftX: -13, rise: 114, opacity: 1 },
  { x: 97, y: 55, size: 3, delay: 1.2, duration: 3.5, driftX: 9, rise: 92, opacity: 0.85 },
  { x: 11, y: 49, size: 2, delay: 1.5, duration: 3.25, driftX: -8, rise: 75, opacity: 0.7 },
  { x: 35, y: 73, size: 5, delay: 0.45, duration: 3.8, driftX: 11, rise: 109, opacity: 1 },
  { x: 57, y: 39, size: 3, delay: 1, duration: 3.6, driftX: -9, rise: 90, opacity: 0.85 },
];

const LIGHT_RAYS = [
  { left: 7, width: 18, height: 70, opacity: 0.2, delay: 0.15 },
  { left: 18, width: 8, height: 82, opacity: 0.32, delay: 0.35 },
  { left: 29, width: 14, height: 74, opacity: 0.26, delay: 0.05 },
  { left: 39, width: 7, height: 88, opacity: 0.42, delay: 0.2 },
  { left: 49, width: 13, height: 92, opacity: 0.54, delay: 0 },
  { left: 59, width: 8, height: 85, opacity: 0.4, delay: 0.3 },
  { left: 69, width: 15, height: 76, opacity: 0.28, delay: 0.1 },
  { left: 80, width: 9, height: 83, opacity: 0.35, delay: 0.4 },
  { left: 91, width: 17, height: 68, opacity: 0.2, delay: 0.2 },
] as const;

const RIPPLES = [
  { width: 180, height: 34, delay: 0 },
  { width: 270, height: 51, delay: 0.07 },
  { width: 380, height: 72, delay: 0.14 },
  { width: 500, height: 94, delay: 0.21 },
  { width: 640, height: 120, delay: 0.28 },
  { width: 800, height: 148, delay: 0.35 },
  { width: 980, height: 180, delay: 0.42 },
] as const;

const TRAIL_SPARKS = [
  { progress: 0.15, offsetX: -8, offsetY: 9, size: 3, delay: 0 },
  { progress: 0.27, offsetX: 11, offsetY: -8, size: 5, delay: 0.03 },
  { progress: 0.39, offsetX: -13, offsetY: -5, size: 2, delay: 0.06 },
  { progress: 0.51, offsetX: 9, offsetY: 12, size: 4, delay: 0.09 },
  { progress: 0.63, offsetX: -7, offsetY: -11, size: 3, delay: 0.12 },
  { progress: 0.75, offsetX: 12, offsetY: 7, size: 5, delay: 0.15 },
  { progress: 0.86, offsetX: -10, offsetY: 8, size: 2, delay: 0.18 },
  { progress: 0.94, offsetX: 7, offsetY: -7, size: 4, delay: 0.21 },
] as const;

const TOTAL_DURATION = 5.8;
const TOTAL_DURATION_MS = 5900;
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
    window.addEventListener("resize", updateViewport, { passive: true });

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

    const logoCenterY = viewport.height * (short ? 0.4 : 0.425);
    const targetX = mobile ? 48 : tablet ? 66 : 82;
    const targetY = mobile ? 47 : 58;

    return {
      mobile,
      short,
      logoCenterY,
      targetX,
      targetY,
      logoMoveX: targetX - viewport.width / 2,
      logoMoveY: targetY - logoCenterY,
      trailPath: `M ${viewport.width / 2} ${logoCenterY}
        C ${viewport.width * 0.43} ${viewport.height * 0.22},
          ${targetX + viewport.width * 0.13} ${targetY + viewport.height * 0.17},
          ${targetX} ${targetY}`,
    };
  }, [viewport]);

  if (!visible) return null;

  if (shouldReduceMotion) {
    return (
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9999] h-[100dvh] w-screen overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 1, 0] }}
        transition={{ duration: 0.9, times: [0, 0.55, 1] }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#FFFFF7_0%,#FFF8EA_28%,#FBE8C5_58%,#E7B968_130%)]" />

        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/logos/bunny-pets-zone-logo.png"
            alt=""
            width={440}
            height={440}
            priority
            className="h-auto w-[210px] object-contain sm:w-[290px]"
          />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] h-[100dvh] w-screen overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 1, 0] }}
      transition={{
        duration: TOTAL_DURATION,
        times: [0, 0.86, 0.92, 1],
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="absolute inset-0 bg-[#FBE8C5]" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_46%,#FFFFF8_0%,#FFF8EA_18%,#FBE8C5_43%,#F4D29A_72%,#E7B968_116%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,transparent_35%,rgba(184,106,13,0.035)_62%,rgba(122,62,8,0.1)_94%,rgba(42,22,8,0.16)_145%)]" />

      <div className="absolute inset-x-0 bottom-0 h-[47%] bg-[linear-gradient(to_bottom,transparent,rgba(255,248,234,0.25)_25%,rgba(244,210,154,0.3)_68%,rgba(184,106,13,0.13))]" />

      <motion.div
        className="absolute left-1/2 top-[45%] h-[72vh] w-[76vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,247,0.94)_0%,rgba(255,231,163,0.47)_27%,rgba(248,212,122,0.14)_53%,transparent_74%)] blur-[38px]"
        animate={{
          opacity: [0.48, 0.78, 0.58, 0.84, 0.48],
          scale: [0.92, 1.04, 0.98, 1.08, 1],
        }}
        transition={{
          duration: 5,
          ease: "easeInOut",
        }}
      />

      {LIGHT_RAYS.map((ray, index) => (
        <motion.div
          key={index}
          className="absolute -top-[8%] origin-top blur-[13px]"
          style={{
            left: `${ray.left}%`,
            width: ray.width,
            height: `${ray.height}%`,
            background:
              "linear-gradient(to bottom,rgba(255,255,255,.86),rgba(255,247,215,.64) 18%,rgba(255,231,163,.3) 46%,rgba(248,212,122,.08) 72%,transparent)",
          }}
          initial={{ opacity: 0, scaleY: 0.7 }}
          animate={{
            opacity: [0, ray.opacity, ray.opacity * 0.72, ray.opacity],
            scaleY: [0.7, 1, 1.04, 0.98],
          }}
          transition={{
            duration: 3.6,
            delay: ray.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {PARTICLES.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background:
              particle.size >= 5
                ? "#FFE7A3"
                : particle.size >= 3
                  ? "#F8D47A"
                  : "#D89A2B",
            boxShadow:
              particle.size >= 4
                ? "0 0 6px #FFF8D5,0 0 15px rgba(255,231,163,.95),0 0 29px rgba(216,154,43,.6)"
                : "0 0 8px rgba(255,231,163,.95),0 0 14px rgba(216,154,43,.45)",
          }}
          initial={{ opacity: 0, y: 15, x: 0, scale: 0.4 }}
          animate={{
            opacity: [
              0,
              particle.opacity * 0.45,
              particle.opacity,
              particle.opacity * 0.5,
              0,
            ],
            x: [
              0,
              particle.driftX * 0.35,
              particle.driftX,
              particle.driftX * 0.5,
            ],
            y: [
              15,
              -particle.rise * 0.25,
              -particle.rise * 0.68,
              -particle.rise,
            ],
            scale: [0.4, 0.9, 1.25, 0.7, 0.35],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: 1,
            repeatDelay: 0.05,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        className="absolute left-1/2 top-[43%] z-10 -translate-x-1/2 -translate-y-1/2 [perspective:1200px]"
        initial={{
          opacity: 0,
          scale: 0.72,
          y: -24,
          rotateX: 7,
          rotateY: -5,
          filter: "blur(5px)",
        }}
        animate={{
          opacity: [0, 1, 1, 1, 1, 0],
          scale: [0.72, 1, 1, 1, 0.91, 0.76],
          scaleX: [1, 1, 1, 1, 1.025, 0.86],
          scaleY: [1, 1, 1, 1, 0.91, 0.78],
          y: [-24, 0, -5, 0, 22, 22],
          rotateX: [7, 0, 0, 0, 0, 0],
          rotateY: [-5, 0, 0, 0, 0, 0],
          filter: [
            "blur(5px)",
            "blur(0px)",
            "blur(0px)",
            "blur(0px)",
            "blur(0px)",
            "blur(12px)",
          ],
        }}
        transition={{
          duration: 2.45,
          times: [0, 0.24, 0.42, 0.56, 0.76, 1],
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.div
          className="relative"
          animate={{ y: [0, -5, 0, -3, 0] }}
          transition={{
            duration: 1.25,
            delay: 0.7,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="absolute left-1/2 top-1/2 -z-10 h-[135%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,242,.94),rgba(255,231,163,.72)_24%,rgba(248,212,122,.36)_46%,rgba(216,154,43,.12)_65%,transparent_79%)] blur-[27px]"
            animate={{
              opacity: [0.5, 0.88, 0.62, 1],
              scale: [0.88, 1.06, 0.98, 1.14],
            }}
            transition={{ duration: 2.1 }}
          />

          <Image
            src="/animations/golden-paw.png"
            alt=""
            width={720}
            height={720}
            priority
            sizes="(max-width: 430px) 250px, (max-width: 640px) 280px, (max-width: 1024px) 340px, 410px"
            className="h-auto w-[245px] select-none object-contain drop-shadow-[0_15px_22px_rgba(122,62,8,.34)] min-[390px]:w-[265px] min-[430px]:w-[280px] sm:w-[330px] lg:w-[390px] xl:w-[410px] [@media(max-height:700px)]:w-[220px] sm:[@media(max-height:700px)]:w-[280px]"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-[54%] z-[4] h-[160px] w-[min(98vw,1050px)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,250,1),rgba(255,246,198,.98)_10%,rgba(255,231,163,.76)_23%,rgba(248,212,122,.42)_41%,rgba(216,154,43,.17)_60%,transparent_79%)] blur-[8px]"
        initial={{ opacity: 0, scaleX: 0.1, scaleY: 0.2 }}
        animate={{
          opacity: [0, 0, 1, 0.86, 0.55, 0],
          scaleX: [0.1, 0.1, 1, 1.1, 1.2, 1.3],
          scaleY: [0.2, 0.2, 1, 0.9, 0.75, 0.62],
        }}
        transition={{
          duration: 3.3,
          delay: 1.6,
          times: [0, 0.08, 0.3, 0.52, 0.76, 1],
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      <motion.div
        className="absolute left-1/2 top-[54%] z-[8] h-[12px] w-[min(76vw,540px)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#FFFFED] blur-[2px]"
        initial={{ opacity: 0, scaleX: 0.08 }}
        animate={{
          opacity: [0, 1, 0.92, 0.5, 0],
          scaleX: [0.08, 1, 1.14, 1.24, 1.32],
        }}
        transition={{
          duration: 2.7,
          delay: 1.85,
          ease: "easeOut",
        }}
        style={{
          boxShadow:
            "0 0 10px #FFFFF2,0 0 25px #FFE7A3,0 0 52px rgba(248,212,122,.98),0 0 100px rgba(216,154,43,.75)",
        }}
      />

      <div className="absolute left-1/2 top-[54%] z-[6] -translate-x-1/2 -translate-y-1/2">
        {RIPPLES.map((ring, index) => (
          <motion.div
            key={index}
            className="absolute left-1/2 top-1/2 rounded-[50%] border"
            style={{
              width: ring.width,
              height: ring.height,
              marginLeft: -ring.width / 2,
              marginTop: -ring.height / 2,
              borderColor:
                index < 2
                  ? "rgba(255,246,198,.98)"
                  : index % 2 === 0
                    ? "rgba(248,212,122,.88)"
                    : "rgba(216,154,43,.8)",
              background:
                "radial-gradient(ellipse at center,transparent 61%,rgba(255,231,163,.13) 76%,transparent 88%)",
              boxShadow:
                index < 2
                  ? "0 0 8px rgba(255,255,239,1),inset 0 0 11px rgba(255,231,163,.8),0 0 26px rgba(248,212,122,.75)"
                  : "0 0 7px rgba(255,231,163,.76),inset 0 0 9px rgba(248,212,122,.48),0 0 20px rgba(216,154,43,.48)",
            }}
            initial={{ opacity: 0, scale: 0.05 }}
            animate={{
              opacity: [0, 1, 0.75, 0.4, 0],
              scale: [0.05, 0.42, 0.75, 0.92, 1],
              filter: [
                "blur(0px)",
                "blur(.2px)",
                "blur(.7px)",
                "blur(1.5px)",
                "blur(3px)",
              ],
            }}
            transition={{
              duration: 2.3,
              delay: 1.9 + ring.delay,
              times: [0, 0.22, 0.5, 0.76, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </div>

      <motion.div
        className="absolute left-1/2 top-[42.5%] z-20 -translate-x-1/2 -translate-y-1/2"
        initial={{
          opacity: 0,
          scale: 0.48,
          y: 50,
          x: 0,
          filter: "blur(16px)",
        }}
        animate={{
          opacity: [0, 0, 1, 1, 1, 1, 0.72],
          scale: [
            0.48,
            0.48,
            1.055,
            1,
            1,
            1,
            scene.mobile ? 0.2 : 0.22,
          ],
          y: [50, 50, 0, 0, 0, 0, scene.logoMoveY],
          x: [0, 0, 0, 0, 0, 0, scene.logoMoveX],
          filter: [
            "blur(16px)",
            "blur(16px)",
            "blur(0px)",
            "blur(0px)",
            "blur(0px)",
            "blur(0px)",
            "blur(0px)",
          ],
        }}
        transition={{
          duration: 5.55,
          times: [0, 0.38, 0.49, 0.57, 0.68, 0.84, 1],
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="relative">
          <motion.div
            className="absolute left-1/2 top-1/2 -z-10 h-[150%] w-[170%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,246,.98),rgba(255,231,163,.86)_23%,rgba(248,212,122,.45)_44%,rgba(216,154,43,.17)_63%,transparent_77%)] blur-[29px]"
            animate={{
              opacity: [0, 0, 1, 0.78, 0.62],
              scale: [0.7, 0.7, 1.12, 1, 0.92],
            }}
            transition={{ duration: 4.5 }}
          />

          <Image
            src="/logos/bunny-pets-zone-logo.png"
            alt=""
            width={560}
            height={560}
            priority
            sizes="(max-width: 430px) 215px, (max-width: 640px) 235px, (max-width: 1024px) 290px, 340px"
            className="h-auto w-[210px] select-none object-contain min-[390px]:w-[220px] min-[430px]:w-[235px] sm:w-[275px] md:w-[290px] lg:w-[330px] xl:w-[340px] [@media(max-height:700px)]:w-[185px] sm:[@media(max-height:700px)]:w-[235px]"
          />
        </div>
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-[68%] z-[19] flex w-[min(94vw,800px)] -translate-x-1/2 flex-col items-center px-3 text-center [@media(max-height:700px)]:top-[69%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1, 1, 0] }}
        transition={{
          duration: 5.3,
          times: [0, 0.49, 0.59, 0.72, 0.84, 1],
        }}
      >
        <motion.h1
          className="font-serif text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.04] tracking-[-0.028em] text-[#2A1608] drop-shadow-[0_2px_1px_rgba(255,255,255,.48)] [@media(max-height:700px)]:text-[clamp(1.75rem,4vw,2.8rem)]"
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{
            opacity: [0, 0, 1, 1, 0],
            y: [20, 20, 0, 0, -5],
            filter: [
              "blur(4px)",
              "blur(4px)",
              "blur(0px)",
              "blur(0px)",
              "blur(2px)",
            ],
          }}
          transition={{
            duration: 5,
            times: [0, 0.5, 0.62, 0.87, 1],
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Bunny Pets Zone
        </motion.h1>

        <motion.div
          className="mt-3 flex w-full items-center justify-center gap-3 sm:mt-4 sm:gap-5 [@media(max-height:700px)]:mt-2"
          initial={{ opacity: 0, y: 14 }}
          animate={{
            opacity: [0, 0, 1, 1, 0],
            y: [14, 14, 0, 0, -4],
          }}
          transition={{
            duration: 5.1,
            times: [0, 0.55, 0.66, 0.87, 1],
          }}
        >
          <span className="h-px w-[clamp(34px,12vw,135px)] bg-[linear-gradient(to_right,transparent,#D89A2B)]" />

          <span className="whitespace-nowrap text-[clamp(0.78rem,2.2vw,1.2rem)] font-medium tracking-[0.01em] text-[#4A2B16]">
            Find Your Perfect Companion
          </span>

          <span className="h-px w-[clamp(34px,12vw,135px)] bg-[linear-gradient(to_left,transparent,#D89A2B)]" />
        </motion.div>

        <motion.div
          className="relative mt-3 h-7 w-8 [@media(max-height:700px)]:mt-2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 0, 1, 1, 0],
            scale: [0.5, 0.5, 1, 1, 0.7],
          }}
          transition={{
            duration: 5.15,
            times: [0, 0.58, 0.68, 0.87, 1],
          }}
        >
          <span className="absolute bottom-[1px] left-1/2 h-[12px] w-[15px] -translate-x-1/2 rounded-[55%_55%_44%_44%] bg-[#D89A2B] shadow-[0_0_8px_rgba(216,154,43,.55)]" />
          <span className="absolute left-[2px] top-[4px] h-[7px] w-[6px] -rotate-[26deg] rounded-full bg-[#D89A2B]" />
          <span className="absolute left-[8px] top-[1px] h-[7px] w-[6px] -rotate-[8deg] rounded-full bg-[#D89A2B]" />
          <span className="absolute right-[8px] top-[1px] h-[7px] w-[6px] rotate-[8deg] rounded-full bg-[#D89A2B]" />
          <span className="absolute right-[2px] top-[4px] h-[7px] w-[6px] rotate-[26deg] rounded-full bg-[#D89A2B]" />
        </motion.div>
      </motion.div>

      <svg
        className="absolute inset-0 z-[18] h-full w-full overflow-visible"
        viewBox={`0 0 ${viewport.width} ${viewport.height}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="entrance-gold-trail"
            x1="100%"
            y1="100%"
            x2="0%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#FFFFED" />
            <stop offset="18%" stopColor="#FFE7A3" />
            <stop offset="48%" stopColor="#F8D47A" />
            <stop offset="78%" stopColor="#D89A2B" />
            <stop offset="100%" stopColor="#B86A0D" />
          </linearGradient>

          <filter
            id="entrance-gold-glow"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="6" result="trailBlur" />
            <feMerge>
              <feMergeNode in="trailBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d={scene.trailPath}
          fill="none"
          stroke="url(#entrance-gold-trail)"
          strokeWidth={scene.mobile ? 2.2 : 2.8}
          strokeLinecap="round"
          filter="url(#entrance-gold-glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 0, 1, 1],
            opacity: [0, 0, 1, 0],
          }}
          transition={{
            duration: 5.6,
            times: [0, 0.83, 0.94, 1],
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        <motion.path
          d={scene.trailPath}
          fill="none"
          stroke="rgba(255,255,235,.96)"
          strokeWidth={scene.mobile ? 0.7 : 0.95}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 0, 1, 1],
            opacity: [0, 0, 1, 0],
          }}
          transition={{
            duration: 5.55,
            times: [0, 0.84, 0.94, 1],
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </svg>

      {TRAIL_SPARKS.map((spark, index) => (
        <motion.span
          key={index}
          className="absolute z-[22] rounded-full bg-[#FFE7A3]"
          style={{
            left: viewport.width / 2,
            top: scene.logoCenterY,
            width: spark.size,
            height: spark.size,
            boxShadow:
              "0 0 7px #FFFFED,0 0 15px #FFE7A3,0 0 27px rgba(216,154,43,.75)",
          }}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
          animate={{
            opacity: [0, 0, 1, 0],
            x: [
              0,
              0,
              (scene.targetX - viewport.width / 2) * spark.progress +
                spark.offsetX,
            ],
            y: [
              0,
              0,
              (scene.targetY - scene.logoCenterY) * spark.progress -
                Math.sin(spark.progress * Math.PI) *
                  viewport.height *
                  0.13 +
                spark.offsetY,
            ],
            scale: [0, 0, 1.3, 0],
          }}
          transition={{
            duration: 5.6,
            delay: spark.delay,
            times: [0, 0.84, 0.94, 1],
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}

      <motion.div
        className="absolute inset-x-[3%] bottom-[3%] h-[32%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,242,.42),rgba(255,231,163,.2)_35%,rgba(216,154,43,.08)_58%,transparent_76%)] blur-[30px]"
        animate={{
          opacity: [0.4, 0.78, 0.56, 0.7, 0.35],
          scaleX: [0.9, 1.05, 0.98, 1.08, 1],
          scaleY: [0.82, 1, 0.94, 1.04, 0.9],
        }}
        transition={{
          duration: 5.2,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}