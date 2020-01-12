import * as t from 'io-ts';

// Typed routing. For example, we can use ExternalUrl.is for runtime logic.
// We can also decode complex URL queries to safe types. It's neat.

export const InternalUrl = t.union([
  t.literal('/'),
  t.literal('/cz'),
  t.literal('/examples'),
  t.literal('/examples/signup-form-react-native-web'),
  t.literal('/blog'),
  t.strict({ pathname: t.literal('/blog'), query: t.strict({ id: t.string }) }),
]);
export type InternalUrl = t.TypeOf<typeof InternalUrl>;

export const ExternalUrl = t.keyof({
  'https://five-minutes-demo.now.sh': null,
  'https://github.com/typescript-fun/typescript-fun': null,
  'https://github.com/typescript-fun/typescript-fun/issues/new': null,
  'https://www.youtube.com/watch?v=PLFl95c-IiU': null,
  'https://vimeo.com/97344498': null,
  'https://www.youtube.com/watch?v=cxs7oLGrxQ4&t=39m9s': null,
  'https://twitter.com/steida': null,
  'https://twitter.com/robinpokorny': null,
  'https://twitter.com/estejs': null,
  'mailto:daniel@steigerwald.cz': null,
  'https://docs.google.com/forms/d/e/1FAIpQLSfBXCXIQIXUKF2FyM7Vrpywj-aRjZc_QBXM5Pg5AQSIcAJ7Uw/viewform': null,
});
export type ExternalUrl = t.TypeOf<typeof ExternalUrl>;

export const Url = t.union([InternalUrl, ExternalUrl]);
export type Url = t.TypeOf<typeof Url>;
