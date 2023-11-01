module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-underscore-dangle': 0,
    'import/extensions': 0,
    'linebreak-style': 0,
    'object-curly-newline': 0,
    'array-callback-return': 0,
    'no-unused-vars': 0,
    'no-restricted-syntax': 0,
  },
};
