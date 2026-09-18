import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";

/** Full-screen splash shown while the 3D scene's assets (bot model, textures) load in. */
export function SiteLoader() {
  const { progress, active } = useProgress();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!active && progress >= 100) {
      const t = setTimeout(() => setReady(true), 350);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [active, progress]);

  // Safety net: never block the site if the loading manager stalls.
  useEffect(() => {
    const safety = setTimeout(() => setReady(true), 6000);
    return () => clearTimeout(safety);
  }, []);

  if (ready) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-stone-950 transition-opacity duration-500 ${
        !active && progress >= 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <img
        src="/logo-3d.png"
        alt="Synapse 1.0"
        className="h-28 w-28 sm:h-36 sm:w-36 object-contain animate-logo-float drop-shadow-[0_0_25px_rgba(0,229,255,0.5)]"
      />
      <div className="w-56 sm:w-72 h-2 bg-stone-900 border border-cyan-500/40 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-[width] duration-200"
          style={{ width: `${Math.min(100, Math.round(progress))}%` }}
        />
      </div>
      <span className="font-hud text-[10px] uppercase tracking-[0.3em] text-cyan-300/80">
        Loading World… {Math.min(100, Math.round(progress))}%
      </span>
    </div>
  );
}
