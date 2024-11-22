import { handler } from "@/helpers/api-handler";

import { DARK_VISITORS_TOKEN } from "astro:env/server";

export const GET = handler(async (ctx) => {
  const request = ctx.request;

  fetch("https://api.darkvisitors.com/visits", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DARK_VISITORS_TOKEN}`,
    },
    body: JSON.stringify({
      request_path: request.url,
      request_method: request.method,
      request_headers: request.headers,
    }),
  }).catch(() => {});

  return new Response("Ping!", { status: 200 });
});
