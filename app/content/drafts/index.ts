import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";

import { baseSchema } from "@/content/schema";

export default defineCollection({
  loader: glob({
    base: "app/content/drafts",
    pattern: "**/[^_]*.{md,mdx}",
  }),
  schema: baseSchema.extend({}),
});
