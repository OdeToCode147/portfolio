import { useRef } from 'react';
import { ArrowDownToLine, ArrowRight } from 'lucide-react';
import { person, proof } from '../content';
import { Anchor } from '../lib/SmoothScroll';
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '../lib/motion';
import Magnetic from './Magnetic';
import StackFigure from './StackFigure';

export default function Hero() {
  const scope = useRef(null);

  // The one orchestrated moment: headline lines rise out of their masks,
  // then the supporting copy and the figure settle in. ~900ms.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      let split;
      document.fonts.ready.then(() => {
        if (!scope.current) return;
        const h1 = scope.current.querySelector('h1');
        split = SplitText.create(h1, { type: 'lines', mask: 'lines', autoSplit: true });
        // CSS holds these at opacity 0 until now, so tween to explicit values.
        gsap.set(h1, { opacity: 1, animation: 'none' });
        gsap.set('[data-hero-fade], [data-hero-figure]', { animation: 'none' });
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from(split.lines, { yPercent: 105, duration: 0.85, stagger: 0.09 })
          .fromTo('[data-hero-fade]', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.07 }, 0.35)
          .fromTo('[data-hero-figure]', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9 }, 0.2);
      });
      return () => split?.revert();
    },
    { scope },
  );

  return (
    <section id="top" ref={scope} className="relative overflow-hidden pt-nav" aria-labelledby="hero-title">
      <div aria-hidden="true" className="grid-paper pointer-events-none absolute inset-0" />

      <div className="wrap relative grid items-center gap-12 pb-20 pt-12 sm:pt-16 lg:min-h-[calc(100svh-var(--nav-h))] lg:grid-cols-12 lg:gap-10 lg:pb-16 lg:pt-8">
        <div className="lg:col-span-7">
          <p data-hero data-hero-fade className="mono mb-7 inline-flex items-center gap-2.5 rounded-full border border-rule bg-panel px-3.5 py-1.5 text-graphite">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            <span>
              {person.availability}
              <span className="hidden sm:inline"> {person.availabilityWhere}</span>
            </span>
          </p>

          <h1 id="hero-title" data-hero className="text-4 font-bold">
            I build web apps from the pixel to the server.
          </h1>

          <p data-hero data-hero-fade className="mt-7 max-w-[36rem] text-1 leading-relaxed text-graphite">
            I’m {person.name}, a Melbourne full stack developer with 2.5+ years shipping React, Next.js, Node and Django for real
            clients. I like sitting close to the people a product is for, then owning the build.
          </p>

          <div data-hero data-hero-fade className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Anchor href="#work" className="btn btn-primary">
                See selected work <ArrowRight className="nudge-x size-4" strokeWidth={1.75} />
              </Anchor>
            </Magnetic>
            <a href={person.resume} download className="btn btn-ghost">
              Résumé <span className="mono text-muted">PDF · {person.resumeSize}</span>
              <ArrowDownToLine className="nudge-y size-4" strokeWidth={1.75} />
            </a>
          </div>

          <ul data-hero data-hero-fade className="mt-14 grid max-w-[40rem] grid-cols-3 gap-4 border-t border-rule pt-6">
            {proof.map((p) => (
              <li key={p.label}>
                <span className="block text-2 font-bold [font-stretch:118%]">{p.value}</span>
                <span className="mt-1 block text-[0.85rem] leading-snug text-muted">{p.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div data-hero data-hero-figure className="mx-auto w-full max-w-[34rem] lg:col-span-5">
          <StackFigure />
        </div>
      </div>
    </section>
  );
}
