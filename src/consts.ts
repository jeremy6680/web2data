/**
 * Site metadata that is used across the site.
 *
 * A few of these are not used yet, and are subject to change, example of this is Author.
 */
export const SITE_METADATA = {
  title: "Web2Data",
  description:
    "Tutoriels, insights et bonnes pratiques sur le développement web, la data et l'IA.",
  language: "fr_FR", // OG locale format: language_TERRITORY
  theme: "system", // Options: system, light, dark
  siteUrl: "https://web2data.jeremymarchandeau.com/",
  siteRepo: "https://github.com/jeremy6680/web2data",
  robots: "index, follow", // Options: index, noindex, follow, nofollow

  // These are not supported yet
  analytics: {
    fathom: {
      site: "", // Add your site id here
      src: "https://cdn.usefathom.com/fathom.js",
    },
    googleAnalyticsId: null, // Add your Google Analytics id here
    metricalApp: null, // Add your Metrical app here
    plausible: {
      domain: "", // Add your domain here
      src: "https://plausible.io/js/plausible.js",
    },
    simpleAnalytics: false, // Activate Simple Analytics
    umami: {
      site: "web2data.jeremymarchandeau.com",
      dataId: "7d38947c-ca44-410d-bd49-924708cb4e94",
      host: "/script.js",
    },
    // amplitudeApiKey: null, // Add your Amplitude Api Key here, not yet implemented
    matomo: {
      id: "", // Add your Matomo id here
      url: "", // Add your Matomo url here
    },
    minimalAnalyticsId: null, // Add your Minimal Analytics id here
  },
  comments: {
    // Visit https://giscus.app/ to get your configuration
    // Enable discussions in your repository settings and install the Giscus app
    provider: "giscus", // Set to 'giscus' to enable comments or null to disable
    giscusConfig: {
      repo: "jeremy6680/web2data", // Your GitHub repository (e.g., 'username/repo')
      repositoryId: "R_kgDORUNVWA", // Your repository ID from giscus.app
      category: "General", // Discussion category (e.g., 'General')
      categoryId: "DIC_kwDORUNVWM4C2-0s", // Category ID from giscus.app
      mapping: "pathname", // How to map pages to discussions: 'pathname', 'url', 'title', etc.
      reactionsEnabled: "1", // Enable reactions: '1' or '0'
      emitMetadata: "0", // Emit discussion metadata: '1' or '0'
      inputPosition: "top", // Comment box position: 'top' or 'bottom'
      theme: "preferred_color_scheme", // Theme for light mode: 'light', 'dark', 'dark_dimmed', 'dark_high_contrast', 'transparent_dark', 'preferred_color_scheme', or custom CSS URL
      darkTheme: "dark", // Theme for dark mode: same options as theme
      lang: "fr", // Language code
      loading: "lazy", // Loading mode: 'lazy' or 'eager'
    },
  },
  search: {
    provider: "custom", // Custom Solid.js search implementation
    kbarConfig: {
      searchDocumentsPath: "search.json", // path to load documents to search
    },
  },
};

/**
 * Default posts per page for pagination.
 */
export const ITEMS_PER_PAGE = 5;

/**
 * Navigation items.
 If title is not found in the translation file, it will be used as is.
 example: if title is "nav.home", and translation file does not have "nav.home", it will be displayed as "nav.home"

 You should add translations for these in src/i18n/ui.ts or use as is.
 */
export const NAVIGATION = [
  { href: "/", title: "nav.home" },
  { href: "/tags", title: "nav.tags" },
  { href: "/projects", title: "nav.projects" },
  { href: "/about", title: "nav.about" },
] as const;

export const POST_METADATA = {
  defaultLayout: "column", // Default layout for blog posts, options: simple and column
  showFullWidthCover: false, // Show full width cover image in blog post
  showCover: true, // Show cover image in blog post
  showTags: true, // Show tags in blog post, TODO: Add support for hiding tags
  showDate: true, // Show date in blog post, TODO: Add support for hiding date
  showSummary: true, // Show summary in blog post
  showAuthors: true, // Show authors in blog post, TODO: Add support for hiding authors
  showRelatedPosts: true, // Show related posts in blog post, TODO: Add support for hiding related posts
  showTableOfContents: true, // Show table of contents in blog post
  showShareButtons: "both", // Show share buttons in blog post, options: top, bottom, both, none
  showComments: true, // Show comments section in blog post
};
