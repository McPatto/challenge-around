import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import jsxRuntime from "react/jsx-runtime";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { jsxRuntime },
  },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  {
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off"
    },
  },
];
