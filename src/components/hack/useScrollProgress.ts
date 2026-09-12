import { useEffect, useRef } from "react";

/**
 * Shared scroll progress (0..1) stored in a ref so the 3D scene can read it
 * every frame without re-rendering React.
 */
export const scrollRef = { current: 0, velocity: 0, pixels: 0 };

export function useScrollProgress() {
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const next = max > 0 ? window.scrollY / max : 0;
      scrollRef.velocity = next - scrollRef.current;
      scrollRef.current = next;
      scrollRef.pixels = window.scrollY;
      raf.current = null;
    };
    const onScroll = () => {
      if (raf.current === null) raf.current = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, []);
}
