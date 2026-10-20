import { credentials, principles } from '../content';

export default function About() {
  return (
    <section id="about" className="border-t border-rule py-section" aria-labelledby="about-title">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2 id="about-title" className="text-3 font-bold">
            About
          </h2>
          <div className="mt-7 space-y-5 text-1 leading-relaxed text-graphite">
            <p>
              I moved from India to Melbourne for a Master’s at Monash, after two years building client platforms in the
              MERN stack. Since then I’ve shipped WebAR installations, headless-CMS sites and a
              bushfire-recovery map that won the university’s industry expo.
            </p>
            <p>
              My best work happens where client needs meet the build: hearing what people actually need, shaping the
              solution with them, and then owning it through to production.
            </p>
            <p>
              I use AI every day as a thinking partner to stress-test ideas, and I keep full ownership of the code.
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <h3 className="text-1 font-semibold">How I work</h3>
          <ul className="mt-6 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {principles.map((p) => (
              <li key={p.title} className="border-t border-rule-strong pt-4">
                <p className="font-semibold text-ink [font-stretch:110%]">{p.title}</p>
                <p className="mt-2 text-[0.95rem] text-graphite">{p.body}</p>
              </li>
            ))}
          </ul>

          <h3 className="mt-14 text-1 font-semibold">Credentials</h3>
          <ul className="mt-5 divide-y divide-rule border-y border-rule">
            {credentials.map((c) => (
              <li key={c.title} className="flex flex-col justify-between gap-1 py-3.5 sm:flex-row sm:items-baseline sm:gap-6">
                <span className="text-ink">{c.title}</span>
                <span className="mono shrink-0 text-muted">{c.meta}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
