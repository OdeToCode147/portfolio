import hikewise from './assets/images/hikewise.webp';
import hikewiseSm from './assets/images/hikewise-800.webp';
import spiritwell from './assets/images/spiritwell.webp';
import spiritwellSm from './assets/images/spiritwell-800.webp';
import birdtag from './assets/images/birdtag.webp';
import birdtagSm from './assets/images/birdtag-800.webp';
import movies from './assets/images/movies.webp';
import moviesSm from './assets/images/movies-800.webp';

// Every claim on the site comes from the facts ledger used for cover letters.
// Edit here, not in components.

export const person = {
  name: 'Satya Talla',
  fullName: 'Satya Surya Vamsi Talla',
  role: 'Full stack developer',
  location: 'Melbourne, Australia',
  email: 'satyasvtalla@gmail.com',
  linkedin: 'https://www.linkedin.com/in/suryatalla147/',
  github: 'https://github.com/OdeToCode147',
  resume: '/resume/Satya_Talla_Software_Engineer_Resume.pdf',
  resumeSize: '83 KB',
  availability: 'Open to full-time roles',
  availabilityWhere: 'across Australia',
};

export const nav = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'stack', label: 'Stack' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export const proof = [
  { value: '2.5+', label: 'years shipping production web apps' },
  { value: '1st', label: 'Best Project, Monash Industry Expo 2025' },
  { value: '90+', label: 'Lighthouse scores held on client builds' },
];

// Ordered top to bottom as the hero figure stacks them.
// `layer` is the Hairline Exploded layer index (0 = bottom plate).
export const layers = [
  {
    layer: 3,
    name: 'Interface',
    tools: ['React', 'Next.js', 'TypeScript', 'Vue.js', 'Tailwind CSS', 'Vite', 'WebAR (8th Wall)'],
    note: 'Responsive, accessible (WCAG 2.1) and fast: Lighthouse 90+ is the bar, not the goal.',
  },
  {
    layer: 2,
    name: 'API',
    tools: ['Node.js', 'Express', 'Django', 'REST APIs', 'Python', 'Java', 'Sanity CMS'],
    note: 'Documented REST services, modular back ends, and CMS integrations non-developers can run.',
  },
  {
    layer: 1,
    name: 'Data',
    tools: ['PostgreSQL / PostGIS', 'MongoDB', 'MySQL', 'Redis', 'Firestore', 'DynamoDB'],
    note: 'From spatial queries over bushfire polygons to tag indexes and caching layers.',
  },
  {
    layer: 0,
    name: 'Cloud',
    tools: ['AWS (EC2, S3, Lambda, Cognito)', 'Docker', 'GitHub Actions', 'Firebase'],
    note: 'Serverless where it saves money, containers where it saves time, CI/CD on every PR.',
  },
];

export const alsoUse = ['Google Gemini API', 'PlantNet API', 'Model Context Protocol', 'Claude', 'Git', 'Postman', 'Agile / Scrum'];

export const projects = [
  {
    id: 'hikewise',
    title: 'Hikewise',
    kind: 'Bushfire recovery & trail visualisation',
    award: 'Best Project · Monash PG Industry Experience Expo, S2 2025',
    summary:
      'A geospatial platform that shows Victorian hikers which trails crossed burnt ground, and lets them log species they find on the way back.',
    role: 'Sole full stack developer in a cross-functional team spanning business, IT, data science and cybersecurity.',
    outcomes: [
      { value: '60%', label: 'faster map loads after optimising spatial rendering' },
      { value: '95%', label: 'species ID accuracy with PlantNet AI' },
      { value: '500+', label: 'trail records, sourced with Parks Victoria' },
    ],
    call:
      'Two days before submission a mentor ruled out storing user data. I reworked the login-gated alerts into an open bushfire-alert tab, kept the safety intent, and we shipped on time.',
    stack: ['React', 'Django', 'PostgreSQL / PostGIS', 'AWS EC2 · S3', 'GitHub Actions'],
    image: hikewise,
    imageSm: hikewiseSm,
    url: 'hikewise · trail map',
    links: [],
  },
  {
    id: 'spiritwell',
    title: 'SpiritWell',
    kind: 'Mental wellness for young people',
    summary:
      'A wellness companion for 12 to 25 year olds: mood tracking, AI wellness coaching through Google Gemini, and crisis detection.',
    role: 'Solo build, from data model to interface, run alongside Hikewise on overlapping deadlines.',
    outcomes: [
      { value: '98%', label: 'WCAG 2.1 accessibility compliance' },
      { value: 'AI', label: 'coaching and crisis detection with Gemini' },
      { value: 'Live', label: 'mood dashboards with Chart.js' },
    ],
    call: 'I cut a planned gamification layer so the core experience could be done properly. Both projects landed on time.',
    stack: ['Vue.js', 'Firestore', 'Google Gemini', 'Chart.js'],
    image: spiritwell,
    imageSm: spiritwellSm,
    url: 'spiritwell.pages.dev',
    links: [{ label: 'Live site', href: 'https://spiritwell.pages.dev/' }],
  },
  {
    id: 'birdtag',
    title: 'BirdTag',
    kind: 'Serverless media storage & tagging',
    summary:
      'Upload a photo, video or recording of a bird and the pipeline detects the species, generates thumbnails and files it under searchable tags, with no server to run.',
    role: 'Built the React front end and coordinated deliverables across a four-person team.',
    outcomes: [
      { value: '70%', label: 'lower infrastructure cost with a serverless design' },
      { value: '60%', label: 'lower query latency from tag-based indexing' },
      { value: '100+', label: 'concurrent users supported' },
    ],
    stack: ['React', 'AWS Lambda', 'S3', 'DynamoDB'],
    image: birdtag,
    imageSm: birdtagSm,
    url: 'birdtag · dashboard',
    links: [],
  },
];

