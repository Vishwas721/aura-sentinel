/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', /* slate-400 with opacity */
        input: 'var(--color-input)', /* slate-800 */
        ring: 'var(--color-ring)', /* electric cyan */
        background: 'var(--color-background)', /* slate-900 */
        foreground: 'var(--color-foreground)', /* slate-50 */
        primary: {
          DEFAULT: 'var(--color-primary)', /* electric cyan */
          foreground: 'var(--color-primary-foreground)', /* slate-900 */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* slate-800 */
          foreground: 'var(--color-secondary-foreground)', /* slate-50 */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* red-600 */
          foreground: 'var(--color-destructive-foreground)', /* slate-50 */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* slate-700 */
          foreground: 'var(--color-muted-foreground)', /* slate-400 */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* yellow-400 */
          foreground: 'var(--color-accent-foreground)', /* slate-900 */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* slate-800 */
          foreground: 'var(--color-popover-foreground)', /* slate-50 */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* slate-800 */
          foreground: 'var(--color-card-foreground)', /* slate-50 */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* green-500 */
          foreground: 'var(--color-success-foreground)', /* slate-900 */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* red-500 */
          foreground: 'var(--color-warning-foreground)', /* slate-50 */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* red-600 */
          foreground: 'var(--color-error-foreground)', /* slate-50 */
        },
        surface: 'var(--color-surface)', /* slate-800 */
        'text-primary': 'var(--color-text-primary)', /* slate-50 */
        'text-secondary': 'var(--color-text-secondary)', /* slate-400 */
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
      boxShadow: {
        'cyber-sm': '0 4px 12px rgba(0, 240, 255, 0.1)',
        'cyber-md': '0 8px 24px rgba(0, 0, 0, 0.4)',
        'cyber-lg': '0 16px 32px rgba(0, 0, 0, 0.5)',
        'glow-cyan': '0 0 4px rgba(0, 240, 255, 0.4)',
        'glow-cyan-strong': '0 0 8px rgba(0, 240, 255, 0.6)',
      },
      animation: {
        'pulse-data': 'pulse-data 2s ease-in-out infinite',
        'glow-cyan': 'glow-cyan 2s ease-in-out infinite',
        'skeleton': 'skeleton-loading 1.5s infinite',
      },
      keyframes: {
        'pulse-data': {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
        'glow-cyan': {
          '0%, 100%': { boxShadow: '0 0 4px rgba(0, 240, 255, 0.3)' },
          '50%': { boxShadow: '0 0 8px rgba(0, 240, 255, 0.6)' },
        },
        'skeleton-loading': {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        },
      },
      transitionDuration: {
        '150': '150ms',
        '300': '300ms',
        '500': '500ms',
        '2000': '2000ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      zIndex: {
        '1000': '1000',
        '1100': '1100',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}