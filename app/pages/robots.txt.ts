import { handler } from "@/helpers/api-handler";
import { DARK_VISITORS_TOKEN } from "astro:env/server";

const defaultAgents = ["User-agent: ChatGPT-User", "User-agent: PerplexityBot"];
const matcher = /^User-agent:.*/iu;

export const GET = handler(async (ctx) => {
  const response = await fetch("https://api.darkvisitors.com/robots-txts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${DARK_VISITORS_TOKEN}`,
      "Content-Type": "application/json",
    },
    signal: AbortSignal.timeout(20000),
    body: JSON.stringify({
      disallow: "/",
      agent_types: [
        "AI Data Scraper",
        "Undocumented AI Agent",
        "AI Assistant",
        "AI Search Crawler",
      ],
    }),
  });

  const text = response.ok ? await response.text() : "";

  console.log(text);

  const agents = [
    ...new Set([
      ...defaultAgents,
      ...text.split("\n").filter((line) => matcher.test(line.trim())),
    ]),
  ];

  const robotsTxt = [
    "# I, for one, welcome our new robotic overlords",
    "User-Agent: *\nAllow: /\nDisallow: /api/",
    "# Block AI Bots",
    `${agents.map((a) => `${a}\nDisallow: /`).join("\n\n")}`,
    `Sitemap: ${new URL("/", ctx.site).toString()}sitemap-index.html`,
  ];

  return new Response(robotsTxt.join("\n\n").trim(), {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=UTF-8" },
  });
});
