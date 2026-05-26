// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
	site: 'https://www.carobotics.org',
	base: env.BASE_PATH || '/',
	integrations: [mdx(), sitemap()],
});
