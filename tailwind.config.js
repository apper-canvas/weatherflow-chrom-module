/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#64748B',
        accent: '#F59E0B',
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        },
        sunny: {
          from: '#FEF3C7',
          to: '#F59E0B'
        },
        cloudy: {
          from: '#F1F5F9',
          to: '#94A3B8'
        },
        rainy: {
          from: '#DBEAFE',
          to: '#3B82F6'
        },
        snowy: {
          from: '#F8FAFC',
          to: '#CBD5E1'
        },
        stormy: {
          from: '#374151',
          to: '#1F2937'
        }
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui'],
        body: ['Inter', 'ui-sans-serif', 'system-ui'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui']
      },
      backgroundImage: {
        'sunny-gradient': 'linear-gradient(135deg, #FEF3C7 0%, #F59E0B 100%)',
        'cloudy-gradient': 'linear-gradient(135deg, #F1F5F9 0%, #94A3B8 100%)',
        'rainy-gradient': 'linear-gradient(135deg, #DBEAFE 0%, #3B82F6 100%)',
        'snowy-gradient': 'linear-gradient(135deg, #F8FAFC 0%, #CBD5E1 100%)',
        'stormy-gradient': 'linear-gradient(135deg, #374151 0%, #1F2937 100%)'
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-out'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    },
  },
  plugins: [],
}