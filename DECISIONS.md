# Web2Data — Décisions techniques

Journal des choix structurants du projet, avec leur justification.

---

## Astro v5 comme framework

**Décision** : utiliser Astro plutôt que Next.js, Gatsby, ou un CMS headless.

**Raison** : le blog est statique par nature — pas de données dynamiques, pas de base de données, pas d'authentification. Astro génère du HTML pur avec zéro JavaScript par défaut. Les performances Lighthouse sont excellentes sans optimisation particulière. Le système de Content Collections avec schéma TypeScript garantit l'intégrité du contenu à chaque build.

---

## Solid.js pour les composants interactifs

**Décision** : utiliser Solid.js (et non React) pour les quatre composants interactifs : navigation mobile, thème dark/light, recherche, Giscus.

**Raison** : le template de base [`tailwind-astro-starting-blog`](https://github.com/wanoo21/tailwind-astro-starting-blog) est déjà construit avec Solid.js. La bundle size est plus petite que React. L'architecture "islands" d'Astro rend ce choix très ciblé — chaque composant est isolé. Pas de raison de mixer deux frameworks pour si peu de JavaScript.

---

## Tailwind CSS v4

**Décision** : utiliser Tailwind v4 avec la syntaxe `@theme` plutôt que le fichier `tailwind.config.js` de v3.

**Raison** : le template cible déjà Tailwind v4. La configuration via `@theme` dans le CSS est plus lisible et évite un fichier de config supplémentaire. La palette primaire (`pink`) et les polices sont définies directement dans `src/styles/global.css`.

---

## Typographie : Onest + Space Grotesk

**Décision** : deux polices chargées via `@fontsource` — Onest pour le corps, Space Grotesk pour les titres.

**Raison** : `@fontsource` évite une dépendance à Google Fonts (pas de requête externe, meilleure vie privée, meilleure disponibilité offline). La combinaison Onest/Space Grotesk donne une identité visuelle distincte sans être chargée. Un fallback `@font-face` avec ajustements métriques a été ajouté pour Space Grotesk afin de minimiser le CLS (layout shift) sur Lighthouse.

---

## Couleur primaire : pink

**Décision** : utiliser `pink` de la palette Tailwind comme couleur primaire du site.

**Raison** : choix esthétique personnel — distinctive, cohérente avec l'identité du blog. Implémentée via des variables CSS (`--color-primary-500: var(--color-pink-500)`) pour pouvoir changer facilement si nécessaire.

---

## Commentaires : Giscus (GitHub Discussions)

**Décision** : utiliser Giscus plutôt que Disqus, Utterances, ou une solution payante.

**Raison** : pas de base de données, pas de compte tiers payant. Les commentaires vivent dans les GitHub Discussions du repo — directement accessibles, exportables, sans vendor lock-in. La synchronisation du thème dark/light est gérée en temps réel via `postMessage` dans le composant Solid.js ([`src/components/solidjs/Giscus.tsx`](src/components/solidjs/Giscus.tsx)).

---

## Recherche : custom SolidJS (pas Algolia ni Pagefind)

**Décision** : garder la recherche full-text custom du template (SolidJS + JSON statique) plutôt qu'intégrer Algolia ou Pagefind.

**Raison** : le volume d'articles est faible. La recherche charge un `search.json` généré au build et filtre côté client sur le titre, le résumé, le contenu et les tags. C'est suffisant, sans dépendance externe. À réévaluer si le corpus d'articles devient significativement plus grand (> 100 articles).

---

## Déploiement : Vercel (migration depuis Netlify)

**Décision** : déployer sur Vercel après avoir initialement évalué Netlify.

**Raison** : Vercel offre une meilleure intégration avec les projets Astro modernes et un workflow de déploiement plus fluide. Netlify a été utilisé pour tester (voir l'article sur le déploiement automatique sur Netlify), mais Vercel a été retenu pour la production.

---

## Template de départ : tailwind-astro-starting-blog

**Décision** : partir d'un template existant plutôt que de construire from scratch.

**Raison** : les fonctionnalités génériques (pagination, tags, table des matières, layouts, i18n, RSS, Giscus) sont déjà bien implémentées. Partir d'une base solide permet de se concentrer sur le contenu et les spécificités du projet dès le lancement. Le template a été adapté (typographie, couleurs, configuration, langue) mais sa structure n'a pas été remaniée.

---

## i18n : fr comme langue par défaut, en maintenu

**Décision** : configurer `fr` comme langue par défaut dans `src/i18n/ui.ts` tout en conservant les clés `en` dans le fichier.

**Raison** : le site est entièrement en français, mais le template gère nativement les deux locales. Supprimer les clés `en` créerait des erreurs TypeScript. Les deux locales sont donc maintenues, mais seul `fr` est utilisé en production.
