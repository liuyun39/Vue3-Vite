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
  plugins: ["vue", "@typescript-eslint", "import"],
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
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
    /**
     *  eslint: http://eslint.cn/docs/rules/
     *  TS:     https://typescript-eslint.io/rules/explicit-module-boundary-types/#rule-details
     *  Vue:    https://eslint.vuejs.org/rules/
     */

    // js/ts
    "semi": ["error", "always"],
    "no-extra-semi": "off",
    "quotes": ["error", "double"],
    "no-console": ["warn", { allow: ["error"] }],
    "no-restricted-syntax": ["error", "LabeledStatement", "WithStatement"],
    "camelcase": ["error", { properties: "never" }],
    "indent": "off",
    "space-before-function-paren": "off",
    "no-var": "error",
    "no-empty": ["error", { allowEmptyCatch: true }],
    "no-void": "error",
    "prefer-const": ["warn", { destructuring: "all", ignoreReadBeforeAssign: true }],
    "prefer-template": "error",
    "object-shorthand": ["error", "always", { ignoreConstructors: false, avoidQuotes: true }],
    "block-scoped-var": "error",
    "no-constant-condition": ["error", { checkLoops: false }],
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",

    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/quotes": ["error", "double"],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
    "@typescript-eslint/consistent-type-imports": ["error", { disallowTypeAnnotations: false }],
    "@typescript-eslint/no-empty-interface": "error",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "interface",
        format: ["PascalCase"],
        custom: {
          regex: "^I[A-Z]",
          match: true
        }
      }
    ],

    "@typescript-eslint/member-delimiter-style": [
      "warn",
      {
        multiline: {
          delimiter: "semi",
          requireLast: true
        },
        singleline: {
          delimiter: "semi",
          requireLast: false
        },
        multilineDetection: "brackets"
      }
    ],

    // Vue
    "vue/comment-directive": "off",
    "vue/multi-word-component-names": "off",
    "vue/no-multiple-template-root": "off",
    "vue/no-v-html": "off",
    "vue/require-default-prop": "off",
    "vue/require-explicit-emits": "off",
    "vue/html-indent": ["error", 4],
    "vue/mustache-interpolation-spacing": ["error", "always"],
    "vue/script-indent": ["error", "tab", {
      "baseIndent": 0,
      "switchCase": 0,
      "ignores": []
    }],
    // TODO
    "vue/html-closing-bracket-newline": [
      "error",
      {
        "singleline": "never",
        "multiline": "never"
      }
    ],
    "vue/component-name-in-template-casing": [
      "error",
      "PascalCase",
      {
        registeredComponentsOnly: true,
        ignores: []
      }
    ],
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: 1,
        multiline: { max: 1 }
      }
    ],

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
  }
};
