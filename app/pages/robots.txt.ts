import { DARK_VISITORS_TOKEN } from "astro:env/server";

import { handleApi } from "@/helpers/handle-api";

export const GET = handleApi(async (ctx) => {
  const response = await fetch("https://api.darkvisitors.com/robots-txts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DARK_VISITORS_TOKEN}`,
    },
    signal: AbortSignal.timeout(20_000),
    body: JSON.stringify({
      disallow: "/",
      agent_types: ["AI Data Scraper", "Undocumented AI Agent", "AI Assistant"],
    }),
  });

  const result = response.ok ? await response.text() : "";

  const text = [
    "# I, for one, welcome our new robotic overlords",
    "User-Agent: *\nAllow: /\nDisallow: /api/",
    "# Block AI Bots",
    result,
    `Sitemap: ${new URL("sitemap-index.html", ctx.site)}`,
  ]
    .join("\n\n")
    .trim();

  return new Response(text, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=UTF-8",
      "Cache-Control": "public, max-age=604800, immutable",
    },
  });
});
