import { file } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

import { img, MIN_LENGTH } from "@/content/schema";

import type { Icon } from "virtual:astro-icon";

export const authors = defineCollection({
  loader: file("app/content/sandbox/authors.yml"),
  schema: ({ image }) =>
    z.object({
      name: z.string().min(MIN_LENGTH),
      handle: z.string().min(MIN_LENGTH),
      email: z.string().min(MIN_LENGTH).email(),
      bio: z.string().min(MIN_LENGTH).optional(),
      role: z.string().min(MIN_LENGTH).optional(),
      image: img(image).optional(),
      location: z.string().min(MIN_LENGTH).optional(),
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

export const labels = defineCollection({
  loader: file("app/content/sandbox/labels.yml"),
  schema: z.object({
    text: z.string().min(MIN_LENGTH),
    icon: z.string().min(MIN_LENGTH),
  }),
});

export const routes = defineCollection({
  loader: file("app/content/sandbox/routes.yml"),
  schema: z.object({
    href: z.string(),
    text: z.string().min(MIN_LENGTH),
    // icon: z.string().min(MIN_LENGTH),
    icon: z.custom<Icon>((val) => "string" === typeof val),
  }),
});

export const shares = defineCollection({
  loader: file("app/content/sandbox/shares.yml"),
  schema: z.object({
    href: z.string().min(MIN_LENGTH).url(),
    text: z.string().min(MIN_LENGTH),
    icon: z.string().min(MIN_LENGTH).optional(),
  }),
});

export const socials = defineCollection({
  loader: file("app/content/sandbox/socials.yml"),
  schema: z.object({
    href: z.string().min(MIN_LENGTH),
    text: z.string().min(MIN_LENGTH),
    icon: z.string().min(MIN_LENGTH),
  }),
});
