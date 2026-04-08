import js from "@eslint/js"
import astro from "eslint-plugin-astro"
import globals from "globals"
import tseslint from "typescript-eslint"

export default [
  {
    ignores: [
      "node_modules/**",
      "astro/node_modules/**",
      "astro/.astro/**",
      "astro/dist/**",
      "output/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs["flat/recommended"],
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ["astro/public/**/*.js"],
    languageOptions: {
      globals: globals.serviceworker,
    },
  },
  {
    files: ["astro/src/**/*.{ts,js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.{ts,astro}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-empty": ["error", { allowEmptyCatch: true }],
    },
  },
]
