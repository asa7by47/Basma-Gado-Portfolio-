/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:           'var(--color-bg)',
        surface:      'var(--color-surface)',
        surfaceAlt:   'var(--color-surface-alt)',
        accent:       'var(--color-accent)',
        accentStrong: 'var(--color-accent-strong)',
        cream:        'var(--color-cream)',
        text:         'var(--color-text)',
        textMuted:    'var(--color-text-muted)',
        border:       'var(--color-border)',
        overlay:      'var(--color-overlay)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body:    ['var(--font-body)'],
      },
      fontSize: {
        'display-xl': ['4.5rem',  { lineHeight: '1.05' }],
        'display-lg': ['3.5rem',  { lineHeight: '1.08' }],
        'display-md': ['2.5rem',  { lineHeight: '1.12' }],
        'heading':    ['1.75rem', { lineHeight: '1.25' }],
        'subheading': ['1.25rem', { lineHeight: '1.4'  }],
        'body':       ['1rem',    { lineHeight: '1.6'  }],
        'small':      ['0.875rem',{ lineHeight: '1.5'  }],
        'caption':    ['0.75rem', { lineHeight: '1.4'  }],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
      },
      transitionTimingFunction: {
        'out-soft': 'var(--ease-out)',
      },
      maxWidth: {
        content: '1200px',
        prose:   '70ch',
      },
    },
  },
  plugins: [],
}
