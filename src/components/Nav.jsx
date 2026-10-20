import { useEffect, useRef, useState } from 'react';
import { ArrowDownToLine, Menu, X } from 'lucide-react';
import { nav, person } from '../content';
import { Anchor, useSmoothScroll } from '../lib/SmoothScroll';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../lib/motion';
import ThemeToggle from './ThemeToggle';

export function Monogram({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <path d="M14 38 32 28l18 10-18 10z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M14 28 32 18l18 10-18 10z" fill="var(--accent)" />
    </svg>
  );
}

function useActiveSection() {
  const [active, setActive] = useState(null);
  useEffect(() => {
    const els = nav.map((n) => document.getElementById(n.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

export default function Nav() {
  const header = useRef(null);
  const bar = useRef(null);
  const menu = useRef(null);
  const menuButton = useRef(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();
  const { stop, start } = useSmoothScroll();

  // Hide on the way down, return on the way up; progress hairline along the bottom.
  useGSAP(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        setScrolled(self.scroll() > 24);
        gsap.set(bar.current, { scaleX: self.progress });
        if (prefersReducedMotion()) return;
        const hide = self.direction === 1 && self.scroll() > 480;
        gsap.to(header.current, { yPercent: hide ? -100 : 0, duration: 0.3, ease: 'power2.out', overwrite: true });
      },
    });
    return () => st.kill();
  });

  // Mobile menu: lock scroll, trap Escape, stagger the links in.
  useEffect(() => {
    if (!open) return;
    const trigger = menuButton.current;
    stop();
    const links = menu.current.querySelectorAll('[data-menu-item]');
    links[0]?.focus();
    if (!prefersReducedMotion()) {
      gsap.fromTo(links, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out' });
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      start();
      window.removeEventListener('keydown', onKey);
      trigger?.focus();
    };
  }, [open, stop, start]);

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-3 z-[60] -translate-y-20 rounded-full bg-ink px-4 py-2 text-paper focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        ref={header}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-200 ease-out ${
          scrolled || open ? 'nav-glass border-b border-rule' : 'border-b border-transparent'
        }`}
      >
        <div className="wrap flex h-nav items-center justify-between gap-6">
          <Anchor href="#top" className="flex items-center gap-2.5 font-semibold [font-stretch:112%]" aria-label="Satya Talla, back to top">
            <Monogram className="size-7 text-ink" />
            <span>{person.name}</span>
          </Anchor>

          <nav aria-label="Sections" className="hidden md:block">
            <ul className="flex items-center gap-7 text-[0.95rem]">
              {nav.map((n) => (
                <li key={n.id}>
                  <Anchor
                    href={`#${n.id}`}
                    aria-current={active === n.id ? 'location' : undefined}
                    className={`link-draw transition-colors duration-200 ${active === n.id ? 'text-ink' : 'text-muted hover:text-ink'}`}
                  >
                    {n.label}
                  </Anchor>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            <a href={person.resume} download className="btn btn-ghost hidden h-10 px-4 text-[0.9rem] sm:inline-flex">
              Résumé <ArrowDownToLine className="nudge-y size-4" strokeWidth={1.75} />
            </a>
            <ThemeToggle />
            <button
              ref={menuButton}
              type="button"
              className="grid size-10 place-items-center rounded-full border border-rule md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="size-5" strokeWidth={1.5} /> : <Menu className="size-5" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
        <div ref={bar} aria-hidden="true" className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-accent" />
      </header>

      {open && (
        <div id="mobile-menu" ref={menu} className="fixed inset-0 z-40 bg-paper pt-nav md:hidden">
          <nav aria-label="Sections" className="wrap flex h-full flex-col justify-between pb-10 pt-8">
            <ul className="space-y-1">
              {nav.map((n) => (
                <li key={n.id} className="overflow-hidden">
                  <Anchor
                    data-menu-item
                    href={`#${n.id}`}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-3 font-semibold [font-stretch:118%]"
                  >
                    {n.label}
                  </Anchor>
                </li>
              ))}
            </ul>
            <div className="space-y-4">
              <a href={person.resume} download className="btn btn-primary w-full justify-center">
                Download résumé <ArrowDownToLine className="size-4" strokeWidth={1.75} />
              </a>
              <p className="mono text-center text-muted">{person.email}</p>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
