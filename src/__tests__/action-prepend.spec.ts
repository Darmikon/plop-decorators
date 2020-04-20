import handlebars from 'handlebars';
import { actionPrepend } from '../action-prepend';
import fs from 'fs';
import { TMixins } from '../types';

jest.mock('fs');

describe('action-prepend', () => {
  let helpers: TMixins;
  let renderString: (template: string, data: any) => string;

  beforeAll(() => {
    helpers = {
      toLower: (str: string): string => str.toLowerCase(),
    };
    renderString = (template: string, data: any): string => {
      Object.keys(helpers).forEach((h) => handlebars.registerHelper(h, helpers[h]));
      return handlebars.compile(template)(data);
    };
  });

  it('should perform string injection by template', () => {
    const answers = {
      name: 'dAtA',
    };
    const config = {
      type: 'prepend',
      path: `/src/{{toLower name}}/reducer.js`,
      pattern: '//†type',
      template: `'~GET_{{toLower name}}',`,
    };
    const plop = {
      renderString: jest.fn(renderString),
      getPlopfilePath: () => '__dirname',
    };
    jest.spyOn(global.process, 'chdir').mockImplementation(jest.fn);
    const userMixins = {};

    jest
      .spyOn(fs, 'readFileSync')
      // @ts-ignore
      .mockImplementation((filePath: string) => {
        if (filePath === '/src/data/reducer.js') {
          return {
            toString: () => {
              return `__BEFORE__ //†type', __AFTER__`;
            },
          };
        }
      });
    const spyWriteFileSync = jest
      .spyOn(fs, 'writeFileSync')
      .mockImplementation((destination, newContent) => ({
        destination,
        newContent,
      }));

    // @ts-ignore
    const res = actionPrepend(userMixins)(answers, config, plop);

    const expected = `__BEFORE__ '~GET_data', //†type', __AFTER__`;
    const expectedDestination = `/src/data/reducer.js`;

    expect(spyWriteFileSync).toHaveBeenCalledWith(expectedDestination, expected);
    expect(res).toEqual('//†type success');
  });

  it('should perform string injection by template from template file', () => {
    const answers = {
      name: 'dAtA',
    };
    const config = {
      type: 'prepend',
      path: `/src/{{toLower name}}/reducer.js`,
      pattern: '//†type',
      templateFile: `templates/TEMPLATE.hbs`,
    };
    const plop = {
      renderString: jest.fn(renderString),
      getPlopfilePath: () => '__dirname',
    };
    const templateFile = `'~GET_{{toLower name}}',`;
    jest.spyOn(global.process, 'chdir').mockImplementation(jest.fn);
    const userMixins = {};

    jest
      .spyOn(fs, 'readFileSync')
      // @ts-ignore
      .mockImplementation((filePath: string) => {
        if (filePath === '/src/data/reducer.js') {
          return {
            toString: () => {
              return `__BEFORE__ //†type', __AFTER__`;
            },
          };
        }

        if (filePath === config.templateFile) {
          return {
            toString() {
              return templateFile;
            },
          };
        }
      });
    const spyWriteFileSync = jest
      .spyOn(fs, 'writeFileSync')
      .mockImplementation((destination, newContent) => ({
        destination,
        newContent,
      }));

    // @ts-ignore
    const res = actionPrepend(userMixins)(answers, config, plop);

    const expected = `__BEFORE__ '~GET_data', //†type', __AFTER__`;
    const expectedDestination = `/src/data/reducer.js`;

    expect(spyWriteFileSync).toHaveBeenCalledWith(expectedDestination, expected);
    expect(res).toEqual('//†type success');
  });
});
