import netlify from "@astrojs/netlify";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

import { envSchema } from "./config/env-schema";
import { integrations } from "./config/integrations";
import { rehypePlugins, remarkPlugins } from "./config/remark-rehype";

const mode = process.env.NODE_ENV ?? "production";
const envVars = loadEnv(mode, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  output: "static",
  srcDir: "./app",
  site: envVars.PUBLIC_SITE_URL,
  env: { validateSecrets: true, schema: envSchema },
  experimental: {
    svg: { mode: "sprite" },
    responsiveImages: true,
    contentIntellisense: true,
  },
  markdown: {
    syntaxHighlight: "shiki",
    remarkPlugins: remarkPlugins,
    rehypePlugins: rehypePlugins,
  },
  integrations: [...integrations],
  image: {
    experimentalLayout: "responsive",
    remotePatterns: [
      { protocol: "https", hostname: "**.unsplash.com" },
      { protocol: "https", hostname: "**.github.com" },
    ],
  },
  vite: { define: { __BUILD_DATE__: JSON.stringify(new Date()) } },
  adapter: netlify({ cacheOnDemandPages: true }),
});
