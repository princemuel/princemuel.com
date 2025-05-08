import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import sentry from "@sentry/astro";
import spotlightjs from "@spotlightjs/astro";
import pwa from "@vite-pwa/astro";
import code from "astro-expressive-code";
import iconify from "astro-icon";

import { iconify_opts, mdx_opts, pwa_options, sentry_opts, sitemap_opts } from "./options";

import type { AstroUserConfig } from "astro";

type AstroConfig = NonNullable<NonNullable<AstroUserConfig["integrations"]>>;

export default [
  sentry(sentry_opts),
  spotlightjs(),
  iconify(iconify_opts),
  code(),
  mdx(mdx_opts),
  sitemap(sitemap_opts),
  pwa(pwa_options),
] satisfies AstroConfig;
