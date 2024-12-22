type ImageProps =
  | import("astro:assets").LocalImageProps
  | import("astro:assets").RemoteImageProps;
type ImageSrc = ImageProps["src"];

interface Robots {
  noindex?: boolean;
  nofollow?: boolean;
  nosnippet?: boolean;
}

interface Meta {
  title: [value: string, absolute?: boolean];
  description: string;
  keywords?: string[];
  image?: string;
  canonical?: string | URL;
  type?: OpenGraph["type"];
  publishedAt?: ConstructorParameters<typeof Date>[0];
  updatedAt?: ConstructorParameters<typeof Date>[0];
  robots?: Robots;
  language?: "en" | "fr" | "es";
  includeOg?: boolean;
}
interface OpenGraph {
  type?: "website" | "article" | "book" | "profile";
}
interface Twitter {
  handle?: string;
  card?: "summary" | "summary_large_image";
}

type IResource = "projects" | "articles" | "blog";
