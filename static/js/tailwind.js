
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
            },
            colors: {
                primary: {
                    light: '#4f46e5',
                    dark: '#7c3aed',
                },
                secondary: {
                    light: '#10b981',
                    dark: '#34d399',
                },
                dark: {
                    800: '#1e293b',
                    900: '#0f172a',
                },
            },
            animation: {
                'gradient-x': 'gradient-x 8s ease infinite',
                'gradient-y': 'gradient-y 8s ease infinite',
                'gradient-xy': 'gradient-xy 8s ease infinite',
                'float': 'float 6s ease-in-out infinite',
                'float-reverse': 'float-reverse 6s ease-in-out infinite',
                'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                'gradient-x': {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center'
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center'
                    }
                },
                'gradient-y': {
                    '0%, 100%': {
                        'background-size': '400% 400%',
                        'background-position': 'center top'
                    },
                    '50%': {
                        'background-size': '400% 400%',
                        'background-position': 'center bottom'
                    }
                },
                'gradient-xy': {
                    '0%, 100%': {
                        'background-size': '400% 400%',
                        'background-position': 'left center'
                    },
                    '50%': {
                        'background-size': '400% 400%',
                        'background-position': 'right center'
                    }
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' }
                },
                'float-reverse': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(20px)' }
                }
            }
        }
    }
}