import netlify from "@astrojs/netlify";
import tw from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

import { envSchema } from "./config/env-schema";
import { integrations } from "./config/integrations";
import { rehypePlugins, remarkPlugins } from "./config/remark-rehype";

const mode = process.env.NODE_ENV ?? "production";
const envVars = loadEnv(mode, process.cwd(), "");

// https://astro.build/config
// eslint-disable-next-line no-default-export
export default defineConfig({
  output: "static",
  srcDir: "./app",
  site: envVars.PUBLIC_SITE_URL,
  env: { validateSecrets: true, schema: envSchema },
  experimental: {
    // svg: { mode: "sprite" },
    session: true,
    responsiveImages: true,
    contentIntellisense: true,
    serializeConfig: true,
  },
  session: { driver: "netlifyBlobs" },
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
      // { protocol: "https", hostname: "**.github.com" },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "princemuel/metadata/main/assets/*", // Use regex for all files in "assets"
      },
    ],
  },
  vite: { plugins: [tw()], define: { __BUILD_DATE__: JSON.stringify(new Date()) } },
  adapter: netlify({ imageCDN: true, cacheOnDemandPages: true }),
});
