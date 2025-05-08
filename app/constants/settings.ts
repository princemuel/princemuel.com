export const getSiteSettings = () => ({
  id: "settings",
  /** The site title*/
  name: "Prince Muel",
  /** A human-readable description of the site*/
  description: "",
  /** The site's default language as a string, e.g. `"en-US"`*/
  language: "en" as ["en", "fr", "es"][number],
  /** The site's timezone as a string, e.g. `"Europe/Paris"`*/
  timezone_string: "Africa/Lagos",
  /** The site's timezone expressed as an offset in hours from GMT*/
  gmt_offset: 1,
  /** The URL of the site*/
  url: new URL("/", import.meta.env.SITE),
  /** The URL of the site homepage. (Usually the same as `url`)*/
  home: new URL("/", import.meta.env.SITE),
  /** The site's author's handle as a string, e.g. `"the_primeagean"`*/
  site_author: "princemuel",
  /** Reference to a media attachment to use as the site icon*/
  site_icon: "",
  /** Reference to a media attachment to use as the site logo*/
  site_logo: "",
  /** URL to a resource to use as the site icon*/
  site_icon_url: "",
  /** The publish date of the site*/
  published_date: new Date("2024-02-01T16:43:29.577Z"),
});

export const baseData = {
  title: "Cesar Poumian's Blog",
  description: "Cesar Poumian's blog. Web development, programming, and personal projects.",
  home_intro:
    "Welcome to my blog! I’m a web developer based in México. I created this blog to document techniques, patterns, insights, etc. To keep myself accountable, I also document any new personal projects I work on.",
  greeting: "Hello, I'm Cesar 👋",
  blog_intro:
    "Below are all my recent blog posts. Some of them are tutorials, others are project walk-throughs/case-studies, and some are insights discussing things like libraries, courses, developer resources, etc.",
  blog_title: "My Posts",
};
