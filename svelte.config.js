import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';
import path, { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path_to_layout = join(__dirname, './src/mdsvex.svelte');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess(), mdsvex({ layout: path_to_layout })],
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
