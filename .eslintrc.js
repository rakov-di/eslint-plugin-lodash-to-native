module.exports = {
  env: {
    browser: true,
    es6: true,
    commonjs: true,
    node: true
  },
  plugins: ['eslint-plugin-local-rules'],
  plugins: ['lodash-to-native'],
  // extends: [
  //   "standard"
  // ],
  // extends: [
  //   "./node_modules/eslint-plugin-local-rules/lib/rules/map.js"
  // ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    'lodash-to-native/map': 'warn',
    // 'local-rules/no-bad-await': 'error',
    // 'local-rules/map': 'warn',
    "linebreak-style": "off",
    "operator-linebreak": ["error", "before"],
    "semi": ["error", "always"],
    "no-var": "error",
    "space-before-function-paren": ["error", "never"],
    "arrow-parens": ["error", "as-needed"],
    "brace-style": ["error", "stroustrup", { "allowSingleLine": true }],
    "no-new": "off",
    "no-case-declarations": "off",
    "no-prototype-builtins": "off",
    "no-return-assign": "off",
    "prefer-promise-reject-errors": "off",
  }
};
