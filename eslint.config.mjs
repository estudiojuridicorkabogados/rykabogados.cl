import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    // optional: ignore common output dirs
    ignores: ["./node_modules/**", ".next/**", "dist/**"],
  },
  {
    // files: ["src/**/*.{js,jsx,ts,tsx}"],

    extends: compat.extends("next/core-web-vitals", "prettier"),

    plugins: {
      "simple-import-sort": simpleImportSort,
    },

    rules: {
      "import/newline-after-import": [
        "error",
        {
          count: 1,
        },
      ],

      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react", "^@?\\w"],
            ["^(@)(/.*|$)"],
            ["^\\u0000"],
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ["^.+\\.?(css)$"],
          ],
        },
      ],

      "simple-import-sort/exports": "error",
    },
  },
]);
