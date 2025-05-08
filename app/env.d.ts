/// <reference types="vite-plugin-pwa/vanillajs" />
/// <reference types="vite-plugin-pwa/info" />
/// <reference types="vite-plugin-pwa/pwa-assets" />
/// <reference types="../.astro/icon.d.ts" />

type NetlifyLocals = import("@astrojs/netlify").NetlifyLocals;

declare namespace App {
  interface Locals extends NetlifyLocals {
    auth: { startTime: number };
    ratelimit: { limit: number; remaining: number; reset: number; throttle: boolean };
    botinfo: { isBot: boolean };
  }
  interface SessionData {
    id: string;
    email: string;
    updatedAt: Date;
  }
}

declare const __BUILD_DATE__: string;
