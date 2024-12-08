import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#a78bfa',
					// primary: '#8b5cf6',
					secondary: '#6f5300',
					accent: '#f97316',
					neutral: '#181210',
					'base-100': '#e0e7ff',
					// 'base-100': '#ede9fe',
					info: '#4ec6ff',
					success: '#7db200',
					warning: '#fbbf24',
					error: '#ff8b8f'
				}
			}
		]
	},
	theme: {
		extend: {}
	},
	plugins: [typography, forms, containerQueries, require('daisyui')]
} satisfies Config;
