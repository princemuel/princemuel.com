import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import {
  UPSTASH_LIMIT_TOKEN,
  UPSTASH_LIMIT_WINDOW,
  UPSTASH_REDIS_REST_TOKEN,
  UPSTASH_REDIS_REST_URL,
} from "astro:env/server";

import { remember } from "@/utils/object";

const tokens = UPSTASH_LIMIT_TOKEN;
const window = UPSTASH_LIMIT_WINDOW as Parameters<typeof Ratelimit.slidingWindow>["1"];

const redis = new Redis({
  url: UPSTASH_REDIS_REST_URL,
  token: UPSTASH_REDIS_REST_TOKEN,
}) as ConstructorParameters<typeof Ratelimit>["0"]["redis"];

export const ratelimiter = new Ratelimit({
  redis: redis,
  analytics: true,
  limiter: Ratelimit.slidingWindow(tokens, window),
  prefix: "@upstash/ratelimit",
  ephemeralCache: remember("__rl_cache__", () => new Map()),
});
