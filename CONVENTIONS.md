# Web2Data — Conventions

## Langue

- Tout le contenu du site est **en français** (`fr_FR`).
- Les strings d'interface sont dans [`src/i18n/ui.ts`](src/i18n/ui.ts) — toute nouvelle chaîne doit être ajoutée dans les deux locales (`en` et `fr`), même si le site n'est pas bilingue.
- Ne jamais suggérer de contenu ou de libellés en anglais.

---

## Fichiers de contenu

### Articles (`src/content/blog/`)

- Format : `.mdx` uniquement.
- Nom de fichier : **kebab-case**, tout en minuscules, sans accents. Ex : `mon-article-sur-astro.mdx`.
- Le slug d'un article est son nom de fichier (sans extension).

Frontmatter obligatoire :

```mdx
---
title: "Titre de l'article"
summary: "Résumé court (utilisé pour les listings et les méta SEO)."
postLayout: column          # ou simple
date: "YYYY-MM-DD"
lastmod: "YYYY-MM-DD"
draft: false
related:
  - slug-article-lie        # référence par slug (nom de fichier sans extension)
tags:
  - nom-du-tag              # référence par slug du fichier tag
---
```

- `summary` : une phrase concise, visible dans les listings et en SEO.
- `related` : slugs d'articles existants — doit correspondre exactement au nom de fichier.
- `tags` : slugs de fichiers dans `src/content/tags/` — le tag doit exister avant d'être utilisé.
- Tout nouveau champ frontmatter doit être déclaré dans [`src/content.config.ts`](src/content.config.ts).

### Tags (`src/content/tags/`)

- Format : `.mdx`.
- Nom de fichier : **kebab-case**. Ex : `data-analytics.mdx`.
- **Ne pas utiliser underscore** (`data_analytics` est incorrect — le standard retenu est le tiret).

Frontmatter obligatoire :

```mdx
---
name: Nom affiché
description: Description courte visible sur la page de listing du tag.
---
```

Le corps du fichier (après le frontmatter) est la description longue affichée sur la page `/tags/[slug]`.

### Auteurs (`src/content/authors/`)

- Un seul auteur : `default.mdx`.
- Ne pas créer de fichier auteur supplémentaire sans modifier le schéma dans `content.config.ts`.

---

## Composants

### Astro vs Solid.js

- **Composants statiques** → `.astro` dans `src/components/`.
- **Composants interactifs** (navigation mobile, thème, recherche, Giscus) → `.tsx` dans `src/components/solidjs/`.
- Ne pas utiliser React pour les composants interactifs — le choix du projet est Solid.js.
- Les composants Solid.js sont montés avec la directive `client:load` ou `client:visible` dans les layouts Astro.

### Nommage des composants

- **PascalCase** pour les noms de fichiers et de composants. Ex : `MobileNav.tsx`, `ScrollTopAndComments.tsx`.
- Les composants Astro utilisent aussi PascalCase. Ex : `PostCover.astro`, `SectionContainer.astro`.

---

## Configuration centrale

Toute la configuration du site passe par [`src/consts.ts`](src/consts.ts) :

- `SITE_METADATA` : métadonnées, analytics, commentaires Giscus.
- `ITEMS_PER_PAGE` : pagination.
- `NAVIGATION` : items de navigation.
- `POST_METADATA` : comportement d'affichage des articles (layout, couverture, tags, etc.).

Ne pas hardcoder ces valeurs dans les composants ou les layouts.

---

## CSS / Tailwind

- Tailwind CSS v4 avec syntaxe `@theme` dans `src/styles/global.css`.
- La couleur primaire est mappée sur `pink` de Tailwind : `--color-primary-500: var(--color-pink-500)`.
- Polices : `--font-sans` (Onest, corps) et `--font-heading` (Space Grotesk, titres).
- Les titres (`h1`–`h6`) utilisent automatiquement `--font-heading` via le layer `base`.
- Ne pas importer les polices depuis un CDN — elles viennent de `@fontsource`.

---

## Pages et routing

- Les pages sont dans `src/pages/` et suivent les conventions de routing d'Astro.
- Les routes dynamiques utilisent la syntaxe `[...slug].astro` ou `[...page].astro`.
- Le RSS est généré automatiquement sur `/rss.xml`.
- L'endpoint de recherche est `src/pages/search.json.ts` — il génère un JSON statique au build.

---

## Git

- Langue des commits : pas de contrainte forte, mais rester cohérent (français ou anglais).
- La branche principale est `main`.
