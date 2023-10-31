require('dotenv').config();

module.exports = {
	darkMode: ['class', '[data-theme="dark"]'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		screens: {
			sm: process.env.BREAKPOINT_SM,
			md: process.env.BREAKPOINT_MD,
			lg: process.env.BREAKPOINT_LG,
			xl: process.env.BREAKPOINT_XL,
			'2xl': process.env.BREAKPOINT_2XL
		},
		container: {
			center: true,
			padding: { DEFAULT: '1rem', md: '1.5rem', lg: '2rem', xl: '4rem', '2xl': '5rem' }
		},
		zIndex: { '-1': -1, 0: 0, 10: 10, 20: 20, 30: 30, 40: 40, 50: 50, 100: 100, 999: 999 },
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(at bottom, var(--tw-gradient-stops))'
			},
			animation: {
				'fade-in': 'fadeIn 0.45s ease-in-out'
			},
			keyframes: () => ({
				fadeIn: {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 }
				}
			}),
			colors: {
				primary: '#20BF6B',
				secondary: '#BF20ff',
				accent: '#f7ad3d',
				error: '#ff003d',
				alert: '#70bbe4',
				success: '#4caf50',
				neutral: '#f3f3f2',
				gray: '#A9A9A5',
				dark: '#53534C',
				light: '#EFEFEF',
				black: '#282838',
				white: '#ffffff'
			},
			borderWidth: {
				10: '10px'
			},
			fontSize: {
				xs: ['14px', { letterSpacing: '0' }],
				sm: ['16px', { letterSpacing: '0' }],
				base: ['18px', { letterSpacing: '0' }],
				lg: ['24px', { letterSpacing: '0' }],
				xl: ['28px', { letterSpacing: '0' }],
				'2xl': ['36px', { letterSpacing: '0' }],
				'3xl': ['48px', { letterSpacing: '0' }],
				'4xl': ['72px', { letterSpacing: '0' }],
				'5xl': ['96px', { letterSpacing: '0' }]
			},
			height: (theme) => ({
				'screen/2': '50vh',
				'screen/75': '75vh',
				'screen/3': 'calc(100vh / 3)',
				'screen/4': 'calc(100vh / 4)',
				'screen/5': 'calc(100vh / 5)'
			}),
			fontFamily: {
				sans: ['Source Sans Pro', 'Helvetica', 'Arial', 'sans-serif']
			}
		}
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography')
		// require('tailwindcss-hyphens'),
		// If using VidStack
		// require('vidstack/tailwind.cjs')
	]
};
