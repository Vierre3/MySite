# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `pnpm install` — install dependencies (pnpm is the package manager; `packageManager` is pinned in `package.json`)
- `pnpm dev` — start dev server at localhost:3000
- `pnpm generate` — static site generation (prerendered HTML for GitHub Pages)
- `pnpm preview` — preview the generated static site locally
- No test framework is configured.

## Deployment

Pushes to `main` trigger GitHub Actions (`.github/workflows/nuxtjs.yml`) → `pnpm install --frozen-lockfile` → `pnpm generate` → GitHub Pages at vierre3.dev. The workflow sets `NUXT_PUBLIC_SITE_URL` from the Pages origin; the base URL stays `/` since the site runs on a custom domain (`CNAME`).

pnpm settings that npm kept in `package.json` (dependency `overrides`, install-script allowlist) live in `pnpm-workspace.yaml` — pnpm 11 no longer reads the `pnpm` field of `package.json`.

## Architecture

**Nuxt 4 + Vue 3 + Tailwind CSS** portfolio site, statically generated with SSR prerendering.

### Key architectural decision: all sections live in app.vue, not in pages

All section components are rendered directly in `app/app.vue`, outside `<NuxtPage>`. `app/pages/index.vue` is an empty `<div />` shell that exists only to satisfy Nuxt's route requirements.

**Why:** `@nuxtjs/i18n` uses a `prefix` strategy with `/en` and `/fr` routes. Switching locale triggers a route change, which would remount everything inside `<NuxtPage>`. By placing sections in `app.vue`, they never remount on locale switch — `$t()` updates text in place without losing component state (scroll position, filter selection).

### Positioning and page order

It is a portfolio, not a services site: no "hire me" or availability badges, no sales copy. Order in `app.vue`: Hero → Case study → Projects → Skills → Experience → About → Contact. Section ids (used by the navbar): `work`, `projects`, `skills`, `experience`, `about`, `contact`.

Copy rule: only facts the owner has stated. The case study describes an internal Naitways product and must stay anonymized: no codename, hostnames, client names or internal tool names.

### i18n

- Messages live in `i18n/locales/en.json` and `fr.json`; the two files must keep identical key paths.
- vue-i18n treats `|`, `@` and `{}` as syntax inside messages. Avoid them in copy (the page title uses an en dash for that reason).
- Lists (`experience.*.items`, `caseStudy.scope`) are read with `tm()` + `rt()`.
- Strategy: `prefix` — all routes are `/en/...` or `/fr/...`. `index.html` and `404.html` are written by a Nitro build hook in `nuxt.config.ts` as locale-redirect pages (they read the preferred locale from `localStorage`, which `app.vue` keeps up to date).
- Per-locale `<title>`, description, `lang`, canonical and hreflang links are set in `app.vue` (`seo.*` messages + `useLocaleHead()`). `nuxt.config.ts` holds the static defaults, the OG image tags and the Person JSON-LD.

### Colours (one theme)

