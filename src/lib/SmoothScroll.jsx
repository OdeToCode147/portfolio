import { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from './motion';

const ScrollContext = createContext({ scrollTo: () => {}, stop: () => {}, start: () => {} });

export function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, autoRaf: false });
    lenisRef.current = lenis;
    if (import.meta.env.DEV) window.__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((target) => {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;
    const offset = target === '#top' ? 0 : -16;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset, duration: 1.2 });
    } else {
      el.scrollIntoView({ block: 'start' });
    }
    // Move focus with the scroll so keyboard users land where they jumped.
    if (el.tabIndex < 0 && !el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
    history.replaceState(null, '', target === '#top' ? ' ' : target);
  }, []);

  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);

  return <ScrollContext.Provider value={{ scrollTo, stop, start }}>{children}</ScrollContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSmoothScroll = () => useContext(ScrollContext);

// Anchor link that scrolls with Lenis instead of jumping.
export function Anchor({ href, onClick, children, ...rest }) {
  const { scrollTo } = useSmoothScroll();
  return (
    <a
      href={href}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        onClick?.(e);
        scrollTo(href);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
