import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";

import { baseSchema } from "../schema";

export default defineCollection({
  loader: glob({
    base: "app/content/projects",
    pattern: "**/[^_]*.{md,mdx}",
  }),
  schema: ({ image }) => baseSchema.extend({}),
});
