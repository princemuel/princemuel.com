import { handler } from "@/helpers/api-handler";

import { DARK_VISITORS_TOKEN } from "astro:env/server";

export const GET = handler(async (ctx) => {
  const response = await fetch("https://api.darkvisitors.com/robots-txts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DARK_VISITORS_TOKEN}`,
    },
    signal: AbortSignal.timeout(20000),
    body: JSON.stringify({
      disallow: "/",
      agent_types: ["AI Data Scraper", "Undocumented AI Agent", "AI Assistant"],
    }),
  });

  const text = response.ok ? await response.text() : "";

  const robotsTxt = [
    "# I, for one, welcome our new robotic overlords",
    "User-Agent: *\nAllow: /\nDisallow: /api/",
    "# Block AI Bots",
    text,
    `Sitemap: ${new URL("/", ctx.site)}sitemap-index.html`,
  ];

  return new Response(robotsTxt.join("\n\n").trim(), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=UTF-8",
      "Cache-Control": "public, max-age=604800, immutable",
    },
  });
});
