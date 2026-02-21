export const defaultLang = "fr" as const;

export const ui = {
  en: {
    // Site Metadata
    "siteMetadata.title": "Web2Data",
    "siteMetadata.headerTitle": "Web2Data",
    "siteMetadata.description":
      "Welcome to my personal blog where I share my thoughts, projects, and experiences in the world of technology and software development.",
    "siteMetadata.language": "en-US",

    // Pages
    "pages.home.latestPosts": "Latest posts",
    "pages.home.viewAllPosts": "View all posts",
    "pages.home.noPosts": "No posts found",
    "pages.home.readMoreAbout": "Read more about {title}",
    "pages.home.readMore": "Read more",
    "pages.tags.title": "Tags",
    "pages.tags.description": "All tags used in the blog",
    "pages.tags.allTags": "All tags",
    "pages.tags.noTags": "No tags found",
    "pages.tags.viewPosts": "View all posts with tag {tag}",
    "pages.projects.title": "Projects",
    "pages.projects.description": "All projects",
    "pages.projects.allProjects": "All projects",
    "pages.projects.showcase": "Showcase your projects",
    "pages.blog.title": "Blog",
    "pages.blog.description": "All blog posts",
    "pages.404.title": "404 - Not Found",
    "pages.404.description": "The page you are looking for does not exist.",
    "pages.404.backToHome": "Back to home",

    // Components
    "components.scrollTopAndComments.scrollTop": "Scroll To Top",
    "components.scrollTopAndComments.scrollToComments": "Scroll To Comments",
    "components.themeSwitcher.toggleDarkMode": "Toggle Dark Mode",
    "components.card.linkToPost": "Read more about {title}",
    "components.mobileNav.toggleMenu": "Toggle Menu",
    "components.listPostCover.publishedAt": "Published at",
    "components.pagination.previous": "Previous",
    "components.pagination.next": "Next",
    "components.socialShareButtons.sharing": "Sharing is caring!",
    "components.comments.title": "Comments",

    // Navigation
    "nav.home": "Home",
    "nav.blog": "Blog",
    "nav.projects": "Projects",
    "nav.tags": "Tags",
    "nav.about": "About",

    // Layouts
    "layouts.authorLayout.aboutAuthor": "About {author}",
    "layouts.authorLayout.latestPosts": "Latest author posts",
    "layouts.listWithTagsLayout.allPosts": "All posts",
    "layouts.listWithTagsLayout.publishedAt": "Published at",
    "layouts.postLayout.publishedAt": "Published at",
    "layouts.postLayout.authors": "Authors",
    "layouts.postLayout.authorName": "Name",
    "layouts.postLayout.authorTwitter": "Twitter",
    "layouts.postLayout.draftMessage":
      "This is a draft. It might be incomplete or have errors.",
    "layouts.postLayout.tableOfContents": "Table of Contents",
    "layouts.postLayout.tags": "Tags",
    "layouts.postLayout.previousPost": "Previous post",
    "layouts.postLayout.nextPost": "Next post",
    "layouts.postLayout.relatedPosts": "Related posts",
    "layouts.postLayout.backToBlog": "Back to blog",
    "layouts.simplePostLayout.previousPost": "Previous post: {title}",
    "layouts.simplePostLayout.nextPost": "Next post: {title}",

    // SEO
    "seo.pagination.page": "%s - Page {page}",
  },

  fr: {
    // Site Metadata
    "siteMetadata.title": "Web2Data",
    "siteMetadata.headerTitle": "Web2Data",
    "siteMetadata.description":
      "Du web à la data et l'IA — le journal de bord d'un dev en reconversion.",
    "siteMetadata.language": "fr-FR",

    // Pages
    "pages.home.latestPosts": "Derniers articles",
    "pages.home.viewAllPosts": "Voir tous les articles",
    "pages.home.noPosts": "Aucun article trouvé",
    "pages.home.readMoreAbout": "En savoir plus sur {title}",
    "pages.home.readMore": "Lire la suite",
    "pages.tags.title": "Tags",
    "pages.tags.description": "Tous les tags utilisés sur le blog",
    "pages.tags.allTags": "Tous les tags",
    "pages.tags.noTags": "Aucun tag trouvé",
    "pages.tags.viewPosts": "Voir tous les articles avec le tag {tag}",
    "pages.projects.title": "Projets",
    "pages.projects.description": "Tous les projets",
    "pages.projects.allProjects": "Tous les projets",
    "pages.projects.showcase": "Découvrez mes projets",
    "pages.blog.title": "Blog",
    "pages.blog.description": "Tous les articles du blog",
    "pages.404.title": "404 - Page introuvable",
    "pages.404.description": "La page que vous recherchez n’existe pas.",
    "pages.404.backToHome": "Retour à l’accueil",

    // Components
    "components.scrollTopAndComments.scrollTop": "Remonter en haut",
    "components.scrollTopAndComments.scrollToComments":
      "Aller aux commentaires",
    "components.themeSwitcher.toggleDarkMode": "Basculer en mode sombre",
    "components.card.linkToPost": "En savoir plus sur {title}",
    "components.mobileNav.toggleMenu": "Ouvrir le menu",
    "components.listPostCover.publishedAt": "Publié le",
    "components.pagination.previous": "Précédent",
    "components.pagination.next": "Suivant",
    "components.socialShareButtons.sharing": "Partager, c’est aimer !",
    "components.comments.title": "Commentaires",

    // Navigation
    "nav.home": "Accueil",
    "nav.blog": "Blog",
    "nav.projects": "Projets",
    "nav.tags": "Tags",
    "nav.about": "À propos",

    // Layouts
    "layouts.authorLayout.aboutAuthor": "À propos de Web2Data",
    "layouts.authorLayout.latestPosts": "Derniers articles",
    "layouts.listWithTagsLayout.allPosts": "Tous les articles",
    "layouts.listWithTagsLayout.publishedAt": "Publié le",
    "layouts.postLayout.publishedAt": "Publié le",
    "layouts.postLayout.authors": "Auteurs",
    "layouts.postLayout.authorName": "Nom",
    "layouts.postLayout.authorTwitter": "Twitter",
    "layouts.postLayout.draftMessage":
      "Ceci est un brouillon. Il peut être incomplet ou contenir des erreurs.",
    "layouts.postLayout.tableOfContents": "Table des matières",
    "layouts.postLayout.tags": "Tags",
    "layouts.postLayout.previousPost": "Article précédent",
    "layouts.postLayout.nextPost": "Article suivant",
    "layouts.postLayout.relatedPosts": "Articles similaires",
    "layouts.postLayout.backToBlog": "Retour au blog",
    "layouts.simplePostLayout.previousPost": "Article précédent : {title}",
    "layouts.simplePostLayout.nextPost": "Article suivant : {title}",

    // SEO
    "seo.pagination.page": "%s - Page {page}",
  },
} as const;
