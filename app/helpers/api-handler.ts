// eslint-disable consistent-indexed-object-style
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable no-nested-ternary
import { createErrorResponse, get_status_from_code } from "@/helpers/error";
import { println$ } from "@/helpers/println";

import type { APIContext } from "astro";

export const handler = <P extends Record<string, any>, Q extends Record<string, any>>(
  fn: (context: APIContext<P, Q>) => Promise<Response>,
) => {
  return async (ctx: APIContext<P, Q>) => {
    try {
      return fn(ctx);
    } catch (error) {
      println$(error);
      const { code, payload } = createErrorResponse(error);
      return Response.json(
        { ok: false, code, payload },
        { status: get_status_from_code(code) },
      );
    }
  };
};
