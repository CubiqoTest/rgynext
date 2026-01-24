/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
        extend: {
                fontFamily: {
                        sans: ['Inter', 'system-ui', 'sans-serif'],
                        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
                        mono: ['Space Grotesk', 'Menlo', 'monospace'],
                },
                borderRadius: {
                        lg: 'var(--radius)',
                        md: 'calc(var(--radius) - 2px)',
                        sm: 'calc(var(--radius) - 4px)',
                        xl: 'calc(var(--radius) + 4px)',
                        '2xl': 'calc(var(--radius) + 8px)',
                },
                colors: {
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        card: {
                                DEFAULT: 'hsl(var(--card))',
                                foreground: 'hsl(var(--card-foreground))'
                        },
                        popover: {
                                DEFAULT: 'hsl(var(--popover))',
                                foreground: 'hsl(var(--popover-foreground))'
                        },
                        primary: {
                                DEFAULT: 'hsl(var(--primary))',
                                foreground: 'hsl(var(--primary-foreground))'
                        },
                        secondary: {
                                DEFAULT: 'hsl(var(--secondary))',
                                foreground: 'hsl(var(--secondary-foreground))'
                        },
                        muted: {
                                DEFAULT: 'hsl(var(--muted))',
                                foreground: 'hsl(var(--muted-foreground))'
                        },
                        accent: {
                                DEFAULT: 'hsl(var(--accent))',
                                foreground: 'hsl(var(--accent-foreground))'
                        },
                        destructive: {
                                DEFAULT: 'hsl(var(--destructive))',
                                foreground: 'hsl(var(--destructive-foreground))'
                        },
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                        chart: {
                                '1': 'hsl(var(--chart-1))',
                                '2': 'hsl(var(--chart-2))',
                                '3': 'hsl(var(--chart-3))',
                                '4': 'hsl(var(--chart-4))',
                                '5': 'hsl(var(--chart-5))'
                        },
                        // RGY Color System
                        rgy: {
                                red: 'hsl(var(--rgy-red))',
                                'red-glow': 'hsl(var(--rgy-red-glow))',
                                green: 'hsl(var(--rgy-green))',
                                'green-glow': 'hsl(var(--rgy-green-glow))',
                                yellow: 'hsl(var(--rgy-yellow))',
                                'yellow-glow': 'hsl(var(--rgy-yellow-glow))',
                                blue: 'hsl(var(--rgy-blue))',
                                'blue-glow': 'hsl(var(--rgy-blue-glow))',
                        },
                        // Surface levels
                        surface: {
                                '0': 'hsl(var(--surface-0))',
                                '1': 'hsl(var(--surface-1))',
                                '2': 'hsl(var(--surface-2))',
                                '3': 'hsl(var(--surface-3))',
                                '4': 'hsl(var(--surface-4))',
                        }
                },
                boxShadow: {
                        'sm': 'var(--shadow-sm)',
                        'md': 'var(--shadow-md)',
                        'lg': 'var(--shadow-lg)',
                        'glow-red': 'var(--shadow-glow-red)',
                        'glow-green': 'var(--shadow-glow-green)',
                        'glow-yellow': 'var(--shadow-glow-yellow)',
                },
                keyframes: {
                        'accordion-down': {
                                from: { height: '0' },
                                to: { height: 'var(--radix-accordion-content-height)' }
                        },
                        'accordion-up': {
                                from: { height: 'var(--radix-accordion-content-height)' },
                                to: { height: '0' }
                        },
                        'fade-in': {
                                from: { opacity: '0' },
                                to: { opacity: '1' }
                        },
                        'fade-up': {
                                from: { opacity: '0', transform: 'translateY(10px)' },
                                to: { opacity: '1', transform: 'translateY(0)' }
                        },
                        'slide-in-right': {
                                from: { opacity: '0', transform: 'translateX(20px)' },
                                to: { opacity: '1', transform: 'translateX(0)' }
                        },
                        'scale-in': {
                                from: { opacity: '0', transform: 'scale(0.95)' },
                                to: { opacity: '1', transform: 'scale(1)' }
                        },
                        'pulse-glow': {
                                '0%, 100%': { opacity: '0.5' },
                                '50%': { opacity: '1' }
                        },
                        'float': {
                                '0%, 100%': { transform: 'translateY(0)' },
                                '50%': { transform: 'translateY(-5px)' }
                        }
                },
                animation: {
                        'accordion-down': 'accordion-down 0.2s ease-out',
                        'accordion-up': 'accordion-up 0.2s ease-out',
                        'fade-in': 'fade-in 0.3s ease-out',
                        'fade-up': 'fade-up 0.4s ease-out',
                        'slide-in-right': 'slide-in-right 0.3s ease-out',
                        'scale-in': 'scale-in 0.2s ease-out',
                        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                        'float': 'float 3s ease-in-out infinite',
                }
        }
  },
  plugins: [require("tailwindcss-animate")],
};
