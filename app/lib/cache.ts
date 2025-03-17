import { UPSTASH_LIMIT_TOKEN, UPSTASH_LIMIT_WINDOW } from "astro:env/server";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { remember } from "@/utils/object";

const tokens = UPSTASH_LIMIT_TOKEN;
const duration = UPSTASH_LIMIT_WINDOW as Parameters<typeof Ratelimit.slidingWindow>["1"];

type R = ConstructorParameters<typeof Ratelimit>["0"]["redis"];

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv() as R,
  analytics: true,
  limiter: Ratelimit.slidingWindow(tokens, duration),
  prefix: "@upstash/ratelimit",
  ephemeralCache: remember("__rl_cache__", () => new Map()),
});
