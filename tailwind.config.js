/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:    '#ed3f46',
        secondary:  '#f02b2b',
        accent:     '#74c05e',
        'brown-dark':  '#362116',
        'brown-warm':  '#27150b',
        'dark':        '#191919',
        'darker':      '#0f0f0f',
        'bg-light':    '#f7f7f7',
        'muted':       '#9e9e9e',
        'text-light':  '#575454',
        'border-light':'#eeeeee',
      },
      fontFamily: {
        heading: ['Geomanist', 'Inter', 'sans-serif'],
        body:    ['Geomanist', 'Inter', 'sans-serif'],
        sans:    ['Geomanist', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['36px', { lineHeight: '50.4px', letterSpacing: '0.36px' }],
        'h1':      ['30px', { lineHeight: '1.4',   letterSpacing: '0.24px' }],
        'h2':      ['25px', { lineHeight: '1.4',   letterSpacing: '0.24px' }],
        'h3':      ['24px', { lineHeight: '40px',  letterSpacing: '0.24px' }],
        'h4':      ['20px', { lineHeight: '1.4',   letterSpacing: '0.14px' }],
        'body-l':  ['18px', { lineHeight: '1.6' }],
        'body':    ['16px', { lineHeight: '1.6' }],
        'sm':      ['15px', { lineHeight: '23.8px', letterSpacing: '0.25px' }],
        'xs':      ['14px', { lineHeight: '22.652px', letterSpacing: '0.25px' }],
        'caption': ['13px', { lineHeight: '1.4' }],
        '11':      ['11px', { lineHeight: '1.4' }],
      },
      spacing: {
        '2.5': '10px',
        '4.5': '18px',
        '13': '52px',
        '15': '60px',
        '18': '72px',
        '22': '88px',
        '25': '100px',
        '30': '120px',
      },
      borderRadius: {
        'xs':    '1px',
        'sm':    '3px',
        'md':    '4px',
        'btn':   '5px',
        'card':  '20px',
        'pill':  '30px',
        'full':  '50px',
      },
      boxShadow: {
        'low':   'rgb(153, 153, 153) 0px 1px 2px 0px',
        'mid':   'rgba(72, 139, 216, 0.2) 0px 7px 10px 0px',
        'mid2':  'rgba(0, 0, 0, 0.18) 0px 6px 12px 0px',
        'high':  'rgba(0, 0, 0, 0.15) 5px 10px 20px 0px',
        'red':   'rgba(237, 63, 70, 0.3) 0 6px 20px 0',
      },
      maxWidth: {
        'site': '1280px',
      },
      animation: {
        'fade-in-up':  'fadeInUp 0.6s ease forwards',
        'fade-in':     'fadeIn 0.5s ease forwards',
        'slide-left':  'slideInLeft 0.6s ease forwards',
        'pulse-soft':  'pulseSoft 2s ease infinite',
        'marquee':     'marquee 30s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':       { transform: 'scale(1.04)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      transitionDuration: {
        '180': '180ms',
        '280': '280ms',
      },
    },
  },
  plugins: [],
}
