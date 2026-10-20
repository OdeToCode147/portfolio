# Satya Talla · Portfolio

Personal site for Satya Talla, full stack developer in Melbourne.

**Design direction: "Drafting Table".** Paper, ink and one ultramarine accent, set in Archivo (wide cuts for headings) with JetBrains Mono annotations. The signature is an engineering-drawing feel: a Hairline isometric figure of an app taken apart into four layers (interface, API, data, cloud), dimension lines, and a footer laid out like a drawing's title block.

## Stack

- React 19 + Vite, Tailwind CSS (theme tokens live as CSS variables in `src/index.css`)
- [GSAP](https://gsap.com) with ScrollTrigger and SplitText for the hero load sequence, the stacking case studies and the experience timeline
- [Lenis](https://lenis.darkroom.engineering) for smooth scrolling, driven by GSAP's ticker
- [Hairline](https://hairline.lucasmarkes.com) for the pointer-reactive line figures (imported per figure to keep the bundle small)
- Self-hosted variable fonts through Fontsource

Motion respects `prefers-reduced-motion`: Lenis, the load sequence and the scroll scenes switch off, and nothing waits on an animation to be readable.

## Editing content

All copy (projects, experience, stack, credentials, contact details) is in `src/content.js`. The résumé PDF is `public/resume/`. Project screenshots are WebP files in `src/assets/images/` (1600px and 800px widths).

## Scripts

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run lint
```

## Deploy

Deployed on Vercel from the `main` branch. Vercel detects Vite automatically: build command `npm run build`, output `dist`.
