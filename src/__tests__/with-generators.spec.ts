import { withGenerators } from '../with-generators';

jest.mock('fs');

describe('with-generators', function () {
  const plop = 'PLOP';

  it('should initialize each generator in destination folder', () => {
    const generatorName = 'generator';
    const fs = require('fs');
    jest.spyOn(fs, 'readdirSync').mockImplementation(() => [generatorName]);
    const generator = require('../__mocks__/' + generatorName);
    const spyGenerator = jest.spyOn(generator, 'default');

    // @ts-ignore
    withGenerators(plop, '__mocks__');
    expect(spyGenerator).toHaveBeenCalledWith(plop);
  });
});
