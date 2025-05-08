import tailwind from "@tailwindcss/vite";
// import wasm from "vite-plugin-wasm";

import type { AstroUserConfig } from "astro";

type AstroConfig = NonNullable<AstroUserConfig["vite"]>;

export default {
  // plugins: [tailwind(), wasm()],
  plugins: [tailwind()],
  define: { __BUILD_DATE__: JSON.stringify(new Date()) },
} satisfies AstroConfig;
