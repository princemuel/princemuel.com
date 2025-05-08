import { GOOGLE_DRIVE_FILE_ID, GOOGLE_DRIVE_TOKEN } from "astro:env/server";
import { NotFoundError } from "http-errors-enhanced";

import { handleApi } from "@/helpers/handle-api";

export const GET = handleApi(async () => {
  const fileId = GOOGLE_DRIVE_FILE_ID;
  const searchParams = new URLSearchParams([
    ["mimeType", "application/pdf"],
    ["key", GOOGLE_DRIVE_TOKEN],
  ]);

  const response = await fetch(
    new URL(
      `export?${searchParams.toString()}`,
      `https://www.googleapis.com/drive/v3/files/${fileId}/`,
    ),
    { signal: AbortSignal.timeout(20_000) },
  );

  if (!response.ok) throw new NotFoundError("Failed to fetch resource");

  const buffer = Buffer.from(await response.arrayBuffer());

  return new Response(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=princemuel-resume",
      "Cache-Control": "public, max-age=604800, immutable",
    },
  });
});
