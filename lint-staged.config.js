module.exports = {
  'src/**/*.{js,jsx,ts,tsx}': [
    'prettier --write',
    'eslint --fix',
    'jest --bail --findRelatedTests',
  ],
  // 'src/**/*.scss': ['stylelint --syntax scss --fix'],
};
