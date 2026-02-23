# Web2Data — Contexte du projet

## Projet

Blog personnel de Jeremy Marchandeau — développeur web avec 13+ ans d'expérience WordPress en cours de reconversion vers la data et l'IA.

**URL** : https://web2data.jeremymarchandeau.com/
**Repo** : https://github.com/jeremy6680/web2data

Le nom du blog résume la trajectoire : *du web à la data*.

---

## Pourquoi ce blog existe

Après 5 ans chez Whodunit (agence WordPress) et plus de 13 ans dans l'écosystème WordPress, Jeremy a décidé de tourner la page pour se former sérieusement à la data et à l'IA (DeepLearning.ai, Data Analytics, systèmes agentiques, RAG, LlamaIndex, CrewAI, LangGraph).

Web2Data est le journal de bord de cette reconversion : tutoriels, retours d'expérience, outils, bonnes pratiques — au croisement du développement web, de la data et de l'IA.

---

## Public cible

Développeurs avec une base web solide (WordPress, React, etc.) qui s'interrogent sur la data ou l'IA — ou qui sont en train de faire le même chemin.

---

## Stack technique

- **Framework** : Astro v5
- **CSS** : Tailwind CSS v4
- **Composants interactifs** : Solid.js (navigation mobile, thème dark/light, recherche, Giscus)
- **Contenu** : MDX (fichiers `.mdx` dans `src/content/blog/`)
- **Commentaires** : Giscus (GitHub Discussions)
- **Déploiement** : Vercel
- **Langue** : français (`fr_FR`)
- **Template de base** : [tailwind-astro-starting-blog](https://github.com/wanoo21/tailwind-astro-starting-blog)

---

## Thématiques couvertes

- Développement web (Astro, React, WordPress, Tailwind)
- Data Analytics et IA
- Outils et workflow (dont l'utilisation des LLMs pour coder)
- Bonnes pratiques et retours d'expérience

---

## Contraintes importantes

- Site **entièrement en français** — ne pas switcher vers l'anglais dans les suggestions de contenu ou de code.
- Astro génère du **HTML statique** — pas de SSR, pas de base de données.
- Les composants interactifs utilisent **Solid.js** (pas React), sauf si c'est explicitement modifié.
- Le contenu est **validé par schéma TypeScript** via `src/content.config.ts` — tout nouveau champ dans le frontmatter doit être déclaré là.
- Les tags sont des fichiers `.mdx` dans `src/content/tags/` — chaque nouveau tag doit avoir son fichier.

---

## Projets liés

- **Site personnel** : https://jeremymarchandeau.com — construit avec React + Vite + Tailwind, bilingue FR/EN. Repo séparé.
- **Profil freelance WordPress** : https://wp.jeremymarchandeau.com — ancien site perso, conservé comme vitrine WordPress.
