import { useState } from 'react';
import { hub } from '@lucasmarkes/hairline';
import { ArrowDownToLine, ArrowUpRight, Check, Copy, Github, Linkedin } from 'lucide-react';
import { person } from '../content';
import Figure from './Figure';
import Magnetic from './Magnetic';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${person.email}`;
    }
  };

  return (
    <section id="contact" className="border-t border-rule py-section" aria-labelledby="contact-title">
      <div className="wrap grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 id="contact-title" className="text-4 font-bold">
            Let’s build something worth shipping.
          </h2>
          <p className="mt-7 max-w-[34rem] text-1 leading-relaxed text-graphite">
            I’m looking for a full-time developer role. Based in Melbourne with full work rights in Australia, and open
            to any city or work mode.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href={`mailto:${person.email}`} className="btn btn-primary h-14 px-6 text-1">
                {person.email}
              </a>
            </Magnetic>
            <button
              type="button"
              onClick={copy}
              className="btn btn-ghost h-14 w-14 justify-center px-0"
              aria-label={copied ? 'Email address copied' : 'Copy email address'}
            >
              {copied ? <Check className="size-5 text-accent" strokeWidth={1.75} /> : <Copy className="size-5" strokeWidth={1.5} />}
            </button>
            <span role="status" className="mono text-accent">
              {copied ? 'Copied' : ''}
            </span>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            <li>
              <a href={person.linkedin} target="_blank" rel="noreferrer" className="link-draw inline-flex items-center gap-2 font-medium">
                <Linkedin className="size-4" strokeWidth={1.75} aria-hidden="true" /> LinkedIn
                <ArrowUpRight className="size-4 text-muted" strokeWidth={1.75} aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={person.github} target="_blank" rel="noreferrer" className="link-draw inline-flex items-center gap-2 font-medium">
                <Github className="size-4" strokeWidth={1.75} aria-hidden="true" /> GitHub
                <ArrowUpRight className="size-4 text-muted" strokeWidth={1.75} aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={person.resume} download className="link-draw inline-flex items-center gap-2 font-medium">
                <ArrowDownToLine className="size-4" strokeWidth={1.75} aria-hidden="true" /> Résumé (PDF)
              </a>
            </li>
          </ul>
        </div>

        <figure className="mx-auto w-full max-w-[26rem] lg:col-span-5">
          <Figure
            mount={hub}
            play
            intensity={0.6}
            label="A hub with eight tiles on dashed links. The tile under the pointer rises and its link turns solid."
            className="w-full"
          />
          <figcaption className="mono mt-2 flex items-center gap-3 text-muted">
            <span>fig. 2</span>
            <span className="dim flex-1" aria-hidden="true" />
            <span>you, connected</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
