import * as t from 'io-ts';

export const InternalUrl = t.union([
  t.strict({ pathname: t.literal('/blog') }),
  t.strict({ pathname: t.literal('/blog'), query: t.strict({ id: t.string }) }),
]);
export type InternalUrl = t.TypeOf<typeof InternalUrl>;

export const ExternalUrl = t.keyof({
  'https://github.com/typescript-fun/five-minutes-demo': null,
});
export type ExternalUrl = t.TypeOf<typeof ExternalUrl>;

export const Url = t.union([InternalUrl, ExternalUrl]);
export type Url = t.TypeOf<typeof Url>;
