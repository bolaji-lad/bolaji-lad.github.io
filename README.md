# bolaji-lad.github.io

Personal site and blog. Built with [Astro](https://astro.build), deployed to GitHub Pages on every push to `main`.

## Editing content

**In the browser:** go to <https://bolaji-lad.github.io/admin/> and sign in with a GitHub token (see below). You can write and edit posts, change the home page text and links, edit the About page, and upload images. Every save is a commit to `main`, and the site redeploys in about a minute.

New posts start as **drafts** and don't appear on the live site. Untick *Draft* to publish.

**Signing in:** the editor ([Sveltia CMS](https://github.com/sveltia/sveltia-cms)) uses a GitHub fine-grained personal access token. Create one at GitHub → Settings → Developer settings → Fine-grained tokens, limited to this repository only, with **Contents: Read and write**. Choose *Sign In with Token* on the admin page and paste it.

**Locally:** posts are Markdown files in `src/content/blog/`. Home page text and links are in `src/data/site.json`. The About page is `src/content/pages/about.md`.

```sh
npm install
npm run dev      # http://localhost:4321 (drafts are visible in dev)
npm run build
```
