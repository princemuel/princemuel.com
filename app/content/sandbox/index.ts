import { file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const MIN_LENGTH = 1;

export const routes = defineCollection({
  loader: file("app/content/resources/routes.json"),
  schema: z.object({
    href: z.string().min(MIN_LENGTH),
    text: z.string().min(MIN_LENGTH),
    icon: z.string().min(MIN_LENGTH),
  }),
});
