"use strict";

module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "jest", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:jest/recommended",
    "plugin:node/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
  ],

  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  ignorePatterns: ["dist/*", "scripts/*"],
  overrides: [
    {
      files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/camelcase": "off",
        "node/no-unpublished-require": "off",
        "node/no-missing-require": [
          "error",
          {
            tryExtensions: [".js", ".json", ".node", ".ts"],
          },
        ],
        "node/no-missing-import": [
          "error",
          {
            tryExtensions: [".js", ".json", ".node", ".ts"],
          },
        ],
        "prettier/prettier": "error",
      },
    },
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "import/extensions": "off",
        "no-useless-constructor": "off",
        "no-restricted-syntax": "off",
        "node/no-unsupported-features/es-syntax": "off",
      },
    },
  ],
};
