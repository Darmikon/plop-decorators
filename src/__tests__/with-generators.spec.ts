import path from 'path';
import { withGenerators } from '../with-generators';

jest.mock('fs');

describe('with-generators', function () {
  const plop = {
    getPlopfilePath: () => '__dirname',
  };

  it('should initialize each generator in destination folder', () => {
    const generatorName = 'generator';
    const fs = require('fs');
    jest.spyOn(global.process, 'chdir').mockImplementation(jest.fn);
    jest.spyOn(global.process, 'cwd').mockImplementation(() => path.resolve('./src/__tests__'));
    jest.spyOn(fs, 'readdirSync').mockImplementation(() => [generatorName]);
    const generator = require('./__mocks__/' + generatorName);
    const spyGenerator = jest.spyOn(generator, 'default');

    // @ts-ignore
    withGenerators(plop, '__mocks__');
    expect(spyGenerator).toHaveBeenCalledWith(plop);
  });
});
