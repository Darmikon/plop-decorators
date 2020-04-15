module.exports = {
  // https://eslint.org/docs/user-guide/configuring#specifying-environments
  env: {
    es2020: true,
    node: true,
    commonjs: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  plugins: ['@typescript-eslint'],
  extends: [
    'standard', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  // https://eslint.org/docs/user-guide/configuring
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  overrides: [
    {
      files: ['**/*.spec.ts', '**/*.spec.js'],
      env: {
        jest: true, // now **/*.spec files' env has both es2020 and jest
      },
    },
  ],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off”,
    'linebreak-style': 0,
    'prefer-const': 0,
    'spaced-comment': 0,
    'padded-blocks': 0,
    'import/imports-first': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'comma-dangle': 0,
    'no-shadow': 0,
    'arrow-body-style': 0,
    'quote-props': 0,
    // https://github.com/typescript-eslint/typescript-eslint/issues/379
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/recommended.json
    // 'no-unused-vars': 1,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'consistent-return': 0,
    'max-len': 0,
    'no-use-before-define': ['error', { functions: false, classes: true }],
    'no-underscore-dangle': 'off',
    'no-throw-literal': 'error',
    'no-bitwise': ['off'],
    'dot-notation': ['off'],
    'prettier/prettier': ['error'],
    camelcase: ['off'],
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.vue', '.ts', '.tsx'],
      },
    },
  },
};
