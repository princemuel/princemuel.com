import { UPSTASH_LIMIT_WINDOW } from "astro:env/server";
import { invariant } from "outvariant";

import { hash } from "@/helpers/cross-platform-hash";
import { println$ } from "@/helpers/println";
import { ratelimiter } from "@/lib/cache";

import type { MiddlewareHandler } from "astro";

export const ratelimit: MiddlewareHandler = async ({ request, locals }, next) => {
  if (!request.url.includes("/api/")) return next();

  try {
    const ip = import.meta.env.DEV
      ? "anonymous"
      : request.headers.get("x-nf-client-connection-ip") ||
        request.headers.get("x-forwarded-for");

    invariant(ip, "No rate limiting header found for this address!");

    const address = await hash(ip);
    const { success, limit, remaining, reset } = await ratelimiter.limit(address);

    locals.ratelimit = {
      limit,
      remaining,
      reset,
      throttle: !success,
    };

    if (!success) {
      return new Response("Rate limit exceeded. Try again later.", {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
          "Retry-After": UPSTASH_LIMIT_WINDOW.toString(),
        },
      });
    }

    const response = await next();
    const result = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: new Headers(response.headers),
    });
    result.headers.set("X-RateLimit-Limit", limit.toString());
    result.headers.set("X-RateLimit-Remaining", remaining.toString());
    result.headers.set("X-RateLimit-Reset", reset.toString());
    return result;
  } catch (error) {
    println$(error);
    return next();
  }
};
