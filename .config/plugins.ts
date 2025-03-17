import tailwind from "@tailwindcss/vite";

import type { AstroUserConfig } from "astro";

type AstroConfig = NonNullable<AstroUserConfig["vite"]>;

export default {
  plugins: [tailwind()],
  define: { __BUILD_DATE__: JSON.stringify(new Date()) },
} satisfies AstroConfig;
