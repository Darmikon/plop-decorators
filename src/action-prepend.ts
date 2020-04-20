import fs from 'fs';
import { NodePlopAPI } from 'node-plop';
import { mixins } from './mixins';
import { TConfigPrepend, TMixins } from './types';

export const actionPrepend = (userMixins: TMixins = {}) => (
  answers: object,
  config: TConfigPrepend,
  plop: NodePlopAPI
) => {
  let { templateFile, template, path, pattern } = config;
  const regEx = new RegExp(`(\\s*|\\t*)(${pattern})`, 'g');

  // move the current working directory to the plop file path
  // this allows this action to work even when the generator is
  // executed from inside a subdirectory
  process.chdir(plop.getPlopfilePath());

  const data = {
    ...mixins,
    ...userMixins,
    ...answers,
  };

  const destination = plop.renderString(path, data);
  if (!fs.readFileSync(destination)) {
    throw new Error(`No such file: ${destination}`);
  }

  if (templateFile) {
    if (!fs.readFileSync(templateFile)) {
      throw new Error(`No such file: ${templateFile}`);
    }
    template = fs.readFileSync(templateFile).toString().replace(/\n$/, '');
  }

  let newContent = fs.readFileSync(destination).toString();
  const replacement = plop.renderString(template || '', data);

  newContent = newContent.replace(regEx, `$1${replacement}$1$2`);

  fs.writeFileSync(destination, newContent);

  return `${pattern} success`;
};
