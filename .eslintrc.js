module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
    parser: "@typescript-eslint/parser",
    ecmaFeatures: {
      jsx: true,
      tsx: true
    }
  },
  plugins: ["@typescript-eslint", "prettier", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
    "prettier"
  ],
  overrides: [
    {
      files: ["*.ts", "*.vue"],
      rules: {
        "no-undef": "off"
      }
    },
    {
      files: ["**/__tests__/**", "**/gulpfile.ts"],
      rules: {
        "no-console": "off"
      }
    }
  ],
  rules: {
    // js/ts
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "no-console": ["warn", { allow: ["error"] }],
    "no-restricted-syntax": ["error", "LabeledStatement", "WithStatement"],
    camelcase: ["error", { properties: "never" }],

    "no-var": "error",
    "no-empty": ["error", { allowEmptyCatch: true }],
    "no-void": "error",
    "prefer-const": ["warn", { destructuring: "all", ignoreReadBeforeAssign: true }],
    "prefer-template": "error",
    "object-shorthand": ["error", "always", { ignoreConstructors: false, avoidQuotes: true }],
    "block-scoped-var": "error",
    "no-constant-condition": ["error", { checkLoops: false }],

    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
    "@typescript-eslint/consistent-type-imports": ["error", { disallowTypeAnnotations: false }],

    // Vue
    "vue/multi-word-component-names": "off",
    "vue/no-multiple-template-root": "off",
    "vue/no-v-html": "off",
    "vue/require-default-prop": "off",
    "vue/require-explicit-emits": "off",

    // import
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "import/first": "error",
    "import/no-duplicates": "error",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],

        pathGroups: [
          {
            pattern: "vue",
            group: "external",
            position: "before"
          },
          {
            pattern: "@vue/**",
            group: "external",
            position: "before"
          },
          {
            pattern: "@element-plus/**",
            group: "internal"
          }
        ],
        pathGroupsExcludedImportTypes: ["type"]
      }
    ],

    // prettier
    "prettier/prettier": "error" // TODO
  }
};
