// eslint-disable consistent-indexed-object-style

// eslint-disable no-nested-ternary
import { toHttpErrorResponse } from "@/helpers/error";
import { println$ } from "@/helpers/println";

import type { APIContext } from "astro";

export const handleApi = <P extends Record<string, any>, Q extends Record<string, any>>(
  fn: (context: APIContext<P, Q>) => Promise<Response>,
) => {
  return async (ctx: APIContext<P, Q>) => {
    try {
      return await fn(ctx);
    } catch (error) {
      println$(error);
      const { code, status, payload } = toHttpErrorResponse(error);
      return Response.json({ ok: false, code, payload }, { status });
    }
  };
};
