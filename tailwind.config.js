/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './*.{ts,tsx}', './components/**/*.{ts,tsx}', './pages/**/*.{ts,tsx}'],

    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Space Grotesk', 'sans-serif'],
            },
            colors: {
                dark: {
                    900: '#050505',
                    800: '#0A0A0A',
                    border: '#1F1F1F'
                },
                light: {
                    50: '#FFFFFF',
                    100: '#FAFAFA',
                    200: '#F5F5F5',
                    border: '#E5E5E5'
                }
            },
            letterSpacing: {
                'tighter': '-0.04em',
                'tight': '-0.02em',
            },
            transitionTimingFunction: {
                'custom': 'cubic-bezier(0.16, 1, 0.3, 1)',
            }
        }
    }

};
