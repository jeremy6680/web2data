# Web2Data — Tableau de bord

## ✅ Fait

### Infrastructure
- [x] Mise en place du projet Astro v5 + Tailwind CSS v4
- [x] Configuration centrale (`src/consts.ts`) : métadonnées, navigation, analytics, Giscus
- [x] Schémas de contenu TypeScript (`src/content.config.ts`)
- [x] Typographie custom : Onest (corps) + Space Grotesk (titres), via `@fontsource`
- [x] Palette de couleurs : rose (`pink`) comme couleur primaire
- [x] Commentaires Giscus (synchronisation thème dark/light en temps réel)
- [x] Recherche full-text custom SolidJS (`⌘K` / `Ctrl+K`)
- [x] Flux RSS (`/rss.xml`)
- [x] Déploiement Vercel

### Contenu
- [x] Profil auteur (`src/content/authors/default.mdx`)
- [x] Tags initiaux : `astro`, `tailwindcss`, `wordpress`, `react`, `data-analytics`, `netlify`, `llm`, `outils`, `bonnes-pratiques`
- [x] Article : *Pourquoi je quitte Whodunit après 5 ans*
- [x] Article : *Refonte de mon site perso : exit WordPress, bonjour React + Vite*
- [x] Article : *Lancement de ce blog avec Astro : choix techniques et retour d'expérience*
- [x] Article : *Déploiement automatique sur Netlify*
- [x] Article : *Data Analytics & Deep Learning*
- [x] Article : *Mon process pour coder avec les LLMs*

---

## 🔜 À faire

### Qualité & performances
- [ ] Audit accessibilité complet (composants Solid.js en priorité : nav mobile, search, Giscus)
- [ ] Optimisation des images (passer de `passthroughImageService` à un service avec compression)
- [ ] Vérification des contrastes et attributs ARIA

### Contenu
- [ ] Définir le calendrier éditorial (fréquence de publication cible)
- [ ] Articles sur la data / IA (formations DeepLearning.ai, outils : LlamaIndex, CrewAI, LangGraph)
- [ ] Newsletter (évaluer la pertinence et choisir un outil)

### Technique
- [ ] Vérifier cohérence du renommage `data_analytics` → `data-analytics` (slug et liens internes)
