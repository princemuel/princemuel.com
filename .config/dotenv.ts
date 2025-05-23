import { envField } from "astro/config";
import { loadEnv } from "vite";

import type { AstroUserConfig } from "astro";

type AstroConfig = NonNullable<NonNullable<AstroUserConfig["env"]>["schema"]>;

const z = envField;

const mode = process.env.NODE_ENV ?? "production";

export const envVars = loadEnv(mode, process.cwd(), "");

export default {
  ASTRO_KEY: z.string({ context: "server", access: "secret" }),
  DARK_VISITORS_TOKEN: z.string({ context: "server", access: "secret" }),
  DATABASE_TOKEN: z.string({ context: "server", access: "secret" }),
  DATABASE_URL: z.string({ context: "server", access: "secret" }),
  DATABASE_ENCRYPTION_KEY: z.string({ context: "server", access: "secret" }),

  GOOGLE_DRIVE_TOKEN: z.string({ context: "server", access: "secret" }),
  GOOGLE_DRIVE_FILE_ID: z.string({ context: "server", access: "secret" }),

  OCTOKIT_TOKEN: z.string({ context: "server", access: "secret" }),
  OCTOKIT_URL: z.string({ context: "server", access: "secret", url: true }),
  OCTOKIT_USERNAME: z.string({ context: "server", access: "secret" }),
  OCTOKIT_VERSION: z.string({ context: "server", access: "secret" }),

  PUBLIC_SITE_URL: z.string({ context: "client", access: "public", url: true }),

  RESEND_ADDRESS: z.string({ context: "server", access: "secret" }),
  RESEND_AUDIENCE: z.string({ context: "server", access: "secret" }),
  RESEND_TOKEN: z.string({ context: "server", access: "secret" }),

  WEBHOOK_SECRET: z.string({ context: "server", access: "secret" }),
  SITE_STATUS: z.enum({
    access: "secret",
    context: "server",
    values: ["construction", "maintenance", "downtime", "live"],
  }),

  UPSTASH_REDIS_REST_TOKEN: z.string({ context: "server", access: "secret" }),
  UPSTASH_LIMIT_TOKEN: z.number({
    context: "server",
    int: true,
    access: "secret",
  }),
  UPSTASH_LIMIT_WINDOW: z.string({ context: "server", access: "secret" }),
  UPSTASH_REDIS_REST_URL: z.string({
    access: "secret",
    url: true,
    context: "server",
  }),

  WAKATIME_TOKEN: z.string({ context: "server", access: "secret" }),
} satisfies AstroConfig;
