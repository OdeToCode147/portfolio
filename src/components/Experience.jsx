import { useRef } from 'react';
import { experience } from '../content';
import { gsap, useGSAP } from '../lib/motion';

export default function Experience() {
  const scope = useRef(null);

  // A rule down the left that draws itself as you read.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '[data-progress]',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: '[data-ledger]', start: 'top 70%', end: 'bottom 70%', scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section id="experience" ref={scope} className="border-t border-rule py-section" aria-labelledby="experience-title">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
            <h2 id="experience-title" className="text-3 font-bold">
              Experience
            </h2>
            <p className="mt-5 max-w-[24rem] text-graphite">
              Client platforms in India, a Master’s at Monash, then contract work for Australian clients.
            </p>
          </div>
        </div>

        <div data-ledger className="relative lg:col-span-8">
          <span aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px bg-rule" />
          <span aria-hidden="true" data-progress className="absolute bottom-0 left-0 top-0 w-px origin-top bg-accent" />

          <ol className="space-y-14">
            {experience.map((job) => (
              <li key={job.org} className="relative pl-7 sm:pl-10">
                <span aria-hidden="true" className="absolute -left-[4px] top-2 size-[9px] rounded-full border border-accent bg-paper" />
                <p className="mono text-muted">{job.dates}</p>
                <h3 className="mt-2 text-2 font-bold">{job.role}</h3>
                <p className="mt-1.5 text-graphite">
                  <span className="font-semibold text-ink">{job.org}</span> · {job.place}
                </p>
                <ul className="mt-5 space-y-3">
                  {job.points.map((pt) => (
                    <li key={pt} className="grid grid-cols-[0.9rem_1fr] gap-2 text-graphite">
                      <span aria-hidden="true" className="mt-[0.8em] h-px w-2.5 bg-rule-strong" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
