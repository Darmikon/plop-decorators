import fs from 'fs';
import path from 'path';
import { NodePlopAPI } from 'node-plop';

export const withGenerators = (plop: NodePlopAPI, generatorsFolder?: string) => {
  process.chdir(plop.getPlopfilePath());
  const folder =
    generatorsFolder === undefined || generatorsFolder === null ? 'generators' : generatorsFolder;
  const normalizedPath = path.join(process.cwd(), folder);

  fs.readdirSync(normalizedPath).forEach((file) => {
    const generator = require(path.resolve(process.cwd(), folder, file));
    if (generator.default) {
      generator.default(plop);
    } else {
      generator(plop);
    }
  });
};
