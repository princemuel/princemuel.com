import type { FontStyle, FontWeight } from "satori";

export type FontOptions = {
  name: string;
  data: ArrayBuffer;
  weight: FontWeight | undefined;
  style: FontStyle | undefined;
  font?: string;
};

export async function googleFonts(
  text: string,
  config: Required<Omit<FontOptions, "data">>[],
) {
  const requests = config.map(async ({ name, font, weight, style }) => {
    const data = await googleFont(font, text);
    return { name, data, weight, style };
  });

  return Promise.all(requests);
}

async function googleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURI(text)}`;

  const css = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
    },
  }).then((r) => r.text());

  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);
  if (!resource || !resource[1]) throw new Error("Failed to download dynamic font");

  const response = await fetch(resource[1]);
  if (!response.ok)
    throw new Error(`Failed to download dynamic font. Status: ${response.status}`);

  return response.arrayBuffer();
}
