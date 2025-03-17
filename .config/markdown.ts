// eslint-disable no-duplicate-imports
// eslint-disable curly
import { execSync } from "node:child_process";

import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import { toString as parseToString } from "mdast-util-to-string";
import getReadingTime from "reading-time";
import rehypeExternalLinks from "rehype-external-links";
import remarkEmoji from "remark-emoji";
import { visit } from "unist-util-visit";

import type { AstroUserConfig } from "astro";

type AstroConfig = NonNullable<NonNullable<AstroUserConfig["markdown"]>>;
type RemarkPlugin = NonNullable<AstroConfig["remarkPlugins"]>[number];

const remarkReadingTime: RemarkPlugin = () => {
  return (tree, file) => {
    if (file.data.astro?.frontmatter) {
      const textOnPage = parseToString(tree);
      const readingTime = getReadingTime(textOnPage);
      file.data.astro.frontmatter.words = readingTime.words;
      file.data.astro.frontmatter.duration = readingTime.text;
    }
  };
};

const remarkDeruntify: RemarkPlugin = () => (tree) => {
  visit(tree, "text", (node) => {
    const wordCount = node.value.split(" ").length;
    if (4 <= wordCount) node.value = node.value.replace(/ ([^ ]*)$/, "\u00A0$1");
  });
};

const remarkModifiedTime: RemarkPlugin = () => (_, file) => {
  const timeModified = ((path = "") => {
    try {
      if (!path) throw path;
      const output = execSync(`git log -1 --pretty="format:%cI" "${path}"`);
      return output.toString().trim() || new Date().toISOString();
    } catch {
      return new Date().toISOString();
    }
  })(file.history[0]);

  if (file.data.astro?.frontmatter) {
    file.data.astro.frontmatter.updatedAt = new Date(timeModified).toISOString();
  }
};

export default {
  remarkPlugins: [
    remarkDeruntify,
    remarkReadingTime,
    remarkModifiedTime,
    [remarkEmoji, { accessible: true, padSpaceAfter: true, emoticon: true }],
  ],
  rehypePlugins: [
    [rehypeHeadingIds, { experimentalHeadingIdCompat: true }],
    [rehypeExternalLinks, { rel: ["noopener", "noreferrer", "external"], target: "_blank" }],
  ],
} satisfies AstroConfig;
