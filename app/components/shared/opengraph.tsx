import { readFile } from "node:fs/promises";

import satori from "satori";
import sharp from "sharp";

import type { CollectionEntry } from "astro:content";
import type { h } from "preact";

const Image = (props: CollectionEntry<"drafts">): h.JSX.Element => (
  <div tw="flex flex-col w-full h-full p-12 items-center text-center justify-center text-white bg-indigo-500">
    <div tw="flex font-bold text-8xl mb-4">{props.data.title}</div>
    <div tw="flex text-5xl mb-12">{props.data.description}</div>
  </div>
);

const png = async (el: h.JSX.Element) => {
  return await sharp(Buffer.from(await svg(el)))
    .png()
    .toBuffer();
};

const svg = async (el: h.JSX.Element) => {
  return await satori(el, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Outfit",
        data: await readFile("./src/assets/fonts/og/Outfit-Regular.ttf"),
        weight: 400,
      },
    ],
  });
};

export { png };
export default Image;
