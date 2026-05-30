---
title: "Local Bike : mon projet capstone Analytics Engineering chez DataBird"
summary: "Retour complet sur le projet final de ma formation Analytics Engineering chez DataBird : une pipeline dbt sur BigQuery, un dashboard Metabase, un CI/CD GitHub Actions, et les décisions techniques qui ont façonné l'architecture. Ce que j'ai construit, comment je m'y suis pris, et ce que j'ai appris en chemin."
postLayout: column
date: "2026-05-30"
lastmod: "2026-05-30"
draft: false
domaine: data
category: rex
technos:
  - dbt
  - bigquery
  - metabase
  - github-actions
---

Le projet capstone d'une formation, c'est le moment où tout ce qu'on a appris depuis des semaines se retrouve sur la table en même temps. dbt, BigQuery, tests de qualité, CI/CD, documentation, dashboard — plus de filet de sécurité, plus d'exercice guidé. Juste toi, un énoncé, et un dataset.

Voici le compte-rendu de ce que j'ai construit, les décisions que j'ai prises, les galères que j'ai rencontrées, et ce que je retiens de l'ensemble.

---

## Le contexte : Local Bike

L'énoncé DataBird met en scène **Local Bike**, un détaillant de vélos américain fondé en 2016 par Alexander Anthony, ancien cycliste professionnel. Trois magasins aux États-Unis — Santa Cruz (Californie), Baldwin (New York), Rowlett (Texas) — et une mission simple : démocratiser le vélo urbain.

L'entreprise n'a pas encore de système de données. Pas de dashboard, pas de pipeline, pas de modèles. Mon rôle en tant qu'Analytics Engineer : construire ce premier système de A à Z. Transformer des tables brutes en données exploitables, connecter tout ça à un outil de BI, et livrer des insights actionnables pour l'équipe des opérations.

Le dataset fourni couvre environ 27 mois d'activité (janvier 2016 — mars 2018) et comprend 10 tables réparties en deux schémas : `Sales` (commandes, clients, magasins, vendeurs) et `Production` (produits, marques, catégories, stocks).

---

## Specs d'abord, code ensuite

La première chose que j'ai faite, avant d'ouvrir un fichier `.sql`, c'est rédiger un fichier `SPECIFICATIONS.md`.

C'est une habitude que j'ai ramenée du développement web. Sur n'importe quel projet un peu sérieux, se lancer dans le code sans avoir posé les fondations par écrit, c'est s'exposer à une quantité de refactoring inutile. En data, ça vaut exactement pareil — peut-être même plus, parce que l'architecture d'une pipeline dbt se déroule très précisément dans un sens : source → staging → intermediate → mart. Si tu te trompes sur le grain d'un mart ou sur sa source, tu refactores l'ensemble de la couche en dessous.

La question que j'ai posée en premier : quelles questions métier est-ce que le dashboard doit permettre de répondre ? Quel est le CA mensuel par magasin ? Quels produits vendent le mieux ? Quelle est la valeur vie client ? Quel est le taux de livraison dans les délais ?

À partir de là, j'ai remonté vers l'architecture : quels marts sont nécessaires, avec quel grain, quelles colonnes. Puis quels modèles intermédiaires, puis quels staging. Le schéma se dessine depuis la sortie vers les sources — pas l'inverse.

---

## La stack technique

