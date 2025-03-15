import { envVars } from "./dotenv";
import icons from "./iconify.json";

import type { MdxOptions } from "@astrojs/mdx";
import type { SitemapOptions } from "@astrojs/sitemap";
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

export const sentry_options = {
  sourceMapsUploadOptions: {
    project: "princemuel-io",
    authToken: envVars.SENTRY_AUTH_TOKEN,
  },
} satisfies SentryOptions;
