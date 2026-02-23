# Web2Data — Problèmes connus

Bugs connus, comportements non résolus, et points de vigilance. Évite de re-débugger ce qui a déjà été investigué.

---

## Incohérence de slug : `data_analytics` vs `data-analytics`

**Statut** : à corriger (mentionné dans NEXT_STEPS.md)

**Description** : lors de la création initiale des tags, le fichier a été nommé `data_analytics.mdx` (underscore). La convention retenue pour les slugs est le tiret (`data-analytics`). Le fichier a été renommé mais des liens internes ou des références dans des articles peuvent encore pointer vers l'ancien slug.

**À vérifier** : chercher `data_analytics` (avec underscore) dans les fichiers `.mdx` de `src/content/blog/` pour identifier les références obsolètes.

---

## Pas d'optimisation d'images (passthroughImageService)

**Statut** : connu, non résolu — prévu dans NEXT_STEPS.md

**Description** : le projet utilise `passthroughImageService` dans la config Astro, ce qui désactive le traitement des images (redimensionnement, compression, format WebP/AVIF). Les images de couverture sont servies telles quelles.

**Impact** : score Lighthouse potentiellement dégradé sur les pages avec des images lourdes. Pas de génération automatique des attributs `width`/`height`.

**Piste** : passer au service d'images natif d'Astro ou à Sharp pour activer la compression et les formats modernes.

---

## Accessibilité des composants Solid.js non auditée

**Statut** : audit à faire — prévu dans NEXT_STEPS.md

**Description** : les quatre composants interactifs (navigation mobile, thème dark/light, recherche `⌘K`, Giscus) n'ont pas été passés au crible de l'accessibilité. Les points à vérifier en priorité : attributs `aria-*`, gestion du focus au clavier, annonces aux lecteurs d'écran.

**Fichiers concernés** :
- [`src/components/solidjs/MobileNav.tsx`](src/components/solidjs/MobileNav.tsx)
- [`src/components/solidjs/ThemeSwitcher.tsx`](src/components/solidjs/ThemeSwitcher.tsx)
- [`src/components/solidjs/SearchButton.tsx`](src/components/solidjs/SearchButton.tsx)
- [`src/components/solidjs/Giscus.tsx`](src/components/solidjs/Giscus.tsx)

---

## Giscus : rechargement du script à chaque navigation

**Statut** : comportement voulu, mais à surveiller

**Description** : le composant Giscus injecte le script avec un paramètre `?v=Date.now()` pour forcer son exécution à chaque navigation (contournement du comportement SPA où un script déjà chargé ne se réexécute pas). C'est intentionnel.

**Risque** : si Giscus venait à limiter les requêtes par IP, ce pattern pourrait poser problème. À noter si des erreurs réseau apparaissent autour de Giscus.

---

## Analytics non configurées

**Statut** : configuration vide, fonctionnalité inactive

**Description** : `src/consts.ts` contient des entrées pour Fathom, Google Analytics, Plausible, Matomo, Umami, etc. — toutes avec des valeurs vides ou `null`. Aucun outil d'analytics n'est actif en production.

**À faire si besoin** : choisir un outil et renseigner les valeurs correspondantes dans `SITE_METADATA.analytics`.

---

## Page Projets vide

**Statut** : fonctionnelle mais sans contenu

**Description** : la page `/projects` existe ([`src/pages/projects.astro`](src/pages/projects.astro)) mais n'affiche aucun projet. Le contenu est à ajouter manuellement dans le fichier (pas de collection Astro pour les projets — contrairement aux articles et aux tags).
