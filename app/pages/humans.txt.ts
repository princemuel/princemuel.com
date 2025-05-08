import { handleApi } from "@/helpers/handle-api";

export const GET = handleApi(async (ctx) => {
  const updatedAt = new Intl.DateTimeFormat("en-CA").format(new Date()).replaceAll("-", "/");

  const text = [
    "This website was built by Samuel Chukwuzube!",
    `/* TEAM */\nChef: Samuel Chukwuzube\nContact: ${new URL("say-hello", ctx.site)}\nTwitter: @iamprincemuel\nLocation: Lagos, Nigeria`,
    `/* SITE */\nLast update: ${updatedAt}\nDoctype: HTML5\nLanguage: English / French\nStandards: HTML5, CSS3, ES2023\nIDE: Neovim, Visual Studio Code, Figma\nComponents: TailwindCSS, Javascript etc.\nSoftware: Astrojs, MDX`,
    "Checkout the https://humanstxt.org/ protocol to see how you should format your humans.txt file!",
  ]
    .join("\n\n")
    .trim();

  return new Response(text, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=UTF-8",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
});
