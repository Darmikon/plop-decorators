import { NodePlopAPI } from 'node-plop';
import { TActions, TMixins } from './types';
import { actionPrepend } from './action-prepend';

export const withActions = (
  plop: NodePlopAPI,
  userActions: TActions = {},
  userMixins: TMixins = {}
) => {
  // @ts-ignore
  plop.setActionType('prepend', actionPrepend(userMixins));

  const actions = Object.keys(userActions);
  actions.forEach((action) => {
    plop.setActionType(action, userActions[action](userMixins));
  });
};
