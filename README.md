# Cavalier Robotics Website (Astro + Markdown/MDX + Decap)

This project is a redesigned Team 619 website built for maintainability and low hosting cost.

## Stack

- Astro for site generation
- Markdown and MDX content collections
- Decap CMS for non-technical content editing
- Deployed to GitHub Pages via GitHub Actions

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

## Content Editing

- Homepage content: `src/content/pages/home.md`
- News posts: `src/content/news/*.md` and `src/content/news/*.mdx`

## Build and Preview

```sh
npm run build
npm run preview
```

## GitHub Pages Deployment

Deployment is handled automatically by `.github/workflows/deploy.yml` on every push to `main`. It uses the [withastro/action](https://github.com/withastro/action) to build and deploy to GitHub Pages.

- Node version: `22`
- Build command: `astro build` (via `withastro/action`)
- Build output directory: `dist`

## Decap CMS

The Decap admin panel is available at `/admin`. It is configured in `public/admin/config.yml` to use the `619Code/carobotics-website` GitHub repo on the `main` branch. Editing through the CMS creates commits directly to the repo, which triggers a new deployment.

## Decap CMS OAuth via Cloudflare Workers

GitHub Pages does not support server-side OAuth, so authentication for Decap CMS is handled by a Cloudflare Worker acting as an OAuth proxy. The deployed proxy lives at `https://decap-proxy.carobotics.workers.dev`.

### How it works

1. The Decap admin panel redirects the user to the proxy's `/auth?provider=github` endpoint.
2. The proxy redirects to GitHub's OAuth authorization page.
3. GitHub redirects back to the proxy's `/callback?provider=github` endpoint with an auth code.
4. The proxy exchanges the code for an access token and passes it back to the Decap admin panel.

### Re-deploying or modifying the proxy

The proxy is based on [sterlingwes/decap-proxy](https://github.com/sterlingwes/decap-proxy) and is deployed separately from this repo.

1. Clone the proxy repo: `git clone https://github.com/sterlingwes/decap-proxy`
2. Copy the sample config: `cp wrangler.toml.sample wrangler.toml`
3. Set the worker `name` in `wrangler.toml` to `decap-proxy` (or your preferred name)
4. Login to Cloudflare: `npx wrangler login`
5. Set the OAuth secrets from your [GitHub OAuth App](https://github.com/settings/developers):
   ```sh
   npx wrangler secret put GITHUB_OAUTH_ID
   npx wrangler secret put GITHUB_OAUTH_SECRET
   ```
6. Deploy: `npx wrangler deploy`

### GitHub OAuth App settings

The OAuth App is registered under the `619Code` GitHub account at [github.com/settings/developers](https://github.com/settings/developers) with:

- **Homepage URL:** `https://decap-proxy.carobotics.workers.dev`
- **Authorization callback URL:** `https://decap-proxy.carobotics.workers.dev/callback`

### Decap config

`public/admin/config.yml` points to the proxy:

```yaml
backend:
  name: github
  repo: 619Code/carobotics-website
  branch: main
  base_url: https://decap-proxy.carobotics.workers.dev
  auth_endpoint: /auth
```

## Upgrading Decap CMS

The Decap CMS script in `public/admin/index.html` is loaded from unpkg with a [Subresource Integrity (SRI)](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) hash. This prevents the browser from executing tampered CDN content. **The hash must be updated whenever the version number changes.**

### Steps to upgrade

1. Update the version in the `<script>` `src` URL in `public/admin/index.html`.
2. Compute the new SRI hash for the updated file (PowerShell):
   ```powershell
   $response = Invoke-WebRequest -Uri "https://unpkg.com/decap-cms@<VERSION>/dist/decap-cms.js" -UseBasicParsing
   $hash = [System.Security.Cryptography.SHA384]::Create().ComputeHash($response.RawContentStream)
   "sha384-" + [Convert]::ToBase64String($hash)
   ```
   Or with bash/openssl:
   ```sh
   curl -sL https://unpkg.com/decap-cms@<VERSION>/dist/decap-cms.js | openssl dgst -sha384 -binary | openssl base64 -A | sed 's/^/sha384-/'
   ```
3. Replace the `integrity="sha384-..."` attribute value in `public/admin/index.html` with the new hash.
