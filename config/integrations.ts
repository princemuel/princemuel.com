import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import sentry from "@sentry/astro";
import spotlightjs from "@spotlightjs/astro";

import type { AstroUserConfig } from "astro";

type AstroConfig = NonNullable<NonNullable<AstroUserConfig["integrations"]>>;

export default [sentry(), spotlightjs(), mdx(), sitemap()] satisfies AstroConfig;
