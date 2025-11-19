/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'neo': ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        // Neo-brutalism color palette
        'brutal-black': '#000000',
        'brutal-white': '#FFFFFF',
        'brutal-yellow': '#FFD700',
        'brutal-pink': '#FF69B4',
        'brutal-blue': '#00BFFF',
        'brutal-green': '#00FF7F',
        'brutal-red': '#FF4444',
        'brutal-purple': '#9D4EDD',
      },
      boxShadow: {
        'brutal': '8px 8px 0px 0px rgba(0,0,0,1)',
        'brutal-lg': '12px 12px 0px 0px rgba(0,0,0,1)',
        'brutal-sm': '4px 4px 0px 0px rgba(0,0,0,1)',
        'brutal-colored': '8px 8px 0px 0px',
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
        '5': '5px',
      },
    },
  },
  plugins: [],
}
