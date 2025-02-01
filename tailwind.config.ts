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
					'primary-content': '#0a0715',
					secondary: '#60a5fa',
					'secondary-content': '#150d00',
					accent: '#fbbf24',
					'accent-content': '#011008',
					neutral: '#0b1d14',
					'neutral-content': '#c8ccca',
					'base-100': '#e0e7ff',
					'base-200': '#dbdbdb',
					'base-300': '#bbbbbb',
					'base-content': '#161616',
					info: '#00c9ff',
					'info-content': '#000f16',
					success: '#9cce00',
					'success-content': '#090f00',
					warning: '#f97316',
					'warning-content': '#150500',
					error: '#c22630',
					'error-content': '#f9d7d4'
				}
				/*				mytheme: {
					primary: '#a78bfa',
					'primary-content': '#0a0715',
					secondary: '#fbbf24',
					'secondary-content': '#150d00',
					accent: '#34d399',
					'accent-content': '#011008',
					// accent: '#0ea5e9',
					// 'accent-content': '#000a13',
					neutral: '#0b1d14',
					'neutral-content': '#c8ccca',
					'base-100': '#fcfcfc',
					'base-200': '#dbdbdb',
					'base-300': '#bbbbbb',
					'base-content': '#161616',
					info: '#00c9ff',
					'info-content': '#000f16',
					success: '#9cce00',
					'success-content': '#090f00',
					warning: '#f97316',
					'warning-content': '#150500',
					error: '#c22630',
					'error-content': '#f9d7d4'
				}*/
				/*mytheme: {
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
				}*/
			}
		]

		/**
		 * mytheme: {
"primary": "#a78bfa",
"primary-content": "#0a0715",
"secondary": "#fbbf24",
"secondary-content": "#150d00",
"accent": "#0ea5e9",
"accent-content": "#000a13",
"neutral": "#0b1d14",
"neutral-content": "#c8ccca",
"base-100": "#fcfcfc",
"base-200": "#dbdbdb",
"base-300": "#bbbbbb",
"base-content": "#161616",
"info": "#00c9ff",
"info-content": "#000f16",
"success": "#9cce00",
"success-content": "#090f00",
"warning": "#f97316",
"warning-content": "#150500",
"error": "#c22630",
"error-content": "#f9d7d4",
          },
		 */

		/*
		daisyui: {
    themes: [
      {
        mytheme: {
"primary": "#a78bfa",
"primary-content": "#0a0715",
"secondary": "#fbbf24",
"secondary-content": "#150d00",
"accent": "#0080ff",
"accent-content": "#000616",
"neutral": "#0b1d14",
"neutral-content": "#c8ccca",
"base-100": "#fcfcfc",
"base-200": "#dbdbdb",
"base-300": "#bbbbbb",
"base-content": "#161616",
"info": "#00c9ff",
"info-content": "#000f16",
"success": "#9cce00",
"success-content": "#090f00",
"warning": "#d85900",
"warning-content": "#110300",
"error": "#c22630",
"error-content": "#f9d7d4",
          },
        },
      ],
    },
		*/
	},
	theme: {
		extend: {}
	},
	plugins: [typography, forms, containerQueries, require('daisyui')]
} satisfies Config;
