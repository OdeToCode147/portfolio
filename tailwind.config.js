/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        panel: 'var(--panel)',
        ink: 'var(--ink)',
        graphite: 'var(--graphite)',
        muted: 'var(--muted)',
        rule: 'var(--rule)',
        'rule-strong': 'var(--rule-strong)',
        accent: 'var(--accent)',
        'accent-ink': 'var(--accent-ink)',
        'accent-wash': 'var(--accent-wash)',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
      },
      fontSize: {
        '-1': 'var(--step--1)',
        0: 'var(--step-0)',
        1: 'var(--step-1)',
        2: 'var(--step-2)',
        3: 'var(--step-3)',
        4: 'var(--step-4)',
      },
      borderRadius: {
        card: 'var(--radius)',
      },
      spacing: {
        section: 'var(--section)',
        nav: 'var(--nav-h)',
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
      },
    },
  },
  plugins: [],
};
