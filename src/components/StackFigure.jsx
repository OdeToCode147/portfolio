import { useCallback, useRef, useState } from 'react';
import { exploded } from '@lucasmarkes/hairline';
import Figure from './Figure';
import { layers } from '../content';

// The hero's proof object: an app taken apart into four layers. The figure
// reports which layer the pointer picks; the legend lights the matching part
// of the stack.
export default function StackFigure() {
  const [active, setActive] = useState(null);
  const caption = useRef(null);

  const onRead = useCallback((text) => {
    const m = /^0(\d)/.exec(text);
    setActive(m ? Number(m[1]) - 1 : null);
    if (caption.current) caption.current.textContent = text || 'at rest';
  }, []);

  return (
    <figure className="relative">
      <Figure
        mount={exploded}
        play
        intensity={0.7}
        onRead={onRead}
        label="An app window taken apart into four layers, standing for interface, API, data and cloud. Move the pointer across it to open the layers."
        className="-mx-[7%] w-[114%]"
      />
      <figcaption className="mt-2 grid gap-5">
        <div className="mono flex items-center gap-3 text-muted">
          <span>fig. 1</span>
          <span className="dim flex-1" aria-hidden="true" />
          <span ref={caption} aria-hidden="true" className="tabular-nums">
            at rest
          </span>
        </div>
        <ol className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4 lg:grid-cols-2">
          {layers.map((l, i) => {
            const on = active === l.layer;
            return (
              <li key={l.name} className="flex items-baseline gap-2.5">
                <span
                  className={`mono transition-colors duration-200 ${on ? 'text-accent' : 'text-muted'}`}
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>
                <span>
                  <span
                    className={`block font-semibold [font-stretch:112%] transition-colors duration-200 ${on ? 'text-accent' : 'text-ink'}`}
                  >
                    {l.name}
                  </span>
                  <span className="block text-[0.85rem] leading-snug text-muted">{l.tools.slice(0, 3).join(' · ')}</span>
                </span>
              </li>
            );
          })}
        </ol>
      </figcaption>
    </figure>
  );
}
