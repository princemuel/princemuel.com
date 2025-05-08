import { envVars } from "./dotenv";

import icons from "./iconify.json";
import manifest from "./manifest.json";

import type { MdxOptions } from "@astrojs/mdx";
import type { SitemapOptions } from "@astrojs/sitemap";
import type { PwaOptions } from "@vite-pwa/astro";
import type { AstroExpressiveCodeOptions } from "astro-expressive-code";
import type { SentryOptions } from "node_modules/@sentry/astro/build/types/integration/types";
import type { IntegrationOptions as IconifyOptions } from "node_modules/astro-icon/typings/integration";

export const sitemap_opts = {
  changefreq: "weekly",
  priority: 0.7,
  lastmod: new Date(),
  filter: (page) => !(page.includes("/api/") || page.includes(".xml")),
} satisfies SitemapOptions;

export const mdx_opts = {
  gfm: true,
  extendMarkdownConfig: true,
} satisfies Partial<MdxOptions>;

export const iconify_opts = {
  include: icons,
  iconDir: "app/assets/icons",
  svgoOptions: { multipass: true },
} satisfies IconifyOptions;

export const sentry_opts = {
  sourceMapsUploadOptions: {
    project: "princemuel-io",
    authToken: envVars.SENTRY_AUTH_TOKEN,
  },
} satisfies SentryOptions;

export const code_opts = {} satisfies AstroExpressiveCodeOptions;

export const pwa_options = {
  registerType: "prompt",
  pwaAssets: { config: true, overrideManifestIcons: true },
  experimental: { directoryAndTrailingSlashHandler: true },
  manifest: manifest as PwaOptions["manifest"],
  devOptions: { enabled: false, suppressWarnings: true, type: "module" },
  workbox: {
    cleanupOutdatedCaches: true,
    // clientsClaim: true,
    // navigateFallback: "/offline",
    // globPatterns: [
    //   "**/*.{css,js,jpg,jpeg,png,gif,webp,svg,ico,woff,woff2,ttf,eot}",
    // ],
    // navigateFallbackAllowlist: [/^\/api\/v\d+\/.*$/iu],
    // navigateFallbackDenylist: [
    //   /\.(?:png|gif|jpg|jpeg|webp|avif|svg|ico)$/iu,
    //   /\.(?:ttf|otf|woff|woff2)$/iu,
    //   /\.(?:css|js)$/iu,
    //   /\/sw\.js$/iu,
    //   /\.(?:pdf|mp4|webm|ogg|mp3|wav)$/iu,
    // ],
    // runtimeCaching: cachePreset,
  },
} satisfies PwaOptions;
