import { z } from "astro:content";

export const baseSchema = z.object({
  title: z.string().min(2),
  summary: z.string().min(2).optional(),
  description: z.string().min(2),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  category: z.string().min(2),
  draft: z.boolean().default(true),
  publishedAt: z.date(),
  updatedAt: z.date().optional(),
  duration: z.string().default("1 min read"),
  words: z.number().finite().int().nonnegative().lte(65_535).default(200),
  language: z.enum(["en", "es", "fr"]).default("en"),
  permalink: z.string().url().optional(),
});
