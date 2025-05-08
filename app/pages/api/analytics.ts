import { PUBLIC_SITE_URL } from "astro:env/client";
import { z } from "astro:schema";
import { BadRequestError } from "http-errors-enhanced";

import { handleApi } from "@/helpers/handle-api";

export const prerender = false;

const schema = z.object({
  url: z.string(),
  referrer: z.string(),
  flag: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
});

export const POST = handleApi(async ({ request }) => {
  const response = await Promise.all([
    request.json(),
    fetch(new URL("geolocation", PUBLIC_SITE_URL)),
  ]);

  const parsed = schema.safeParse(Object.assign({}, ...response));
  if (!parsed.success) throw new BadRequestError(parsed.error.message);

  // await db.analytics.create({ data: parsed.data });
  return Response.json({
    ok: true,
    payload: "Analytics data sent successfully",
  });
});

export const ALL = handleApi(
  async ({ request }) =>
    new Response(`HTTP method ${request.method} not allowed`, {
      status: 405,
    }),
);
