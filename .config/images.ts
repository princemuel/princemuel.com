import type { AstroUserConfig } from "astro";

type AstroConfig = NonNullable<NonNullable<AstroUserConfig["image"]>>;

export default {
  experimentalLayout: "responsive",
  remotePatterns: [
    { protocol: "https", hostname: "**.unsplash.com" },
    { protocol: "https", hostname: "**.github.com" },
    {
      protocol: "https",
      hostname: "raw.githubusercontent.com",
      port: "",
      pathname: "princemuel/metadata/main/assets/*", // Use regex for all files in "assets"
    },
  ],
} satisfies AstroConfig;
