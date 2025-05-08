import { fontProviders } from "astro/config";

import type { AstroUserConfig } from "astro";

type AstroConfig = NonNullable<NonNullable<AstroUserConfig["experimental"]>>;

export default {
  clientPrerender: true,
  responsiveImages: true,
  contentIntellisense: true,
  headingIdCompat: true,
  preserveScriptOrder: true,
  fonts: [
    {
      name: "Open Sans",
      provider: fontProviders.google(),
      cssVariable: "--font-family-sans",
      subsets: ["latin"],
      fallbacks: [
        "ui-sans-serif",
        "system-ui",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
    },
    {
      name: "Source Code Pro",
      provider: fontProviders.google(),
      cssVariable: "--font-family-mono",
      subsets: ["latin"],
      fallbacks: [
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        "'Liberation Mono'",
        "'Courier New'",
        "monospace",
      ],
    },
  ],
} satisfies AstroConfig;
