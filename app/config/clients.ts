import { createClient } from "@libsql/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { PrismaClient } from "@prisma/client";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Octokit } from "octokit";
import { Resend } from "resend";

import {
  DATABASE_TOKEN,
  DATABASE_URL,
  OCTOKIT_TOKEN,
  RESEND_TOKEN,
  UPSTASH_LIMIT_TOKEN,
  UPSTASH_LIMIT_WINDOW,
} from "astro:env/server";

import { singleton } from "@/utilities/objects";

// https://github.com/octokit/octokit.js/#readme
export const octokit = new Octokit({ auth: OCTOKIT_TOKEN });
export const resend = new Resend(RESEND_TOKEN);

export const db = singleton("__prisma__", () => {
  const libsql = createClient({
    url: DATABASE_URL,
    authToken: DATABASE_TOKEN,
  });
  const adapter = new PrismaLibSQL(libsql);
  return new PrismaClient({ adapter });
});

// export const getConnection = singleton("_db_", () => {
//   const client = new PrismaClient();
//   void client.$connect();
//   return {
//     db: client,
//     [Symbol.asyncDispose]: () => {
//       void client.$disconnect();
//     },
//   };
// });

const tokens = UPSTASH_LIMIT_TOKEN;
const duration = UPSTASH_LIMIT_WINDOW as Parameters<typeof Ratelimit.slidingWindow>[1];

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv() as unknown as ConstructorParameters<
    typeof Ratelimit
  >[0]["redis"],
  analytics: true,
  limiter: Ratelimit.slidingWindow(tokens, duration),
  prefix: "@upstash/ratelimit",
  ephemeralCache: singleton("__rl_cache__", () => new Map<string, number>()),
});
