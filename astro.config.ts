// @ts-check
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

import netlify from "@astrojs/netlify";
import tw from "@tailwindcss/vite";

import dotenv from "./config/dotenv";
import flags from "./config/experiments";
import images from "./config/images";
import integrations from "./config/integrations";
import markdown from "./config/markdown";

const mode = process.env.NODE_ENV ?? "production";
const envVars = loadEnv(mode, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  srcDir: "./app",
  site: envVars.PUBLIC_SITE_URL,
  env: { validateSecrets: true, schema: dotenv },
  experimental: flags,
  integrations: integrations,
  session: { driver: "netlifyBlobs" },
  markdown: markdown,
  vite: { plugins: [tw()], define: { __BUILD_DATE__: JSON.stringify(new Date()) } },
  image: images,
  adapter: netlify({ cacheOnDemandPages: true }),
});
