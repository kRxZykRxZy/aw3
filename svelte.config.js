import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path_to_layout = join(__dirname, './src/mdsvex.svelte');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Preprocessors
	preprocess: [vitePreprocess(), mdsvex({ layout: path_to_layout })],

	extensions: ['.svelte', '.svx'],

	kit: {
		// Use Node adapter
		adapter: adapter(),
		outDir: 'build',

		// Optional: configure aliases
		alias: {
			$components: 'src/lib',
			$lib: 'src/lib',
			$stores: 'src/stores'
		}
	}
};

export default config;
