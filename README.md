# Cavalier Robotics Website (Astro + Markdown/MDX + Decap)

This project is a redesigned Team 619 website built for maintainability and low hosting cost.

## Stack

- Astro for site generation
- Markdown and MDX content collections
- Decap CMS for non-technical content editing
- Cloudflare Pages ready

## Local Development

From the project root:

```sh
npm install
npm run dev
```

Site runs at `http://localhost:4321`.

## Local Decap CMS Testing

Decap admin route:

```text
http://localhost:4321/admin/
```

For local CMS backend proxy (recommended while testing Decap):

```sh
npm run cms:proxy
```

Run this in a separate terminal while `npm run dev` is active.

## Content Editing

- Homepage content: `src/content/pages/home.md`
- News posts: `src/content/news/*.md` and `src/content/news/*.mdx`

## Build and Preview

```sh
npm run build
npm run preview
```

## Cloudflare Pages Deployment

Use these settings in Cloudflare Pages:

- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `24`

## Decap GitHub Backend Setup

Before production CMS usage, update:

- `public/admin/config.yml`
	- `backend.repo` to your real GitHub repo (`owner/repo`)
	- `backend.branch` to your default branch

After that, `/admin` will create and commit content updates directly to Git.
