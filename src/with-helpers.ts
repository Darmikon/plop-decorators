import { NodePlopAPI } from 'node-plop';
import { TMixins } from './types';
import { mixins } from './mixins';

export const withHelpers = (plop: NodePlopAPI, userMixins: TMixins = {}) => {
  const helpers = { ...mixins, ...userMixins };
  const keys = Object.keys(helpers);
  keys.forEach((k) => plop.setHelper(k, helpers[k]));
};
