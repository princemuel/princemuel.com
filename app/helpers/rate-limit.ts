import { invariant } from "outvariant";

import { hash } from "@/helpers/cross-platform-hash";
import { ratelimit } from "@/lib/cache";

import type { ActionAPIContext } from "astro:actions";

interface RateLimitResponse extends Awaited<ReturnType<typeof ratelimit.limit>> {
  throttle: boolean;
}

export const checkRateLimit = async (ctx: ActionAPIContext): Promise<RateLimitResponse> => {
  const request = ctx.request;
  const ipAddress = ctx.clientAddress;

  const ip = import.meta.env.DEV
    ? "anonymous"
    : (ipAddress ?? request.headers.get("x-forwarded-for"));
  invariant(ip, "No rate limiting header found for this address!");

  const address = await hash(ip);
  const result = await ratelimit.limit(address);

  return { ...result, throttle: !result.success };
};
