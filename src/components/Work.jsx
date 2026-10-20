import { useRef } from 'react';
import { ArrowUpRight, Award, Github } from 'lucide-react';
import { earlier, person, projects } from '../content';
import { gsap, useGSAP } from '../lib/motion';

function BrowserFrame({ image, imageSm, url, title }) {
  return (
    <div className="overflow-hidden rounded-xl border border-rule-strong bg-paper">
      <div className="flex items-center gap-3 border-b border-rule px-3.5 py-2.5" aria-hidden="true">
        <span className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2.5 rounded-full border border-rule-strong" />
          ))}
        </span>
        <span className="mono flex-1 truncate rounded-md bg-panel px-2.5 py-0.5 text-center text-[0.72rem] text-muted">{url}</span>
      </div>
      <div className="aspect-[1600/780] overflow-hidden">
        <img
          src={image}
          srcSet={`${imageSm} 800w, ${image} 1600w`}
          sizes="(min-width: 1024px) 50vw, 100vw"
          width="1600"
          height="780"
          loading="lazy"
          decoding="async"
          alt={`Screenshot of ${title}`}
          data-parallax
          className="h-[110%] w-full object-cover object-top"
        />
      </div>
    </div>
  );
}

function ProjectLinks({ links }) {
  if (!links.length) return null;
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {links.map((l) => (
        <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="link-draw inline-flex items-center gap-1 font-medium text-ink">
          {l.label} <ArrowUpRight className="size-4" strokeWidth={1.75} />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ))}
    </div>
  );
}

export default function Work() {
  const scope = useRef(null);

  // Scroll scene: each case study pins under the nav and the next one slides
  // over it, pushing the previous one back a step.
  useGSAP(
    () => {
      const list = scope.current.querySelector('ol');
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const cards = gsap.utils.toArray('.work-card');
        const navH = parseFloat(getComputedStyle(document.documentElement).fontSize) * 4.25;
        const fits = () => Math.max(...cards.map((c) => c.offsetHeight)) <= innerHeight - navH - 40;
        if (!fits()) return;
        list.classList.add('is-stacking');

        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (next) {
            const st = { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true };
            gsap.to(card, { scale: 0.94, ease: 'none', scrollTrigger: st });
            gsap.to(card.querySelector('[data-shade]'), { opacity: 0.55, ease: 'none', scrollTrigger: { ...st } });
          }
          gsap.fromTo(
            card.querySelector('[data-parallax]'),
            { yPercent: -6 },
            { yPercent: 0, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'top top', scrub: true } },
          );
        });
        return () => list.classList.remove('is-stacking');
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section id="work" ref={scope} className="py-section" aria-labelledby="work-title">
      <div className="wrap">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 lg:mb-16">
          <h2 id="work-title" className="text-3 font-bold">
            Selected work
          </h2>
          <p className="max-w-[28rem] text-graphite">
            Three builds, each with the numbers it moved and one decision I’d make again.
          </p>
        </div>

        <ol className="space-y-6 lg:space-y-10">
          {projects.map((p, i) => (
            <li key={p.id} className="work-card origin-top">
              <article
                aria-labelledby={`${p.id}-title`}
                className="relative grid gap-8 overflow-hidden rounded-card border border-rule bg-panel p-5 sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-10"
              >
                <div className="flex flex-col gap-6 lg:col-span-5">
                  <div className="mono flex items-center gap-3 text-muted">
                    <span className="text-accent">0{i + 1}</span>
                    <span className="h-px w-8 bg-rule-strong" aria-hidden="true" />
                    <span>{p.kind}</span>
                  </div>
                  <div>
                    <h3 id={`${p.id}-title`} className="text-3 font-bold">
                      {p.title}
                    </h3>
                    {p.award && (
                      <p className="mt-4 inline-flex items-start gap-2 rounded-lg bg-accent-wash px-3 py-1.5 text-[0.9rem] font-medium text-accent">
                        <Award className="mt-0.5 size-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                        {p.award}
                      </p>
                    )}
                  </div>
                  <p className="text-graphite">{p.summary}</p>

                  <ul className="grid grid-cols-3 gap-4 border-y border-rule py-5">
                    {p.outcomes.map((o) => (
                      <li key={o.label}>
                        <span className="block text-2 font-bold [font-stretch:118%]">{o.value}</span>
                        <span className="mt-1 block text-[0.8rem] leading-snug text-muted">{o.label}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-[0.95rem] text-graphite">
                    <span className="font-semibold text-ink">My role. </span>
                    {p.role}
                  </p>
                  {p.call && (
                    <p className="border-l-2 border-accent pl-4 text-[0.95rem] text-graphite">
                      <span className="font-semibold text-ink">A call I made. </span>
                      {p.call}
                    </p>
                  )}

                  <div className="mt-auto space-y-4">
                    <p className="mono text-muted">{p.stack.join('  /  ')}</p>
                    <ProjectLinks links={p.links} />
                  </div>
                </div>

                <div className="order-first lg:order-none lg:col-span-7 lg:self-center">
                  <BrowserFrame image={p.image} imageSm={p.imageSm} url={p.url} title={p.title} />
                </div>

                <div data-shade aria-hidden="true" className="pointer-events-none absolute inset-0 bg-paper opacity-0" />
              </article>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid items-center gap-8 border-t border-rule pt-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <BrowserFrame image={earlier.image} imageSm={earlier.imageSm} url="screensavor" title={earlier.title} />
          </div>
          <div className="space-y-3 md:col-span-8">
            <p className="mono text-muted">Earlier build</p>
            <h3 className="text-2 font-bold">
              {earlier.title} <span className="font-normal text-muted">· {earlier.kind}</span>
            </h3>
            <p className="max-w-[40rem] text-graphite">{earlier.summary}</p>
            <ProjectLinks links={earlier.links} />
          </div>
        </div>

        <p className="mt-12 text-graphite">
          More experiments live on{' '}
          <a href={person.github} target="_blank" rel="noreferrer" className="link-draw inline-flex items-center gap-1.5 font-medium text-ink">
            <Github className="size-4" strokeWidth={1.75} aria-hidden="true" /> GitHub
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          .
        </p>
      </div>
    </section>
  );
}
