import { alsoUse, layers } from '../content';

export default function Stack() {
  return (
    <section id="stack" className="border-t border-rule bg-panel py-section" aria-labelledby="stack-title">
      <div className="wrap">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 lg:mb-16">
          <h2 id="stack-title" className="text-3 font-bold">
            The stack, layer by layer
          </h2>
          <p className="max-w-[28rem] text-graphite">The same four layers as the figure up top, with what I reach for in each.</p>
        </div>

        <ol className="border-t border-ink">
          {layers.map((l, i) => (
            <li key={l.name} className="group grid gap-4 border-b border-rule py-7 md:grid-cols-12 md:gap-8 md:py-9">
              <div className="flex items-baseline gap-4 md:col-span-3">
                <span className="mono text-accent">0{i + 1}</span>
                <h3 className="text-2 font-bold">{l.name}</h3>
              </div>
              <ul className="flex flex-wrap gap-x-1 gap-y-1 text-1 font-medium md:col-span-5">
                {l.tools.map((t, k) => (
                  <li key={t} className="text-ink">
                    {t}
                    {k < l.tools.length - 1 && (
                      <span aria-hidden="true" className="px-2 text-rule-strong">
                        /
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              <p className="text-graphite md:col-span-4">{l.note}</p>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-graphite">
          <span className="font-semibold text-ink">Also in the toolbox: </span>
          {alsoUse.join(', ')}.
        </p>
      </div>
    </section>
  );
}
