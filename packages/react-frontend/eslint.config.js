import js from "@eslint/js";
import react from "eslint-plugin-react";
import globals from "globals";

export default [
  {
    ignores: ["dist", "node_modules"],
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    settings: {
      react: { version: "detect" },
    },
    plugins: {
      react,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      // Optional: warn instead of error for common issues
      "no-unused-vars": [
        "warn",
        { vars: "all", args: "after-used", ignoreRestSiblings: true },
      ],
    },
  },
];
