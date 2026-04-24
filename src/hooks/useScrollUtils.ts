import { useState, useEffect, useRef, RefObject } from "react";

export function useScrollY(): number {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setY(window.scrollY);
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return y;
}

export function useInViewOnce(
  opts: IntersectionObserverInit = { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
): [RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null!);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, opts);
    obs.observe(ref.current);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, inView];
}

export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  mode: "through" | "enter" | "pin" = "through"
): number {
  const [p, setP] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    let raf = 0;
    const compute = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let progress = 0;
      if (mode === "enter") {
        progress = (vh - rect.top) / vh;
      } else if (mode === "pin") {
        const total = Math.max(rect.height - vh, 1);
        progress = -rect.top / total;
      } else {
        progress = (vh - rect.top) / (vh + rect.height);
      }
      setP(Math.max(0, Math.min(1, progress)));
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    compute();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, mode]);
  return p;
}

export function mapRange(x: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  const t = Math.max(0, Math.min(1, (x - inMin) / (inMax - inMin)));
  return outMin + (outMax - outMin) * t;
}

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
