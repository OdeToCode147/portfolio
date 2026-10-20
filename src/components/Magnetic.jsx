import { useRef } from 'react';
import { gsap, useGSAP, finePointer, prefersReducedMotion } from '../lib/motion';

// Pulls its child a little toward the pointer, then springs back.
export default function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el || !finePointer() || prefersReducedMotion()) return;

    const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

    const move = (e) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * strength);
      y((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      x(0);
      y(0);
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  });

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {children}
    </span>
  );
}
