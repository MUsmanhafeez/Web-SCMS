module.exports = {
  parser: `@typescript-eslint/parser`,
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: `module`,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    }
  },
  settings: {
    jest: { version: 26 }
  },
  extends: [
    `standard`,
    `plugin:@typescript-eslint/eslint-recommended`,
    `plugin:@typescript-eslint/recommended`,
    `prettier-standard`,
    `prettier/@typescript-eslint`,
    `plugin:jest/recommended`
  ],
  plugins: [`@typescript-eslint/eslint-plugin`, `jest`],
  root: true,
  env: {
    node: true,
    jest: true
  },
  rules: {
    'no-unused-vars': `off`,
    '@typescript-eslint/no-unused-vars': [`off`],
    'no-useless-constructor': `off`,
    '@typescript-eslint/interface-name-prefix': `off`,
    '@typescript-eslint/explicit-function-return-type': `off`,
    '@typescript-eslint/explicit-module-boundary-types': `off`,
    '@typescript-eslint/no-explicit-any': `off`,
    'prettier/prettier': `error`,
    'linebreak-style': [`error`, `unix`],
    'no-console': [`warn`, { allow: [`warn`, `error`] }],
    quotes: [`error`, `backtick`]
  }
}
