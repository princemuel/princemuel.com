import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import sentry from "@sentry/astro";
import spotlightjs from "@spotlightjs/astro";
import iconify from "astro-icon";

import { iconify_opts, mdx_opts, sentry_options, sitemap_opts } from "./options";

import type { AstroUserConfig } from "astro";

type AstroConfig = NonNullable<NonNullable<AstroUserConfig["integrations"]>>;

export default [
  sentry(sentry_options),
  spotlightjs(),
  iconify(iconify_opts),
  mdx(mdx_opts),
  sitemap(sitemap_opts),
] satisfies AstroConfig;
