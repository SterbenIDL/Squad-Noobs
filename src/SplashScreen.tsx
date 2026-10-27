import React, { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Studio splash screen – shown once when the game loads.
 * Timeline: fade-in -> hold -> fade-out -> onDone().
 * The player can skip with a click / tap / any key (after a short grace period).
 * Add ?nosplash to the URL to skip it while developing.
 */

const LOGO_SRC = `${import.meta.env.BASE_URL}assets/studio/tzabar_logo.png`;

const FADE_IN_MS = 900;
const HOLD_MS = 2200;
const FADE_OUT_MS = 700;
const SKIP_GRACE_MS = 500; // ignore accidental taps right at the start

interface SplashScreenProps {
  onDone: () => void;
}

export default function SplashScreen({ onDone }: SplashScreenProps) {
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false); // drives the opacity transition
  const [leaving, setLeaving] = useState(false);
  const startedAt = useRef<number>(0);
  const doneRef = useRef(false);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    clearTimers();
    onDone();
  }, [onDone]);

  const beginExit = useCallback(() => {
    if (doneRef.current || leaving) return;
    setLeaving(true);
    setVisible(false);
    clearTimers();
    timers.current.push(window.setTimeout(finish, FADE_OUT_MS));
  }, [finish, leaving]);

  // Start the timeline once the logo image is ready
  useEffect(() => {
    if (!loaded) return;
    startedAt.current = Date.now();
    // next frame so the browser registers opacity:0 first and animates to 1
    const raf = requestAnimationFrame(() => setVisible(true));
    timers.current.push(window.setTimeout(beginExit, FADE_IN_MS + HOLD_MS));
    return () => {
      cancelAnimationFrame(raf);
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  // Safety net: if the image never loads, don't block the game
  useEffect(() => {
    const t = window.setTimeout(() => {
      if (!loaded) finish();
    }, 4000);
    return () => window.clearTimeout(t);
  }, [loaded, finish]);

  // Skip with key / click / touch
  useEffect(() => {
    const skip = () => {
      if (!loaded) return;
      if (Date.now() - startedAt.current < SKIP_GRACE_MS) return;
      beginExit();
    };
    window.addEventListener('keydown', skip);
    window.addEventListener('pointerdown', skip);
    return () => {
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
    };
  }, [loaded, beginExit]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center cursor-pointer"
      role="presentation"
    >
      <img
        src={LOGO_SRC}
        alt="Tzabar Studio"
        draggable={false}
        onLoad={() => setLoaded(true)}
        onError={() => {
          console.error('[Splash] Logo not found at:', LOGO_SRC, '- check public/assets/studio/tzabar_logo.png');
          finish();
        }}
        className="w-[min(70vmin,560px)] h-auto select-none"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.94)',
          transition: `opacity ${visible ? FADE_IN_MS : FADE_OUT_MS}ms ease, transform ${
            FADE_IN_MS + HOLD_MS
          }ms ease-out`,
          filter: 'drop-shadow(0 0 28px rgba(34,197,94,0.25))',
        }}
      />
      <span
        className="absolute bottom-6 text-[11px] tracking-widest text-emerald-300/50 font-mono"
        style={{
          opacity: visible && !leaving ? 1 : 0,
          transition: 'opacity 600ms ease 1200ms',
        }}
      >
        לחץ כדי לדלג
      </span>
    </div>
  );
}
