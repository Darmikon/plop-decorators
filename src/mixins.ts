import { TMixins } from './types';

/*
 * https://github.com/amwmedia/plop#case-modifiers
 * */
export const mixins: TMixins = {
  // camelCase:             changeFormatToThis
  // snakeCase:             change_format_to_this
  // dashCase/kebabCase:    change-format-to-this
  // dotCase:               change.format.to.this
  // pathCase:              change/format/to/this
  // properCase/pascalCase: ChangeFormatToThis
  // lowerCase:             change format to this
  // sentenceCase:          Change format to this,
  // constantCase:          CHANGE_FORMAT_TO_THIS
  // titleCase:             Change Format To This
};
