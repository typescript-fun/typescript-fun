import * as t from 'io-ts';

export const InternalUrl = t.union([
  t.strict({ pathname: t.literal('/cz') }),
  t.strict({ pathname: t.literal('/blog') }),
  t.strict({ pathname: t.literal('/blog'), query: t.strict({ id: t.string }) }),
]);
export type InternalUrl = t.TypeOf<typeof InternalUrl>;

export const ExternalUrl = t.keyof({
  'https://github.com/typescript-fun/five-minutes-demo': null,
  'https://github.com/typescript-fun/typescript-fun': null,
  'https://github.com/typescript-fun/typescript-fun/issues/new': null,
  'https://www.youtube.com/watch?v=PLFl95c-IiU': null,
  'https://vimeo.com/97344498': null,
  'https://www.youtube.com/watch?v=cxs7oLGrxQ4&t=39m9s': null,
  'https://twitter.com/steida': null,
  'https://twitter.com/robinpokorny': null,
  'https://twitter.com/estejs': null,
  'mailto:daniel@steigerwald.cz': null,
});
export type ExternalUrl = t.TypeOf<typeof ExternalUrl>;

export const Url = t.union([InternalUrl, ExternalUrl]);
export type Url = t.TypeOf<typeof Url>;
