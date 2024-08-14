/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'blue-to-purple': 'linear-gradient(to right, #3b82f6, #6d28d9)',
        'pink-to-orange': 'linear-gradient(to right, #ec4899, #f97316)',
        'teal-to-blue': 'linear-gradient(to right, #4fd1c5, #3b82f6)',
        'red-to-yellow': 'linear-gradient(to right, #ef4444, #facc15)',
        'green-to-teal': 'linear-gradient(to right, #10b981, #14b8a6)',
        'indigo-to-blue': 'linear-gradient(to right, #4f46e5, #3b82f6)',
        'purple-to-pink': 'linear-gradient(to right, #6d28d9, #ec4899)',
        'orange-to-red': 'linear-gradient(to right, #f97316, #ef4444)',
        'gray-to-blue': 'linear-gradient(to right, #9ca3af, #3b82f6)',
        'cyan-to-purple': 'linear-gradient(to right, #06b6d4, #6d28d9)',
        'yellow-to-pink': 'linear-gradient(to right, #facc15, #ec4899)',
        'blue-to-green': 'linear-gradient(to right, #60a5fa, #10b981)',
        'red-to-pink': 'linear-gradient(to right, #ef4444, #ec4899)',
        'lime-to-teal': 'linear-gradient(to right, #84cc16, #14b8a6)',
        'fuchsia-to-blue': 'linear-gradient(to right, #d946ef, #3b82f6)',
        'rose-to-orange': 'linear-gradient(to right, #f43f5e, #f97316)',
      },
      fontFamily: {
        'playlist': ['Playlist-Script', 'sans-serif'], // Adding the custom font
      },
      colors: {
        rank: {
          mythic: "#F87171",
          legend: "#FBBF24",
          epic: "#A78BFA",
          rare: "#60A5FA"
        },
        pastel: {
          blue: '#AEC6CF',
          pink: '#FFB7B2',
          green: '#77DD77',
          purple: '#C1C3FF',
          yellow: '#FFEF9F',
          orange: '#FFCCBA',
          red: '#FF6961',
          teal: '#B2F2BB',
          cyan: '#A2D5F2',
          lime: '#B5EAD7',
          fuchsia: '#F49AC2',
          rose: '#F4C2C2',
          indigo: '#C6A4A4',
          violet: '#CFCFC4',
          sky: '#B0E0E6',
          emerald: '#66CDAA',
        }
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["cupcake", "emerald", "valentine", "pastel", "nord", "dark"],
  },
}

