import { inferRemoteSize } from "astro:assets";
import { z, type ImageFunction } from "astro:content";

import { println$ } from "@/lib/utils/println";

export const MIN_LENGTH = 2;

export const baseSchema = z.object({
  title: z.string().min(MIN_LENGTH),
  summary: z.string().min(MIN_LENGTH).optional(),
  description: z.string().min(MIN_LENGTH),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  category: z.string().min(MIN_LENGTH),
  draft: z.boolean().default(true),
  publishedAt: z.date(),
  updatedAt: z.date().optional(),
  duration: z.string().default("1 min read"),
  words: z.number().finite().int().nonnegative().lte(65_535).default(200),
  language: z.enum(["en", "es", "fr"]).default("en"),
  permalink: z.string().url().optional(),
});

export const img = (fn: ImageFunction) =>
  z
    .string()
    .url()
    .regex(/^https:.*/)
    .transform(async (url) => {
      let image_meta = {} as ImageMetadata;
      try {
        const metadata = await inferRemoteSize(url);

        image_meta = { ...image_meta, src: url, ...metadata };
      } catch (error) {
        println$("IMAGE_TRANSFORM_ERROR>>>>>>>", error);

        image_meta = {
          ...image_meta,
          src: url,
          width: 1200,
          height: 630,
          format: "jpg",
        } satisfies ImageMetadata;
      }
      return image_meta;
    })
    .or(fn());
