import { MediaObject, baseSchema } from "@/schema/content";

import { file, glob } from "astro/loaders";

import { defineCollection, reference, z } from "astro:content";

import type { Icon } from "virtual:astro-icon";

const posts = defineCollection({
  loader: glob({
    base: "app/content/posts",
    pattern: "**/[^_]*.{md,mdx}",
  }),
  schema: ({ image }) =>
    baseSchema.extend({
      author: reference("authors"),
      contributors: z.array(reference("authors")).default([]),
      media: MediaObject(image).optional(),
      // publication: reference("publications").optional(),
      others: z.array(reference("posts")).default([]),
    }),
});

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
] as const;

const projects = defineCollection({
  loader: glob({
    base: "app/content/projects",
    pattern: "**/[^_]*.{md,mdx}",
  }),
  schema: ({ image }) =>
    baseSchema.extend({
      kind: z.enum(ps).default("app"),
      author: reference("authors"),
      tools: z.array(z.string()).default([]),
      media: MediaObject(image).optional(),
      status: z
        .enum(["planned", "in-progress", "completed", "archived"])
        .default("planned"),
      link: z
        .object({
          site: z.string().url().optional(),
          repo: z.string().url().optional(),
        })
        .default({}),
    }),
});

const journal = defineCollection({
  loader: glob({
    base: "app/content/journal",
    pattern: "**/[^_]*.{md,mdx}",
  }),
  schema: z.object({
    title: z.string().min(2),
    description: z.string().min(2),
    draft: z.boolean().default(true),
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    duration: z.string().default("1 min read"),
    words: z.number().finite().int().nonnegative().lte(65535).default(200),
    language: z.enum(["en", "es", "fr"]).default("en"),
    permalink: z.string().url().optional(),
  }),
});

const changelog = defineCollection({
  loader: glob({
    base: "app/content/changelog",
    pattern: "**/[^_]*.{md,mdx}",
  }),
  schema: z.object({
    title: z.string().min(2),
    description: z.string().min(2),
    author: reference("authors"),
    version: z.string().min(1),
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
  }),
});

const authors = defineCollection({
  loader: file("app/content/resources/authors.json"),
  schema: z.object({
    alternate: z.string().min(1).max(255).optional(),
    name: z.string().min(1).max(255).optional(),
    links: z.object({
      url: z.string().url().optional(),
      email: z.string().email().optional(),
      avatar: z.string().optional(),
      social: z.record(z.string().min(1), z.string().url()).optional(),
    }),
  }),
});

const categories = defineCollection({
  loader: file("app/content/resources/categories.json"),
  schema: z.object({ name: z.string().min(1) }),
});

const publications = defineCollection({
  loader: file("app/content/resources/publications.json"),
  schema: z.object({
    name: z.string().min(1),
    image: z.string().optional(),
    url: z.string().url(),
  }),
});

const routes = defineCollection({
  loader: file("app/content/resources/routes.json"),
  schema: z.object({
    href: z.string().min(1),
    text: z.string().min(1),
    icon: z.custom<Icon>((value) => value && typeof value === "string"),
  }),
});

const socials = defineCollection({
  loader: file("app/content/resources/socials.json"),
  schema: z.object({
    href: z.string().min(1),
    text: z.string().min(1),
    icon: z.custom<Icon>((value) => value && typeof value === "string"),
  }),
});

export const collections = {
  routes,
  authors,
  publications,
  categories,
  socials,
  journal,
  posts,
  projects,
  changelog,
};
