import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess(), mdsvex()],
	kit: {
		adapter: adapter(),
		alias: {
			$lib: path.resolve('./src/lib'),
			$components: path.resolve('./src/lib'),
			$stores: path.resolve('./src/stores')
		}
	},
	extensions: ['.svelte', '.svx']
};

export default config;
