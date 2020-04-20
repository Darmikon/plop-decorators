import fs from 'fs';
import path from 'path';
import { NodePlopAPI } from 'node-plop';

export const withGenerators = (plop: NodePlopAPI, generatorsFolder?: string) => {
  const folder =
    generatorsFolder === undefined || generatorsFolder === null ? 'generators' : generatorsFolder;
  const normalizedPath = path.join(__dirname, folder);

  console.log(normalizedPath);
  fs.readdirSync(normalizedPath).forEach((file) => {
    require(path.resolve(__dirname, folder, file)).default(plop);
  });
};
