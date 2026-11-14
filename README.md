# vierre3.dev

Personal portfolio of Pierre-Yves Guiraudet, live at [vierre3.dev](https://vierre3.dev).

A single-page site in English and French: a case study, selected projects, skills, experience and contact, with a light and a dark theme.

## Stack

- [Nuxt 4](https://nuxt.com) and Vue 3, statically generated
- Tailwind CSS
- `@nuxtjs/i18n` for the `/en` and `/fr` routes
- `@nuxt/icon` with icons bundled at build time
- No client-side dependencies beyond the framework: the animated background is a small canvas and CSS scroll-driven animations

## Run it locally

Requires Node 24 and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

To look at the production build:

```bash
pnpm generate   # writes the static site to .output/public
pnpm preview
```

## Where things are

| Path | What it holds |
| --- | --- |
| `app/app.vue` | Page layout, theme colors, per-language head tags |
| `app/components/` | One component per section, plus small UI pieces in `ui/` |
| `app/composables/` | Project, skill and experience data; theme and scroll helpers |
| `i18n/locales/` | All text, in `en.json` and `fr.json` |
| `public/` | Fonts, images, the downloadable CV |
| `nuxt.config.ts` | Modules, SEO defaults, the pre-hydration script |

`CLAUDE.md` describes the architecture and the reasons behind it in more detail.

## Editing content

- **Projects:** add an entry in `app/composables/useProjectsData.ts` and a description under `projects` in both locale files, using the same key.
- **Experience:** add a key in `app/composables/useExperienceData.ts` and the matching block under `experience` in both locale files.
- **Text:** the two locale files must keep the same keys.

## Deployment

Every push to `main` builds the site with GitHub Actions (`.github/workflows/nuxtjs.yml`) and publishes it to GitHub Pages on the custom domain in `CNAME`.
