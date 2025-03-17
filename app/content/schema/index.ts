import type { ImageMetadata } from "astro";
import { z, type ImageFunction } from "astro:content";

export const MIN_LENGTH = 2;

export const baseSchema = z.object({
  title: z.string().min(MIN_LENGTH),
  summary: z.string().min(MIN_LENGTH).nullish(),
  description: z.string().min(MIN_LENGTH),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  category: z.string().min(MIN_LENGTH),
  draft: z.boolean().default(true),
  publishedAt: z.date(),
  updatedAt: z.date().nullish(),
  duration: z.string().default("1 min read"),
  words: z.number().finite().int().nonnegative().lte(65_535).default(200),
  language: z.enum(["en", "es", "fr"]).default("en"),
  permalink: z.string().url().nullish(),
});

export const img = (fn: ImageFunction) =>
  z
    .string()
    .url()
    .regex(/^https:.*/)
    .transform(
      (url) =>
        ({
          src: url,
          width: 1200,
          height: 630,
          format: "jpg",
        }) satisfies ImageMetadata,
    )
    .or(fn());
