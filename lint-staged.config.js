module.exports = {
  'src/**/*.{js,jsx,ts,tsx}': [
    'prettier --write',
    'eslint --fix',
    'jest --bail --findRelatedTests',
    'git add',
  ],
  // 'src/**/*.scss': ['stylelint --syntax scss --fix', 'git add'],
};
