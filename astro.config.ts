// @ts-check
import { defineConfig } from "astro/config";

import netlify from "@astrojs/netlify";

import dotenv, { envVars } from "./.config/dotenv";
import flags from "./.config/experiments";
import images from "./.config/images";
import integrations from "./.config/integrations";
import markdown from "./.config/markdown";
import plugins from "./.config/plugins";

// https://astro.build/config
export default defineConfig({
  srcDir: "./app",
  site: envVars.PUBLIC_SITE_URL,
  prefetch: true,
  env: { validateSecrets: true, schema: dotenv },
  experimental: flags,
  integrations: integrations,
  session: { driver: "netlifyBlobs" },
  markdown: markdown,
  vite: plugins,
  image: images,
  adapter: netlify({ cacheOnDemandPages: true, imageCDN: true }),
});
