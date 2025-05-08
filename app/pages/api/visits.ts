// eslint-disable prefer-await-to-then
import { DARK_VISITORS_TOKEN } from "astro:env/server";

import { handleApi } from "@/helpers/handle-api";

export const prerender = false;

export const GET = handleApi(async ({ request }) => {
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
  }).catch(() => {
    /* do nothing. */
  });

  return new Response("Ping!", { status: 200 });
});
