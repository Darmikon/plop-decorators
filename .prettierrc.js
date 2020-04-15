module.exports = {
  singleQuote: true,
  // to not break non-transpiled code
  trailingComma: 'es5',
  overrides: [
    {
      files: 'src/**/*.js',
      options: {
        trailingComma: 'all',
      },
    },
  ],
  printWidth: 100,
  tabWidth: 2
};
