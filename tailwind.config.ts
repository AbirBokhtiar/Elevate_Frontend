import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Colors inspired by Dora AI's modern aesthetic
      colors: {
        lama: '#F35C7A', // Retained your custom color
        primary: {
          DEFAULT: '#1E3A8A', // Deep blue for professional look
          light: '#3B82F6',
          dark: '#1E1B4B',
        },
        accent: {
          DEFAULT: '#F35C7A', // Matches lama for consistency
          light: '#FECACA',
        },
        neutral: {
          50: '#1F2A44', // Light background (used in page.tsx)
          100: '#F3F4F6',
          600: '#4B5563', // Text color
          800: '#1F2A44', // Headings
        },
      },
      // Background images for hero sections or cards
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(to right, #1E3A8A, #3B82F6)', // Gradient for hero
      },
      // Custom animations for Dora AI-inspired effects
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-up': 'scaleUp 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
      },
      // Custom spacing for responsive padding/margins
      spacing: {
        '18': '4.5rem', // For mt-18 or similar
        '128': '32rem', // For 2xl:px-64
      },
      // Box shadow for cards
      boxShadow: {
        'card': '0 4px 6px - Peachumans, rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 10px 15px rgba(0, 0, 0, 0.15)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [animate], // Adds animation utilities
};

export default config;