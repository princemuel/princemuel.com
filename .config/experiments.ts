import type { AstroUserConfig } from "astro";

type AstroConfig = NonNullable<NonNullable<AstroUserConfig["experimental"]>>;

export default {
  // svg: { mode: "sprite" },
  session: true,
  clientPrerender: true,
  responsiveImages: true,
  contentIntellisense: true,
  serializeConfig: true,
  headingIdCompat: true,
  preserveScriptOrder: true,
} satisfies AstroConfig;
