import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  isLoading: boolean;
  onLoadingComplete: () => void;
};

export default function SplashScreen({ isLoading, onLoadingComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const rafId = useRef<number | null>(null);
  const firedDone = useRef(false);

  // Smooth progress to ~95% while loading
  useEffect(() => {
    if (!isLoading) return;

    const start = performance.now();
    const duration = 1600; // ms
    const ease = (t: number) => 1 - Math.pow(1 - t, 2); // easeOutQuad

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const target = 95 * ease(t);
      setProgress((p) => Math.max(p, target));
      if (t < 1 && isLoading) {
        rafId.current = requestAnimationFrame(tick);
      }
    };

    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isLoading]);

  // When parent hides loading, let exit animation play then notify once
  useEffect(() => {
    if (!isLoading && !firedDone.current) {
      firedDone.current = true;
      const timer = setTimeout(() => {
        onLoadingComplete();
      }, 450); // keep in sync with exit transition
      return () => clearTimeout(timer);
    }
  }, [isLoading, onLoadingComplete]);

  // Displayed percentage (clamped); when isLoading=false we show 100%
  const pct = isLoading ? Math.min(100, Math.round(progress)) : 100;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40, transition: { duration: 0.45, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 overflow-hidden bg-slate-950"
        >
          {/* subtle vignette */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(88,28,135,0.25),transparent_60%),radial-gradient(1000px_500px_at_80%_110%,rgba(13,148,136,0.18),transparent_60%)]" />

          {/* floating aurora ribbons */}
          <Aurora />

          {/* content */}
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center"
            >
              <motion.h1
                className="mb-3 bg-linear-to-r from-teal-300 via-cyan-300 to-violet-300 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl"
                animate={{ backgroundPositionX: ["0%", "100%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 100%" }}
              >
                Andrew Lara
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-lg font-medium text-slate-300"
              >
                Software Engineer & Photographer
              </motion.p>
            </motion.div>

            <DotOrbit className="my-10" />

            {/* progress bar */}
            <div className="mt-2 w-full max-w-sm">
              <div className="relative h-1.5 overflow-hidden rounded-full bg-slate-800/80">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-teal-400 via-cyan-400 to-fuchsia-400"
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
                {/* shimmer */}
                <motion.div
                  className="absolute inset-y-0 left-0 w-24 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ["0%", "200%"] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <motion.p
                className="mt-3 text-center text-xs font-semibold tracking-widest text-slate-400"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              >
                {pct}%
              </motion.p>
            </div>

            <motion.p
              className="pointer-events-none absolute bottom-10 w-full text-center text-sm italic text-slate-500"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Crafting experiences that matter, one pixel at a time
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Decorative subcomponents (module scope) ---------- */

function Aurora() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <motion.div
        className="absolute -left-24 top-1/3 h-72 w-[60%] rounded-full"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 50%, rgba(56,189,248,0.18), transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ x: ["0%", "8%", "-6%", "0%"], opacity: [0.5, 0.7, 0.45, 0.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-24 top-1/2 h-72 w-[60%] rounded-full"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 50%, rgba(168,85,247,0.16), transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ x: ["0%", "-6%", "7%", "0%"], opacity: [0.45, 0.7, 0.5, 0.45] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/3 -top-16 h-56 w-[40%] rounded-full"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 50%, rgba(20,184,166,0.14), transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ y: ["0%", "6%", "-5%", "0%"], opacity: [0.35, 0.55, 0.4, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function DotOrbit({ className = "" }: { className?: string }) {
  const dots = [0, 1, 2];
  return (
    <div className={`relative h-14 w-28 ${className}`}>
      {dots.map((d) => (
        <motion.span
          key={d}
          className="absolute left-1/2 top-1/2 block h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r from-teal-400 to-fuchsia-400 shadow-[0_0_20px_rgba(56,189,248,0.35)]"
          style={{ transformOrigin: "28px 0px" }}
          animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
          transition={{
            rotate: { duration: 2.2 + d * 0.2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1.4 + d * 0.15, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      ))}
    </div>
  );
}
