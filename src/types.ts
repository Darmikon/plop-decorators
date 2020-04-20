import { ActionType, CustomActionFunction } from 'node-plop';

export type TMixins = {
  [key: string]: (arg0: string) => string;
};

export type TActions = {
  [key: string]: (userMixins: TMixins) => CustomActionFunction;
};

type WithTemplateOrFile<T> =
  | (T & {
      /**
       * Handlebars template to be used for the entry.
       */
      template: string;
      /**
       * Path to a file containing the `template`.
       */
      templateFile?: string;
    })
  | (T & {
      /**
       * Handlebars template to be used for the entry.
       */
      template?: string;
      /**
       * Path to a file containing the `template`.
       */
      templateFile: string;
    });

type TConfigPrependData = WithTemplateOrFile<{
  pattern: string;
  path: string;
}>;

export type TConfigPrepend = TConfigPrependData & ActionType<any>;
