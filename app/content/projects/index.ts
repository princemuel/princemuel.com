import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

import { baseSchema, img, MIN_LENGTH } from "../schema";

const ps = [
  "game",
  "website",
  "app",
  "template",
  "plugin",
  "library",
  "docs",
  "tool",
  "resource",
  "design",
  "service",
  "script",
  "theme",
  "widget",
  "component",
  "hardware",
  "cli",
] as const;

export default defineCollection({
  loader: glob({
    base: "app/content/projects",
    pattern: "**/[^_]*.{md,mdx}",
  }),
  schema: ({ image }) =>
    baseSchema.extend({
      genre: z.enum(ps).default("app"),
      image: img(image).nullish(),
      author: reference("authors"),
      technologies: z.array(z.string()).default([]),
      contributors: z.array(reference("authors")).default([]),
      status: z
        .enum(["concept", "planned", "in-progress", "completed", "archived"])
        .default("planned"),
      links: z
        .array(
          z.object({
            label: reference("labels"),
            url: z.string().min(MIN_LENGTH).url(),
          }),
        )
        .default([]),
    }),
});
