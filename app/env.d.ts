/// <reference types="unplugin-fonts/client" />
/// <reference types="vite-plugin-pwa/vanillajs" />
/// <reference types="vite-plugin-pwa/info" />
/// <reference types="vite-plugin-pwa/pwa-assets" />
/// <reference types="../.astro/icon.d.ts" />

type ImportMetaEnv = Record<string, string>;
type NetlifyLocals = import("@astrojs/netlify").NetlifyLocals;

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals extends NetlifyLocals {}
}

declare const __BUILD_DATE__: string;
