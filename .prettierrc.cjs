// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  tailwindFunctions: ["tw", "cn", "tv"],
  tailwindAttributes: ["tw"],
  plugins: [
    require.resolve("prettier-plugin-astro"),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
  overrides: [
    {
      files: ["*.json"],
      options: { trailingComma: "es5" },
    },
    {
      files: "*.astro",
      options: { parser: "astro" },
    },
  ],
};

module.exports = config;
