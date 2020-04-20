![GitHub package.json version](https://img.shields.io/github/package-json/v/darmikon/plop-decorators) ![npm](https://img.shields.io/npm/v/plop-decorators) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

### plop-decorators

Helpers for [plopjs generator](http://plopjs.com/)

Inculde 3 decorators: `withHelpers`, `withActions`, `withGenerators`

- `withHelpers` - to add extra functions to .hbs templates
- `withActions` - automatically adds `prepend` action and allows to add custom actions.
  If you created customHelpers don't forget to add them to `withActions` so that `prepend`
  action could work properly with your functions.
- `withGenerators` - by default searches for every files in `.plop/generators` folder

Include 1 custom action `prepend`
The action injects the replacement before the market and not after

#### API

1. Create `index.js` inside `.plop` folder of root directory

```
const { withHelpers, withActions, withGenerators } = require('plop-helpers');

global.cwd = process.cwd();

const customHelpers = {};
const customActions = {};

module.exports = plop => {
  withHelpers(plop, customHelpers);
  withActions(plop, customActions, customHelpers);
  withGenerators(plop);
};
```

2. Create generator files inside `.plop/generators` folder e.g.

```
module.exports = plop =>
  plop.setGenerator('epic', {
    description: 'Epic Injection',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Epic Name',
      },
      {
        type: 'input',
        name: 'moduleName',
        message: 'Into module:',
      },
    ],
    actions: [
      // EPIC
      {
        type: 'prepend',
        path: `${cwd}/src/{{moduleName}}/epics.js`,
        pattern: '//†epic',
        template: `export const {{camelCase name}}Epic = (action$, state$) =>
  of('MOCK').pipe(ignoreElements());`,
      },
    ],
  });
```

3. In `package.json` add the next command to `scripts` section:

```
"scripts": {
    "gen": "plop --plopfile .plop/index.js",
    ...
}
```

4. Run

```
yarn gen
```
