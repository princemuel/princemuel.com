//@ts-check
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { defineEcConfig } from "astro-expressive-code";
import twDefaultTheme from "tailwindcss/defaultTheme.js";

const fonts = {
  mono: ["Cascadia Code", ...twDefaultTheme.fontFamily.mono],
  sans: ["Noto Sans Variable", ...twDefaultTheme.fontFamily.sans],
};

export default defineEcConfig({
  themes: ["vitesse-dark", "vitesse-light"],
  plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
  useThemedSelectionColors: false,
  useThemedScrollbars: true,
  cascadeLayer: "shiki",
  emitExternalStylesheet: true,
  themeCssSelector: (theme) => `[data-mode='${theme.name}']`,
  defaultProps: { showLineNumbers: true },
  styleOverrides: {
    codeFontFamily: fonts.mono.join(","),
    uiFontFamily: fonts.sans.join(","),
    // borderWidth: "1px",
  },
});