- There is a single, light theme. Tokens are defined once on `:root` in `app/app.vue` as RGB triplets, consumed by Tailwind as `rgb(var(--x) / <alpha-value>)` (`tailwind.config.ts`).
- Two colours with separate jobs: **orange** (`orange-accent`) is brand and action (logo, buttons, active nav/filter, "In progress"); **teal** (`teal`) carries information (tech tags, meta lines, company names, the diagram's request arrows). Both meet in the ribbon and the section title bars.
- Token names are historical: `dark-bg` is the page colour, `glass` / `glass-hover` / `glass-border` are the card surface and its border. `--on-accent` is the text colour on orange.
- The earlier dark theme, the theme toggle and the colour experiments were removed; a full copy of that state (and of an alternative layout in progress) lives outside this repo in the sibling folder `MySite-edition`.

### Pre-hydration script and scroll restore

A blocking inline script in `<head>` (`nuxt.config.ts` `app.head.script`) runs before Vue hydrates: adds `html.loading` (removed by `app.vue` on mount) and `html.js` (which enables the entrance animation's hidden start state), and adds `html.scrolled` when a scroll position is saved so the navbar shows its backdrop immediately.

`useScrollRestore` saves `scrollY` to `sessionStorage` and restores it on mount with a short retry loop; while `isRestoring` is true `app.vue` applies `.skip-animations`. `app/router.options.ts` returns `scrollBehavior: () => false` because scroll is managed here, not by the router.

### Look

Solid paper cards (`.card`: warm white, hairline border, one soft shadow defined in `app/assets/css/tailwind.css`) on a plain cream page. `HeroBackground.vue` is a single layer holding a faint grid and the ribbon canvas; it has no colour washes. Parallax: the layer moves at a constant 15% of the scroll speed whatever the page length. It is absolutely positioned in the root wrapper (which is why the wrapper is `relative`), sized `calc(15% + 85vh)`, and a CSS scroll-driven animation (`animation-timeline: scroll(root)`) translates it back down by 85% of the distance scrolled; the two 0.15/0.85 numbers in `HeroBackground.vue` must change together. Browsers without scroll-driven animations, and reduced motion, keep it still.

Motion is limited to the hero entrance, the ribbon, the scroll-reveal entrance (a short rise with a fade, in `app/assets/css/animations.css`), the section titles (heading rises, bar draws out), the mobile menu, and press states (`active:scale-95`). Where the browser has scroll-driven animations, the reveal and the titles are tied to the scroll position (`animation-timeline: view()`), so they play backwards when scrolling up; the IntersectionObserver transition in `useScrollReveal` is the fallback, and the `delay` prop only applies there. Cards have no hover state; buttons change text colour and scale, never border colour.

### Components

- `ui/Section.vue` — section wrapper: `id`, padding, the single `max-w-5xl` column and the centered title. Every section uses it.
- `ui/GlassCard.vue` — the card surface (solid, bordered, soft shadow). The name is historical.
- `ui/OrangeButton.vue` — button, or link when `href` is passed (`download` supported); `variant` solid/outline.
- `ui/ScrollReveal.vue` + `useScrollReveal()` — IntersectionObserver slide-in with optional `delay`.
- `ui/TechTag.vue` — small pill.
- `HeroSection` — sized with `svh`, not `dvh`: `dvh` changes while mobile Safari's toolbar collapses, which resized the hero mid-scroll and made the page jump. Left-aligned: role, full name (h1), statement, one short context line, contact and CV buttons. No labels, badges or panels in the hero on purpose.
- `HeroVisual` — decorative canvas rendered inside `HeroBackground`: a twisting ribbon of fine strands that winds across the whole page, blending from `--ribbon-a` (orange) to `--ribbon-b` (teal) across its strands. It animates continuously; its shape is laid out in units of the large viewport height so it doesn't change when a mobile browser's toolbar collapses. Still frame under reduced motion.
- `SkillsSection` — text-only skill groups from `useSkillsData()` laid out with CSS columns (no icons, no layout script).
- `CaseStudySection` — the cloud-platform case study; all text under `caseStudy.*`.
- `ProjectsSection` / `ProjectCard` — filter tabs (`featured` by default, then all / school / personal / events; the tabs group the per-card types: school = epitech + rotterdam, events = hackathon + jam). The featured view is one grid; other views are grouped by year. Data in `useProjectsData()`; the project `key` is both the displayed name and the i18n key. Each card shows two texts: the description (`projects.<key>`) and a team-size / personal-contribution line (`projectRoles.<key>`), which was derived from the git history of the project repos in the parent folder; every project needs both in both locales.
- `ExperienceSection` / `TimelineItem` — entries from `useExperienceData()` (current exchange programme, internships newest first, degree last).
- `AboutSection`, `ContactSection` (email is base64-decoded on mount so it stays out of the static HTML), `FooterSection`.
- `NavBar` — fixed bar with a `::before` gradient + backdrop blur that fades in once scrolled; active section found with a 40%-viewport checkpoint; scroll progress bar runs along the bar's bottom edge and is a CSS scroll-driven `scaleX` animation (hidden where unsupported or with reduced motion); mobile menu uses CSS keyframes with an `animationend` handshake (`mobileOpen` / `mobileVisible`) and closes on Escape.
- `LanguageToggle` — uses `.btn-ghost`; its label opens with a grid `0fr → 1fr` transition in the mobile menu.

Shared classes `.btn-ghost`, `.card`, `.pill-current` and `.toggle-text` are defined in `app/assets/css/tailwind.css`. The same file gives every `rounded-lg` / `rounded-xl` / `rounded-2xl` element squircle corners (`corner-shape: superellipse(2)` with radii enlarged 1.7x where supported), so new cards and buttons get them automatically; `rounded-full` is deliberately excluded.

### Icons and fonts

- `@nuxt/icon` with `provider: 'none'` and `clientBundle.scan`: icons are bundled at build time and never fetched at runtime. The scan only sees literal icon names in `.vue` files, so keep names there (not in composables). Only the `mdi` collection is installed.
- Inter is self-hosted (`app/assets/css/fonts.css`); only the latin subset is preloaded.

### Tailwind

`future.hoverOnlyWhenSupported` wraps `hover:` in `@media (hover: hover)`, so touch devices never get a stuck hover; press feedback comes from `active:`.

### Key files

- `app/app.vue` — root template, colour tokens, head/SEO per locale
- `nuxt.config.ts` — modules, icon config, Nitro hook for redirect pages, pre-hydration script, static meta and JSON-LD
- `i18n/locales/en.json`, `i18n/locales/fr.json` — all UI text
- `app/assets/css/tailwind.css`, `animations.css`, `fonts.css`
- `cv/` (untracked) — CV and cover-letter sources; `public/resume.pdf` is exported from `cv/cv.html` or `cv/cv.tex`
