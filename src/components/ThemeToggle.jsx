import { useState } from 'react';
import { flushSync } from 'react-dom';
import { Moon, Sun } from 'lucide-react';
import { prefersReducedMotion } from '../lib/motion';

const isDark = () => document.documentElement.classList.contains('dark');

export default function ThemeToggle() {
  const [dark, setDark] = useState(isDark);

  const apply = (next) => {
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      /* private mode: the choice just won't persist */
    }
    setDark(next);
  };

  const toggle = (e) => {
    const next = !dark;
    if (!document.startViewTransition || prefersReducedMotion()) {
      apply(next);
      return;
    }
    // Reveal the new theme as a circle growing from the button.
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const t = document.startViewTransition(() => flushSync(() => apply(next)));
    t.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
      );
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={dark}
      className="grid size-10 place-items-center rounded-full border border-rule text-ink transition-colors duration-200 ease-out hover:border-ink"
    >
      {dark ? <Sun className="size-[18px]" strokeWidth={1.5} /> : <Moon className="size-[18px]" strokeWidth={1.5} />}
    </button>
  );
}
