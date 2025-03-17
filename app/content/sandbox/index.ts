import { file } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

import { img, MIN_LENGTH } from "../schema";

export const authors = defineCollection({
  loader: file("app/content/sandbox/authors.yml"),
  schema: ({ image }) =>
    z.object({
      name: z.string().min(MIN_LENGTH),
      handle: z.string().min(MIN_LENGTH),
      email: z.string().min(MIN_LENGTH).email(),
      bio: z.string().min(MIN_LENGTH).nullish(),
      role: z.string().min(MIN_LENGTH).nullish(),
      image: img(image).nullish(),
      location: z.string().min(MIN_LENGTH).nullish(),
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
    icon: z.string().min(MIN_LENGTH).nullish(),
  }),
});

export const routes = defineCollection({
  loader: file("app/content/sandbox/routes.yml"),
  schema: z.object({
    href: z.string(),
    text: z.string().min(MIN_LENGTH),
    icon: z.string().min(MIN_LENGTH),
  }),
});

export const shares = defineCollection({
  loader: file("app/content/sandbox/shares.yml"),
  schema: z.object({
    href: z.string().min(MIN_LENGTH).url(),
    text: z.string().min(MIN_LENGTH),
    icon: z.string().min(MIN_LENGTH).nullish(),
  }),
});

export const socials = defineCollection({
  loader: file("app/content/sandbox/socials.yml"),
  schema: z.object({
    href: z.string().min(MIN_LENGTH),
    text: z.string().min(MIN_LENGTH),
    icon: z.string().min(MIN_LENGTH).nullish(),
  }),
});