**dbt Core** pour la transformation. J'ai explicitement écarté **dbt-fusion**, la réécriture en Rust de dbt Core actuellement en preview. La compatibilité avec les packages de l'écosystème (`dbt-bigquery`, `dbt-utils`, `dbt-codegen`) et avec GitHub Actions n'était pas garantie — trop risqué sur un projet noté avec une pipeline CI/CD au cœur des livrables. J'ai donc épinglé `dbt-core 1.11.10` dans `requirements.txt`, avec la syntaxe qui va avec : `data_tests:` (plus l'ancienne clé `tests:`, dépréciée depuis la 1.10.5) et la clé `arguments:` pour les tests FK et enum.

**BigQuery** comme warehouse. C'était le choix naturel — l'outil étudié pendant la formation.

**Metabase** pour la BI. J'avais déjà une expérience partielle avec l'outil sur des projets perso. Open source, auto-hébergeable, connecte directement à BigQuery — cohérent avec ma façon de travailler. Déployé sur mon VPS Hetzner.

**GitHub Actions** pour le CI/CD. **Netlify** pour héberger la doc dbt générée.

---

## L'architecture : medallion à trois couches

Architecture standard : staging → intermediate → mart. Chaque couche a un rôle précis, pas question d'en sortir.

**Staging** — 9 modèles, un par table source. Uniquement des casts explicites, des renommages, et des défenses `SAFE_CAST`/`NULLIF` pour les colonnes mixtes. Aucune logique métier à cette couche. La règle est simple : si tu as besoin d'un `CASE WHEN`, tu n'es pas au bon endroit.

**Intermediate** — 3 modèles de jointure. `int_orders__enriched` assemble commandes, clients, magasins et vendeurs. `int_order_items__enriched` assemble les lignes de commande avec produits, marques et catégories. Et un troisième dont je parlerai dans la section sur le refactoring.

**Mart** — 5 tables matérialisées, directement connectées à Metabase :

- `orders` — historique complet des commandes (modèle incrémental)
- `revenue_by_store` — revenu mensuel par magasin
- `revenue_by_category` — revenu mensuel par catégorie de produit
- `top_products` — classement produits par revenu et volume vendu
- `customer_summary` — résumé par client : LTV, panier moyen, première et dernière commande

---

## La pipeline CI/CD dès le départ

L'un de mes premiers choix structurants a été de mettre en place le CI/CD **avant** d'écrire les modèles.

Deux workflows GitHub Actions :

- **`ci.yml`** — déclenché sur chaque pull request vers `main`. Stratégie slim : uniquement les modèles modifiés et leurs dépendants (`state:modified+`), en comparant le `manifest.json` de la PR contre celui de la production stocké comme artefact GitHub Actions.
- **`cd.yml`** — déclenché sur chaque push vers `main`. Run complet, tests, génération des docs, upload du `manifest.json` de prod, déploiement des docs sur Netlify via la CLI.
  Le `--defer` dans la CI est particulièrement utile : pour les modèles non modifiés en amont, dbt résout les `ref()` directement sur les tables de production plutôt que de tout reconstruire. Sur un projet de cette taille, ça évite de rebuilder 14 modèles à chaque PR parce qu'on a touché un seul staging.

---

## Les galères techniques (et comment je les ai résolues)

### Colonnes mixtes DATE/STRING dans BigQuery

La table `orders` source est sympathique à ce niveau : `order_date` et `required_date` sont des colonnes `DATE` natives, mais `shipped_date` est stockée en `STRING` — avec la valeur littérale `'NULL'` pour les commandes non expédiées.

Appliquer `NULLIF` sur une colonne `DATE` native provoque une erreur BigQuery. J'ai dû gérer les deux cas différemment selon le type réel de chaque colonne, en appliquant `SAFE_CAST(shipped_date AS DATE)` uniquement là où c'était nécessaire. Ce genre de chose est documenté dans `DECISIONS.md` (ADR-009).

### `accepted_values` sur colonnes entières

Les tests `accepted_values` de dbt quotent les valeurs par défaut. Sur une colonne `INT64`, BigQuery rejette la comparaison avec des `STRING`. La solution : ajouter `quote: false` dans les arguments du test.

```yaml
data_tests:
  - accepted_values:
      values: [1, 2, 3, 4]
      arguments:
        quote: false
```

C'est un comportement peu documenté, et ça m'a coûté un peu de temps à débugger.

### `order_year_month` STRING → `order_month` DATE

Les filtres de date dans Metabase ne fonctionnent pas sur des colonnes `STRING`. J'avais initialement calculé la période mensuelle via `FORMAT_DATE('%Y-%m', order_date)`, ce qui produisait une chaîne de caractères comme `'2018-01'`. Résultat : impossible de brancher un sélecteur de période natif sur les graphiques de revenu.

La correction : remplacer par `DATE_TRUNC(order_date, MONTH)`, qui retourne une vraie `DATE` (premier jour du mois). Metabase reconnaît nativement ce format et l'affiche comme "janvier 2018" dans les filtres.

---

## Le refactoring du lineage

C'est probablement la décision technique la plus intéressante de tout le projet.

Au départ, chacun des quatre marts qui exposent du revenu (`revenue_by_store`, `revenue_by_category`, `top_products`, `customer_summary`) faisait sa propre jointure entre `int_orders__enriched` et `int_order_items__enriched`, et chacun réappliquait le même filtre sur les commandes complétées (`order_status = 4`).

Résultat sur le DAG : des lignes qui se croisent entre les couches, la même logique dupliquée quatre fois, et un risque réel d'incohérence si quelqu'un modifie la règle dans un modèle sans l'appliquer aux autres.

J'ai introduit un troisième modèle intermédiaire : **`int_orders__with_revenue`**. Ce modèle centralise la jointure et pré-calcule le revenu par commande, en isolant la règle métier une seule fois. Le DAG est maintenant strictement linéaire, sans croisements entre couches.

Avant :

```
int_orders__enriched ──┐
                       ├─> revenue_by_store
int_order_items__enriched ──┘ (jointure dans chaque mart)
```

Après :

```
int_orders__enriched ──┐
                       ├─> int_orders__with_revenue ──> revenue_by_store
int_order_items__enriched ──┘                       ──> customer_summary
                                                    ──> orders
```

C'est ce genre de refactoring qu'on ne voit pas dans les tutorials mais qui fait la différence entre une pipeline qui tient dans le temps et une qui se transforme en lasagne de SQL.

---

## La qualité des données

Tous les modèles sont couverts par des tests génériques (`not_null`, `unique`, `relationships`, `accepted_values`) et des tests singuliers pour les règles métier non exprimables en générique :

- Quantités et prix positifs sur toutes les lignes de commande
- Stocks non négatifs
- Cohérence des dates (`order_date ≤ required_date`, `shipped_date ≥ order_date`)
- Validation du grain après jointure à la couche intermédiaire — aucune explosion de lignes
- Revenu total positif par store × mois, `lifetime_value` non négatif
  Le principe : les tests de données ne sont pas une option, ils sont la définition de "ça marche". Un `dbt run` qui passe sans `dbt test` vert en dessous, ça ne compte pas.

---

## Ce que les données racontent

Le dashboard expose 8 KPIs couvrant le revenu, les produits, les clients et les opérations. Quelques chiffres qui frappent :

**Baldwin (New York) concentre 70,6 % du chiffre d'affaires total.** Sur $6,6M de revenus sur la période, Baldwin en génère $4,7M. C'est 7x plus que Rowlett et presque 4x plus que Santa Cruz. Ça ressemble à un atout — c'est surtout un risque de concentration structurel.

**Santa Cruz a stagné entre 2016 et 2017.** $544 659 en 2016, $544 196 en 2017 — soit une variation quasi nulle. Pendant ce temps, Baldwin progressait de +54 % et Rowlett de +52 %. Il y a quelque chose à investiguer du côté de Santa Cruz, que ce soit le mix produit, les équipes, ou la pénétration du marché local.

**1 commande sur 3 est livrée en retard.** Taux de 31,7 %, avec un délai moyen de 1,3 jour quand ça dépasse. Ce n'est pas des incidents ponctuels — c'est un glissement systématique qui interroge le processus de fulfillment. Pour une marque positionnée sur la personnalisation et la relation client, c'est un signal à prendre au sérieux.

**Road Bikes et Electric Bikes génèrent près du double de revenu par unité vendue** par rapport aux Mountain Bikes ($2 956 et $2 911 contre $1 547). Les Mountain Bikes dominent le volume — mais si l'objectif est de maximiser le panier moyen, c'est vers le haut de gamme qu'il faut orienter les consultations.

Le rapport complet des insights est disponible dans le dépôt : [`docs/INSIGHTS.md`](https://github.com/jeremy6680/databird-local-bike/blob/main/docs/INSIGHTS.md).

---

## La documentation comme pratique

J'ai maintenu quatre fichiers de documentation tout au long du projet : `SPECIFICATIONS.md`, `DECISIONS.md`, `STRUCTURE.md`, `NEXT_STEPS.md`. C'est une pratique que j'applique sur tous mes projets, web ou data.

Le `DECISIONS.md` en particulier — 23 ADRs au total — a été utile pendant la peer review : un relecteur comprend immédiatement pourquoi une décision a été prise, sans avoir à fouiller le code ou poser des questions. C'est aussi utile pour soi-même, deux semaines après avoir pris une décision dont on ne se souvient plus du contexte.

---

## Claude comme outil de travail, pas comme cerveau

J'ai utilisé Claude tout au long du projet, et je préfère le dire clairement plutôt que de le glisser en bas d'une section.

En pratique, ça a servi à trois choses : rédiger les descriptions des fichiers `.yml` (c'est fastidieux et répétitif, l'IA est bonne à ça), mettre en place les tests génériques sur les modèles, et débloquer des problèmes techniques précis liés à BigQuery — notamment les histoires de colonnes mixtes DATE/STRING et le `quote: false` sur les `accepted_values` entiers.

Les ADRs du `DECISIONS.md`, c'est Claude qui les a rédigés — mais les décisions qu'ils documentent sont les miennes. C'est moi qui ai choisi l'architecture, décidé du refactoring du lineage, défini la logique métier. Claude a mis en forme le raisonnement que j'avais déjà en tête. Ce n'est pas la même chose que de décider à ma place.

C'est une ligne que j'essaie de tenir sur tous mes projets. L'IA accélère et évite des erreurs bêtes. Elle ne réfléchit pas à ta place si tu ne la laisses pas faire.

---

## Les livrables

Tout est accessible publiquement :

- **Dashboard Metabase** : [local-bike-data.jeremymarchandeau.com](https://local-bike-data.jeremymarchandeau.com/public/dashboard/9dc87740-46b7-47d1-88a7-13578c238598)
- **Documentation dbt** : [local-bike-docs.jeremymarchandeau.com](https://local-bike-docs.jeremymarchandeau.com/)
- **Dépôt GitHub** : [github.com/jeremy6680/databird-local-bike](https://github.com/jeremy6680/databird-local-bike)
  La pipeline CI est verte sur chaque PR, le CD déploie automatiquement sur `main`, les docs sont à jour en permanence sur Netlify.

---

## Ce que je retiens

Un projet capstone, c'est utile précisément parce que personne ne te dit dans quel ordre faire les choses. Tu dois choisir. Et les choix que tu fais — dbt-fusion ou dbt Core stable, `build` ou `run` + `test` en étapes séparées, logique métier en staging ou en intermediate, docs en string ou en date — ont des conséquences concrètes que tu vis pendant le projet plutôt que de les lire dans un article.

Le refactoring du lineage, la galère avec les colonnes mixtes DATE/STRING, le `quote: false` sur les `accepted_values` entiers, le remplacement de `FORMAT_DATE` par `DATE_TRUNC` pour que Metabase reconnaisse les filtres de date — aucune de ces choses ne figure dans les tutoriels. Elles s'apprennent en les rencontrant.

C'est pour ça que je les documente ici.