export const earlier = {
  title: 'ScreenSavor',
  kind: 'Movie & TV discovery on the TMDB API',
  summary: '500,000+ titles with filtering by genre, rating and streaming platform, paginated search, and a responsive layout.',
  stack: ['React', 'TMDB API', 'Bootstrap'],
  image: movies,
  imageSm: moviesSm,
  links: [
    { label: 'Live site', href: 'https://poetic-cocada-7230c0.netlify.app/' },
    { label: 'Code', href: 'https://github.com/OdeToCode147/Movie-And-TV-Show-App' },
  ],
};

export const experience = [
  {
    role: 'Full Stack Developer (Contract)',
    org: 'NUvibe',
    place: 'Sydney · remote',
    dates: 'Dec 2025 — Sep 2026',
    points: [
      'Delivered 4+ responsive web apps for healthcare, fitness and e-commerce clients in React, Next.js and TypeScript.',
      'Built a production WebAR platform with 8th Wall and WebRTC that serves AI-animated content from image triggers, lifting dwell time 40% across 3 live installations.',
      'Cut average page loads by 30% and held Lighthouse above 90 with Vite, Tailwind and technical SEO fixes.',
      'Integrated Sanity headless CMS so marketing and content teams publish without a developer; publishing cycles got 50% faster.',
      'Joined client calls to shape requirements, then owned the build through PR reviews and GitHub Actions CI/CD.',
    ],
  },
  {
    role: 'Master of Information Technology',
    org: 'Monash University',
    place: 'Melbourne',
    dates: 'Feb 2024 — Dec 2025',
    points: [
      'Graduated with Distinction (WAM 74.75).',
      'Capstone Hikewise won Best Project at the Postgraduate Industry Experience Expo, S2 2025.',
    ],
  },
  {
    role: 'Full Stack Developer',
    org: 'WV Automation',
    place: 'Hyderabad, India',
    dates: 'Jul 2021 — Oct 2023',
    points: [
      'Shipped 8+ MERN client projects for platforms serving 500+ daily users, in Agile sprints with a cross-functional team.',
      'Re-architected a monolithic Node.js back end into modular services with documented REST APIs: 25% faster responses, ~3,000 lines of dead code gone.',
      'Rebuilt the front end around a library of reusable React components, cutting page loads by 40%.',
      'Mentored through pair programming, code reviews and written docs; onboarding got 20% shorter.',
    ],
  },
];

export const principles = [
  {
    title: 'Listen first, then build',
    body: 'I hear every perspective before proposing a fix, so the thing I build is the thing people actually need.',
  },
  {
    title: 'Flag it early, bring a fix',
    body: 'When a plan stops working I say so the same day, with an option on the table rather than just the problem.',
  },
  {
    title: 'Scope honestly',
    body: 'Protect the core, cut the nice-to-haves, and ship something whole instead of everything half-done.',
  },
  {
    title: 'Measure the craft',
    body: 'Performance budgets, accessibility audits and reusable components, checked rather than assumed.',
  },
];

export const credentials = [
  { title: 'AWS Certified Developer – Associate', meta: 'In progress · expected Nov 2026' },
  { title: 'Model Context Protocol: Advanced Topics', meta: 'Anthropic Academy · 2026' },
  { title: 'Introduction to Agent Skills', meta: 'Anthropic Academy · 2026' },
  { title: 'B.Tech, Electrical & Electronics Engineering', meta: 'Manipal Institute of Technology' },
];
