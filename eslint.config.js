// @ts-check

import js from "@eslint/js";
import ts from "typescript-eslint";

import oxlint from "eslint-plugin-oxlint";
import prettier_recommended from "eslint-plugin-prettier/recommended";

import astro from "eslint-plugin-astro";

const config = ts.config(
  js.configs.recommended,
  ts.configs.strict,
  ts.configs.stylistic,
  ...oxlint.buildFromOxlintConfigFile(".oxlintrc.json"),
  ...astro.configs.recommended,
  ...astro.configs["jsx-a11y-strict"],
  prettier_recommended,
);

export default config;
