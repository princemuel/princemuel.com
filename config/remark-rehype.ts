import { execSync } from "node:child_process";

import {
  type RehypePlugins,
  type RemarkPlugin,
  type RemarkPlugins,
  rehypeHeadingIds,
} from "@astrojs/markdown-remark";
import { toString as parseToString } from "mdast-util-to-string";
import getReadingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import remarkEmoji from "remark-emoji";
// eslint-disable-next-line max-dependencies
import { visit } from "unist-util-visit";

const remarkReadingTime: RemarkPlugin = () => {
  return (tree, file) => {
    const textOnPage = parseToString(tree);
    const readingTime = getReadingTime(textOnPage);
    //@ts-expect-error frontmatter typed as any or unknown
    file.data.astro.frontmatter.words = readingTime.words;
    //@ts-expect-error frontmatter typed as any or unknown
    file.data.astro.frontmatter.duration = readingTime.text;
  };
};

const remarkDeruntify: RemarkPlugin = () => (tree) => {
  visit(tree, "text", (node) => {
    const wordCount = node.value.split(" ").length;

    if (4 <= wordCount) {
      node.value = node.value.replace(/ ([^ ]*)$/, "\u00A0$1");
    }
  });
};

const remarkModifiedTime: RemarkPlugin = () => (_, file) => {
  const timeModified = ((path = "") => {
    if (!path) return Date.now();
    const output = execSync(`git log -1 --pretty="format:%cI" "${path}"`);
    return output.toString().trim() || Date.now();
  })(file.history?.[0]);

  console.log("timeModified", timeModified);

  //@ts-expect-error frontmatter typed as any or unknown
  file.data.astro.frontmatter.updatedAt = new Date(timeModified).toISOString();
};

export const remarkPlugins: RemarkPlugins = [
  remarkDeruntify,
  remarkReadingTime,
  remarkModifiedTime,
  [remarkEmoji, { accessible: true, padSpaceAfter: true }],
];

export const rehypePlugins: RehypePlugins = [
  rehypeHeadingIds,
  // [rehypeSectionHeadings, { sectionDataAttribute: "data-id", maxHeadingRank: 2 }],
  [
    rehypeAutolinkHeadings,
    { behavior: "wrap", properties: { class: "linked" } },
    // properties: { class: "linked", ariaHidden: "", tabIndex: -1 },
  ],
  [
    rehypeExternalLinks,
    { rel: ["noopener", "noreferrer", "external"], target: "_blank" },
  ],
];
