import { person } from '../content';
import { Anchor } from '../lib/SmoothScroll';
import { Monogram } from './Nav';

// Signed off like an engineering drawing's title block.
export default function Footer() {
  const cells = [
    ['Drawn by', person.fullName],
    ['Location', '37.81° S, 144.96° E · Melbourne'],
    ['Built with', 'React · GSAP · Lenis · Hairline'],
    ['Revision', `${new Date().getFullYear()}`],
  ];

  return (
    <footer className="pb-10">
      <div className="wrap">
        <div className="grid overflow-hidden rounded-card border border-rule-strong md:grid-cols-[auto_1fr]">
          <div className="flex items-center gap-3 border-b border-rule-strong p-5 md:border-b-0 md:border-r">
            <Monogram className="size-9 text-ink" />
            <span className="font-semibold [font-stretch:112%]">{person.name}</span>
          </div>
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {cells.map(([k, v], i) => (
              <div
                key={k}
                className={`border-rule-strong p-5 ${i % 2 === 0 ? 'border-r' : ''} ${i < 2 ? 'border-b lg:border-b-0' : ''} ${
                  i === 1 ? 'lg:border-r' : ''
                }`}
              >
                <dt className="mono text-muted">{k}</dt>
                <dd className="mt-1 text-[0.92rem] text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-5 flex justify-between gap-4 text-[0.85rem] text-muted">
          <span>© {new Date().getFullYear()} {person.fullName}</span>
          <Anchor href="#top" className="link-draw">
            Back to top ↑
          </Anchor>
        </div>
      </div>
    </footer>
  );
}
