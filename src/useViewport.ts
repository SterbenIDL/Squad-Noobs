import { useEffect, useState } from 'react';

const LAND_QUERY = '(orientation: landscape) and (max-height: 500px)';
const PORT_QUERY = '(orientation: portrait) and (max-width: 700px)';

function match(q: string) {
  return typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(q).matches;
}

/** Tracks whether the device is a phone held sideways (play mode) or upright (rotate prompt). */
export function useViewport() {
  const [phoneLand, setPhoneLand] = useState<boolean>(() => match(LAND_QUERY));
  const [phonePort, setPhonePort] = useState<boolean>(() => match(PORT_QUERY));

  useEffect(() => {
    const l = window.matchMedia(LAND_QUERY);
    const p = window.matchMedia(PORT_QUERY);
    const update = () => {
      setPhoneLand(l.matches);
      setPhonePort(p.matches);
    };
    update();
    l.addEventListener?.('change', update);
    p.addEventListener?.('change', update);
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    return () => {
      l.removeEventListener?.('change', update);
      p.removeEventListener?.('change', update);
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);

  return { phoneLand, phonePort };
}

/** iPhone Safari has no Fullscreen API (iPad and Android do). */
export const canFullscreen: boolean =
  typeof document !== 'undefined' &&
  !!(document.documentElement.requestFullscreen || (document.documentElement as any).webkitRequestFullscreen);

export const isIOS: boolean =
  typeof navigator !== 'undefined' &&
  (/iPhone|iPad|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

/** True when launched from the home screen as an installed app. */
export function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    (window.navigator as any).standalone === true ||
    (window.matchMedia && window.matchMedia('(display-mode: fullscreen), (display-mode: standalone)').matches)
  );
}
