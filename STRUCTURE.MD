# Web2Data — Structure du projet

Blog personnel sur le développement web, la data et l'IA.
Construit avec Astro v5 + Tailwind CSS v4, basé sur [tailwind-astro-starting-blog](https://github.com/wanoo21/tailwind-astro-starting-blog).

**URL** : https://web2data.jeremymarchandeau.com/
**Repo** : https://github.com/jeremy6680/web2data

---

## Arborescence

```
.
├── src/
│   ├── assets/                    # Images statiques (favicon, logo, og-image, photos auteur, projets)
│   ├── components/
│   │   ├── analytics/             # Composants analytics (Fathom, GA, Plausible, Umami, Matomo…)
│   │   ├── social-icons/          # Icônes réseaux sociaux + boutons de partage
│   │   │   ├── icons/             # SVG icons (Github, LinkedIn, Twitter, etc.)
│   │   │   └── social-buttons/    # Boutons de partage (Facebook, LinkedIn, Reddit, Twitter)
│   │   ├── solidjs/               # Composants interactifs Solid.js (search, nav mobile, theme, Giscus…)
│   │   ├── Analytics.astro
│   │   ├── BaseHead.astro         # <head> global (SEO, OG, fonts)
│   │   ├── Card.astro
│   │   ├── Comments.astro         # Intégration Giscus
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── ListPostCover.astro
│   │   ├── Pagination.astro
│   │   ├── PostCover.astro
│   │   ├── Tag.astro
│   │   └── …
│   ├── content/
│   │   ├── authors/
│   │   │   └── default.mdx        # Profil auteur (Jeremy Marchandeau)
│   │   ├── blog/                  # Articles (fichiers .mdx)
│   │   ├── categories/            # Catégories d'articles (.mdx)
│   │   ├── domaines/              # Domaines thématiques (.mdx)
│   │   ├── projects/              # Fiches projet (.mdx) — une par projet
│   │   ├── tags/                  # Tags avec descriptions personnalisées (.mdx)
│   │   └── technos/               # Technologies référencées (.mdx)
│   ├── i18n/
│   │   ├── index.ts
│   │   ├── ui.ts                  # Traductions (fr par défaut)
│   │   └── utils.ts
│   ├── layouts/
│   │   ├── AuthorLayout.astro
│   │   ├── ListLayout.astro
│   │   ├── ListWithTagsLayout.astro
│   │   ├── PostLayout.astro        # Layout principal des articles (colonne)
│   │   ├── RootLayout.astro        # Layout racine (header, footer, analytics)
│   │   └── SimplePostLayout.astro
│   ├── pages/
│   │   ├── blog/
│   │   │   ├── [...page].astro    # Liste paginée des articles
│   │   │   └── [...slug].astro    # Page d'un article
│   │   ├── projects/
│   │   │   ├── index.astro        # Liste de tous les projets
│   │   │   └── [slug].astro       # Fiche projet individuelle (sidebar + MDX)
│   │   ├── tags/
│   │   │   ├── index.astro        # Liste de tous les tags
│   │   │   └── [slug]/[...page].astro  # Articles par tag
│   │   ├── 404.astro
│   │   ├── about.astro
│   │   ├── contact.astro          # Page de contact
│   │   ├── index.astro            # Page d'accueil
│   │   ├── journal.astro          # Hub journal — filtrable par domaine, catégorie, techno, année
│   │   ├── rss.xml.js             # Flux RSS
│   │   └── search.json.ts         # Données pour la recherche
│   ├── styles/
│   │   └── global.css
│   ├── consts.ts                  # Config centrale : métadonnées du site, navigation, Giscus, analytics
│   ├── content.config.ts          # Schémas de contenu Astro (blog, authors, projects, technos, categories, domaines)
│   ├── env.d.ts
│   ├── functions.ts               # Fonctions utilitaires (tri des posts, filtrage drafts…)
│   └── utils.ts
├── astro.config.mjs
├── Dockerfile
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── README.md                      # Commandes de base (dev, build, preview)
├── CONTEXT.md                     # Contexte du projet (objectif, stack, contraintes)
├── STRUCTURE.MD                   # Ce fichier — arborescence et fichiers clés
├── NEXT_STEPS.md                  # Tableau de bord : tâches faites et à faire
├── CONVENTIONS.md                 # Conventions de nommage, patterns, standards
├── DECISIONS.md                   # Journal des décisions techniques
└── KNOWN_ISSUES.md                # Bugs connus et points à surveiller
```

---

## Fichiers clés à connaître

| Fichier | Rôle |
| :--- | :--- |
| `src/consts.ts` | Config centrale : titre, URL, Giscus, analytics, navigation, paramètres des posts |
| `src/content.config.ts` | Schémas de contenu (blog, authors, projects, technos, categories, domaines) |
| `src/functions.ts` | Tri et filtrage des articles |
| `src/i18n/ui.ts` | Traductions de l'interface (langue par défaut : français) |
| `src/content/authors/default.mdx` | Profil de l'auteur |
| `src/content/blog/*.mdx` | Articles du blog |
| `src/content/projects/*.mdx` | Fiches projet (frontmatter + corps MDX) |
| `src/content/tags/*.mdx` | Définitions des tags avec descriptions |
| `src/pages/journal.astro` | Hub journal avec filtrage client-side |
| `src/pages/projects/[slug].astro` | Fiche projet — layout sidebar + contenu |

---

## Points importants

- **Langue** : français (`fr_FR`), configuré dans `src/consts.ts` et `src/i18n/ui.ts`
- **Commentaires** : Giscus (GitHub Discussions), configuré dans `src/consts.ts`
- **Recherche** : implémentation custom Solid.js via `search.json.ts`
- **Composants interactifs** : Solid.js (nav mobile, thème, recherche, scroll-to-top)
- **Déploiement** : Vercel (site URL : https://web2data.jeremymarchandeau.com/)
