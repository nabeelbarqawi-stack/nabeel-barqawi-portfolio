"use client";

import { useEffect, useRef, useCallback } from "react";

const WORDS = ["COMPLEXITY", "CLARITY", "PRODUCT", "IMPACT"];
const AMBER = { r: 230, g: 160, b: 75 };
const PARTICLE_SIZE = 2.2;
const FONT_SIZE_BASE = 120;
const WORD_HOLD_MS = 2200;
const TRANSITION_MS = 1000;

interface Particle {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  alpha: number;
  talpha: number;
  size: number;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const stateRef = useRef({
    particles: [] as Particle[],
    wordIndex: 0,
    phase: "hold" as "hold" | "scatter" | "gather",
    phaseTimer: 0,
    width: 0,
    height: 0,
    dpr: 1,
  });

  const getParticlesForWord = useCallback(
    (word: string, canvas: HTMLCanvasElement, dpr: number): { tx: number; ty: number }[] => {
      const offscreen = document.createElement("canvas");
      const W = canvas.width / dpr;
      const H = canvas.height / dpr;
      offscreen.width = W;
      offscreen.height = H;
      const ctx = offscreen.getContext("2d")!;

      // Larger coefficient + wider fill so text is legible on narrow screens
      const fontSize = Math.min(FONT_SIZE_BASE, (W * 0.85) / (word.length * 0.52));
      ctx.clearRect(0, 0, W, H);
      ctx.font = `700 ${fontSize}px Inter, system-ui, sans-serif`;
      // ctx.letterSpacing omitted — not supported in Safari/iOS
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(word, W / 2, H / 2);

      const imageData = ctx.getImageData(0, 0, W, H);
      const data = imageData.data;
      const pts: { tx: number; ty: number }[] = [];

      // Smaller stride on narrow screens keeps particle count reasonable
      const stride = W < 500 ? 3 : 5;

      for (let y = 0; y < H; y += stride) {
        for (let x = 0; x < W; x += stride) {
          const idx = (y * W + x) * 4;
          if (data[idx + 3] > 128) {
            pts.push({ tx: x, ty: y });
          }
        }
      }
      return pts;
    },
    []
  );

  const buildScene = useCallback(
    (wordIndex: number, canvas: HTMLCanvasElement, dpr: number) => {
      const state = stateRef.current;
      const W = canvas.width / dpr;
      const H = canvas.height / dpr;
      const pts = getParticlesForWord(WORDS[wordIndex], canvas, dpr);

      if (state.particles.length === 0) {
        state.particles = pts.map((p) => ({
          x: Math.random() * W,
          y: Math.random() * H,
          tx: p.tx,
          ty: p.ty,
          vx: 0,
          vy: 0,
          alpha: 0,
          talpha: 1,
          size: PARTICLE_SIZE,
        }));
      } else {
        const existing = state.particles;
        const next = pts;
        const len = Math.max(existing.length, next.length);

        const updated: Particle[] = [];
        for (let i = 0; i < len; i++) {
          const src = existing[i % existing.length];
          const dst = next[i % next.length];
          updated.push({
            x: src ? src.x : Math.random() * W,
            y: src ? src.y : Math.random() * H,
            tx: dst.tx,
            ty: dst.ty,
            vx: src ? src.vx : 0,
            vy: src ? src.vy : 0,
            alpha: src ? src.alpha : 0,
            talpha: 1,
            size: PARTICLE_SIZE,
          });
        }
        state.particles = updated;
      }
    },
    [getParticlesForWord]
  );

  const scatter = useCallback(() => {
    const state = stateRef.current;
    const W = state.width;
    const H = state.height;
    for (const p of state.particles) {
      p.vx = (Math.random() - 0.5) * 6;
      p.vy = (Math.random() - 0.5) * 6;
      p.tx = Math.random() * W;
      p.ty = Math.random() * H;
      p.talpha = Math.random() * 0.3;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    stateRef.current.dpr = dpr;

    // Obtain ctx once; resize resets the transform so we use setTransform to restore it
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      const W = canvas.parentElement?.clientWidth || window.innerWidth;
      const H = canvas.parentElement?.clientHeight || 340;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      // Resetting canvas dimensions also resets the transform — reapply scale
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stateRef.current.width = W;
      stateRef.current.height = H;
      stateRef.current.particles = [];
      buildScene(stateRef.current.wordIndex, canvas, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    let last = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const state = stateRef.current;
      ctx.clearRect(0, 0, state.width, state.height);

      state.phaseTimer += dt;

      if (state.phase === "hold" && state.phaseTimer > WORD_HOLD_MS / 1000) {
        state.phase = "scatter";
        state.phaseTimer = 0;
        scatter();
      }

      if (state.phase === "scatter" && state.phaseTimer > TRANSITION_MS / 1000 / 2) {
        state.phase = "gather";
        state.phaseTimer = 0;
        state.wordIndex = (state.wordIndex + 1) % WORDS.length;
        buildScene(state.wordIndex, canvas, dpr);
      }

      if (state.phase === "gather" && state.phaseTimer > TRANSITION_MS / 1000) {
        state.phase = "hold";
        state.phaseTimer = 0;
      }

      const easeStr = state.phase === "gather" ? 0.08 : 0.04;
      const alphaStr = 0.06;

      for (const p of state.particles) {
        const dx = p.tx - p.x;
        const dy = p.ty - p.y;
        p.vx += dx * easeStr;
        p.vy += dy * easeStr;
        p.vx *= 0.82;
        p.vy *= 0.82;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha = lerp(p.alpha, p.talpha, alphaStr);

        const a = Math.max(0, Math.min(1, p.alpha));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${AMBER.r},${AMBER.g},${AMBER.b},${a})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [buildScene, scatter]);

  return <canvas ref={canvasRef} style={{ display: "block", width: "100%" }} />;
}
