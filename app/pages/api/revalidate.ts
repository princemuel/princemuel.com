import { purgeCache } from "@netlify/functions";
import { WEBHOOK_SECRET } from "astro:env/server";
import { z } from "astro:schema";
import { BadRequestError } from "http-errors-enhanced";

import { handleApi } from "@/helpers/handle-api";

export const prerender = false;

const schema = z.object({ id: z.string() });

export const POST = handleApi(async ({ request }) => {
  if (request.headers.get("X-Webhook-Secret") !== WEBHOOK_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) throw new BadRequestError("Invalid data received");
  const result = parsed.data;

  await purgeCache({ tags: [result.id] });

  return new Response(`Revalidated entry with id ${result.id}`, {
    status: 202,
  });
});

export const ALL = handleApi(
  async ({ request }) =>
    new Response(`HTTP method ${request.method} not allowed`, {
      status: 405,
    }),
);
