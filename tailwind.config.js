/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        festive: {
          dark: '#080518',
          purple: '#13092A',
          deep: '#1E0C42',
          gold: '#FFD700',
          amber: '#F59E0B',
          flame: '#FF6B00',
          crimson: '#E11D48',
          marigold: '#FFA500',
          rose: '#FDA4AF',
        }
      },
      fontFamily: {
        heading: ['Cinzel', 'serif'],
        handwriting: ['"Great Vibes"', 'cursive'],
        body: ['Poppins', 'sans-serif'],
      },
      animation: {
        'flame-flicker': 'flame 2s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        flame: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: '0.95' },
          '25%': { transform: 'scale(1.08) rotate(1.5deg)', opacity: '1' },
          '50%': { transform: 'scale(0.96) rotate(-1deg)', opacity: '0.9' },
          '75%': { transform: 'scale(1.05) rotate(0.8deg)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 15px rgba(245, 158, 11, 0.4))' },
          '50%': { filter: 'drop-shadow(0 0 30px rgba(245, 158, 11, 0.8))' },
        }
      },
      boxShadow: {
        'gold-glow': '0 0 35px -5px rgba(245, 158, 11, 0.4)',
        'flame-glow': '0 0 45px 0px rgba(255, 107, 0, 0.5)',
        'card-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}
