module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:vue/essential', 'airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    semi: [2, 'always'],
    'quote-props': 0,
    quotes: 0,
    'comma-dangle': 0,
    'no-unused-vars': 1,

    // Vue
    'vue/multi-word-component-names': 0,
    'vue/no-multiple-template-root': 0,

    // import
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,

    // prettier
    "prettier/prettier": [0, 'semi'] // TODO
  }
};
