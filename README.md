# Web2Data

> A French-language tech blog documenting a web developer's journey into data engineering and AI.
> Built with [Astro v5](https://astro.build/) and [Tailwind CSS v4](https://tailwindcss.com/).

**Live site:** [web2data.jeremymarchandeau.com](https://web2data.jeremymarchandeau.com/)
**Repo:** [github.com/jeremy6680/web2data](https://github.com/jeremy6680/web2data)

---

## About

Web2Data is a personal blog by [Jeremy Marchandeau](https://jeremymarchandeau.com/), a senior web developer with 13+ years of experience transitioning into data analytics, data engineering, and AI.

The name says it all: _from the web to data_. The blog covers practical tutorials, tool reviews, best practices, and personal insights at the intersection of web development, data, and AI — written entirely in French.

**Topics covered:**

- Web development (Astro, WordPress, Tailwind CSS, React)
- Data Analytics & Data Engineering (Python, SQL, dbt, DuckDB)
- AI & LLMs (RAG, multi-agent systems, CrewAI, LangGraph, LlamaIndex)
- Dev tools and workflow (including using LLMs to code)

---

## Tech Stack

| Layer                  | Technology                                                                 |
| :--------------------- | :------------------------------------------------------------------------- |
| Framework              | [Astro v5](https://astro.build/) (static output)                           |
| CSS                    | [Tailwind CSS v4](https://tailwindcss.com/)                                |
| Interactive components | [Solid.js](https://www.solidjs.com/) (search, mobile nav, theme, comments) |
| Content                | MDX via Astro Content Collections                                          |
| Comments               | [Giscus](https://giscus.app/) (GitHub Discussions)                         |
| Package manager        | [pnpm](https://pnpm.io/)                                                   |
| Deployment             | [Vercel](https://vercel.com/)                                              |
| Language               | French (`fr_FR`)                                                           |

Based on the [tailwind-astro-starting-blog](https://github.com/wanoo21/tailwind-astro-starting-blog) template.

---

## Getting Started

### Prerequisites

- **Node.js** `>= 20.19.0`
- **pnpm** `>= 9` — install with `npm install -g pnpm`

### Installation

```bash
# Clone the repository
git clone https://github.com/jeremy6680/web2data.git
cd web2data

# Install dependencies (use pnpm — do not use npm or yarn)
pnpm install
```

### Development

```bash
# Start the local dev server at http://localhost:4321
pnpm dev
```

### Build & Preview

```bash
# Build the site for production (output: ./dist/)
pnpm build

# Preview the production build locally before deploying
pnpm preview
```

### Astro CLI

```bash
# Run any Astro CLI command
pnpm astro --help
pnpm astro check       # TypeScript / frontmatter validation
pnpm astro add <pkg>   # Add an Astro integration
```

> ⚠️ **Important:** Always use `pnpm` — never `npm` or `yarn`. The `pnpm-lock.yaml` lockfile must stay in sync for the CI/CD pipeline on Vercel to work correctly.

---

## Project Structure

```
.
├── src/
│   ├── assets/                    # Static images (favicon, logo, og-image, author photos)
│   ├── components/
│   │   ├── analytics/             # Analytics components (Fathom, GA, Plausible, Umami…)
│   │   ├── social-icons/          # Social icons + share buttons
│   │   │   ├── icons/             # SVG icons (GitHub, LinkedIn, Twitter, etc.)
│   │   │   └── social-buttons/    # Share buttons (Facebook, LinkedIn, Reddit, Twitter)
│   │   ├── solidjs/               # Interactive Solid.js components (search, mobile nav, theme…)
│   │   ├── Analytics.astro
│   │   ├── BaseHead.astro         # Global <head> (SEO, OG tags, fonts)
│   │   ├── Card.astro
│   │   ├── Comments.astro         # Giscus integration
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── ListPostCover.astro
│   │   ├── Pagination.astro
│   │   ├── PostCover.astro
│   │   └── Tag.astro
│   ├── content/
│   │   ├── authors/
│   │   │   └── default.mdx        # Author profile (Jeremy Marchandeau)
│   │   ├── blog/                  # Blog posts (.mdx files)
│   │   ├── categories/            # Article categories (.mdx)
│   │   ├── domaines/              # Thematic domains (.mdx)
│   │   ├── projects/              # Project files (.mdx) — one per project
│   │   ├── tags/                  # Tag definitions with descriptions (.mdx files)
│   │   └── technos/               # Referenced technologies (.mdx)
│   ├── i18n/
│   │   ├── index.ts
│   │   ├── ui.ts                  # UI translations (default lang: French)
│   │   └── utils.ts
│   ├── layouts/
│   │   ├── AuthorLayout.astro
│   │   ├── ListLayout.astro
│   │   ├── ListWithTagsLayout.astro
│   │   ├── PostLayout.astro        # Main article layout
│   │   ├── RootLayout.astro        # Root layout (header, footer, analytics)
│   │   └── SimplePostLayout.astro
│   ├── pages/
│   │   ├── blog/
│   │   │   ├── [...page].astro    # Paginated post list
│   │   │   └── [...slug].astro    # Single post page
│   │   ├── projects/
│   │   │   ├── index.astro        # Projects list
│   │   │   └── [slug].astro       # Project detail page (sidebar + MDX)
│   │   ├── tags/
│   │   │   ├── index.astro        # All tags list
│   │   │   └── [slug]/[...page].astro  # Posts by tag
│   │   ├── 404.astro
│   │   ├── about.astro
│   │   ├── contact.astro          # Contact page
│   │   ├── index.astro            # Homepage
│   │   ├── journal.astro          # Journal hub — filterable by domain, category, techno, year
│   │   ├── rss.xml.js             # RSS feed
│   │   └── search.json.ts         # Search index data
│   ├── styles/
│   │   └── global.css
│   ├── consts.ts                  # Central config: site metadata, navigation, Giscus, analytics
│   ├── content.config.ts          # Astro content collection schemas
│   ├── functions.ts               # Utility functions (post sorting, draft filtering…)
│   └── utils.ts
├── astro.config.mjs
├── Dockerfile
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── README.md
├── CONTEXT.md                     # Project overview, goals, stack, constraints
├── STRUCTURE.MD                   # Folder/file structure explained
├── NEXT_STEPS.md                  # Task dashboard (done / to do)
├── CONVENTIONS.md                 # Naming conventions, patterns, code standards
├── DECISIONS.md                   # Architectural & technical decisions log
└── KNOWN_ISSUES.md                # Known bugs and points to watch
```

---

## Key Files

| File                              | Role                                                                           |
| :-------------------------------- | :----------------------------------------------------------------------------- |
| `src/consts.ts`                   | Central config: title, site URL, Giscus settings, analytics, navigation        |
| `src/content.config.ts`           | Content schemas (blog, authors, projects, technos, categories, domaines)       |
| `src/functions.ts`                | Post sorting and draft filtering utilities                                     |
| `src/i18n/ui.ts`                  | UI string translations (default language: French)                              |
| `src/content/authors/default.mdx` | Author profile                                                                 |
| `src/content/blog/*.mdx`          | Blog posts                                                                     |
| `src/content/tags/*.mdx`          | Tag definitions with descriptions                                              |

---

## Writing Content

### Creating a Blog Post

Create a new `.mdx` file in `src/content/blog/`. All frontmatter fields must match the schema defined in `src/content.config.ts`.

```mdx
---
title: "Mon article"
date: 2025-01-01
summary: "Résumé de l'article affiché dans les listes."
tags:
  - astro
  - tailwind
draft: false
---

Contenu de l'article en MDX...
```

### Creating a Project

Create a new `.mdx` file in `src/content/projects/`. The slug (filename without `.mdx`) is used as the URL path `/projects/<slug>`.

```mdx
---
title: "My Project"
description: "Short description shown on cards and detail pages."
github: "username/repo"            # GitHub repo path (no https://)
demo: "https://demo.example.com"   # Optional
tags: ["Python", "FastAPI"]        # Shown as badges
stack: ["Python", "FastAPI", "PostgreSQL"]  # Shown in sidebar box
status: "actif"                    # actif | wip | archive
cover: "../../assets/my-cover.png" # Optional — processed by Astro Image
year: 2025
order: 1                           # Sort order on the projects list (lower = first)
---

## Contexte

...

## Fonctionnalités principales

...
```

To link a blog post to this project, add `project: my-project` to the post's frontmatter. It will appear automatically in the "Articles liés" sidebar of the project page.

---

### Creating a Tag

Every new tag used in a post **must** have a corresponding `.mdx` file in `src/content/tags/`:

```mdx
---
name: "astro"
description: "Articles sur le framework Astro.js."
---
```

> Missing tag files will cause a content collection validation error at build time.

---

## Configuration

All site-wide settings are managed in `src/consts.ts`:

- **Site metadata** (title, description, URL, language)
- **Navigation links**
- **Posts per page** (pagination)
- **Giscus comments** (repo, category, mapping)
- **Analytics provider** (Fathom, GA, Plausible, Umami, Matomo…)

---

## Deployment

The site deploys automatically to **Vercel** on push to `main`.

- Static output — no server-side rendering
- `pnpm-lock.yaml` must be committed and up to date
- Vercel uses the `pnpm build` command and serves the `./dist/` directory

---

## Git Workflow

```bash
# Create a feature branch
git checkout -b feat/my-feature

# Commit with a meaningful message
git commit -m "feat: add tag page for dbt"

# Open a Pull Request to merge into main
```

- One branch per feature or fix
- Meaningful commit messages (imperative mood, English)
- All merges via Pull Request

---

## License

This project is personal and not open-sourced under a specific license. The codebase is based on [tailwind-astro-starting-blog](https://github.com/wanoo21/tailwind-astro-starting-blog) (MIT).
