import { WAKATIME_TOKEN } from "astro:env/server";
import { z } from "astro:schema";
import { BadRequestError, NotFoundError } from "http-errors-enhanced";

import { handleApi } from "@/helpers/handle-api";

export const prerender = false;

const schema = z.object({
  data: z.object({
    text: z.string(),
    is_up_to_date: z.boolean(),
    range: z.object({ start: z.string() }),
  }),
});

export const GET = handleApi(async () => {
  const url = "https://api.wakatime.com/api/v1/users/current/all_time_since_today";
  const api_key = Buffer.from(WAKATIME_TOKEN).toString("base64");
  const response = await fetch(url, {
    headers: { Authorization: `Basic ${api_key}` },
  });
  if (!response.ok) throw new NotFoundError("Failed to fetch resource");

  const parsed = schema.safeParse(await response.json());
  if (!parsed.success) throw new BadRequestError("Invalid data");
  const result = parsed.data.data;

  const payload = {
    total_time: result.text.replace(",", ""),
    is_up_to_date: result.is_up_to_date,
    since: new Date(result.range.start).toLocaleDateString(undefined, {
      month: "short",
      year: "numeric",
    }),
  };

  return Response.json({ ok: true, code: 200, payload }, { status: 200 });
});
