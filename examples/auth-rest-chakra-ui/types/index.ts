import * as TE from 'fp-ts/lib/TaskEither';
import * as t from 'io-ts';
import { DateFromNumber } from 'io-ts-types/lib/DateFromNumber';
import { either, EitherC } from 'io-ts-types/lib/either';
import { option } from 'io-ts-types/lib/option';
import {
  String64,
  Email,
  Phone,
  Password,
  VerifiedPassword,
  UniqueEmail,
} from 'typescript-fun';

// Branded types.

interface NanoIDBrand {
  readonly NanoID: unique symbol;
}
export const NanoID = t.brand(
  t.string,
  (s): s is t.Branded<string, NanoIDBrand> => s.length <= 21,
  'NanoID',
);
export type NanoID = t.TypeOf<typeof NanoID>;

// We can use t.strict which is an alias of t.exact(t.type(...)) to
// ensure DBUser password will not leak, but generally we don't want t.strict
// everywhere because https://graphql.org/learn/best-practices/#versioning.
export const User = t.strict({
  company: String64,
  email: Email,
  id: NanoID,
  createdAt: DateFromNumber,
  phone: option(Phone),
  sendNewsletter: t.boolean,
});
export type User = t.TypeOf<typeof User>;

export const DBUser = t.intersection([User, t.type({ password: Password })]);
export type DBUser = t.TypeOf<typeof DBUser>;

// Mutations.

export const LoginForm = t.type({
  email: Email,
  password: t.union([Password, VerifiedPassword]),
});
export type LoginForm = t.TypeOf<typeof LoginForm>;

export const LoginFormAsyncErrors = t.type({
  password: t.array(t.literal('VerifiedPassword')),
});

export const SuspendedEmailError = t.type({
  type: t.literal('suspendedEmail'),
  reason: t.keyof({ scam: null, fraud: null }),
});

export const LoginError = t.union([LoginFormAsyncErrors, SuspendedEmailError]);
export type LoginError = t.TypeOf<typeof LoginError>;

export const LoginPayload = t.type({
  user: User,
  token: NanoID,
});
export type LoginPayload = t.TypeOf<typeof LoginPayload>;

export const SignUpForm = t.type({
  company: String64,
  email: t.union([Email, UniqueEmail]),
  password: Password,
  phone: option(Phone),
  sendNewsletter: t.boolean,
});
export type SignUpForm = t.TypeOf<typeof SignUpForm>;

export const SignUpFormAsyncErrors = t.type({
  email: t.array(t.literal('UniqueEmail')),
});

export const SignUpError = t.union([
  SignUpFormAsyncErrors,
  SuspendedEmailError,
  t.type({ type: t.literal('signUpUsedAsLogin') }),
]);
export type SignUpError = t.TypeOf<typeof SignUpError>;

export const SignUpPayload = t.type({
  user: User,
  token: NanoID,
});
export type SignUpPayload = t.TypeOf<typeof SignUpPayload>;

// Infrastructure types.

export const HttpError = t.type({
  type: t.literal('httpError'),
  // Not everything is here, just what is used in the application.
  status: t.keyof({
    badRequest: null,
    forbidden: null,
    internalServerError: null,
    notFound: null,
    unauthorized: null,
  }),
});
export type HttpError = t.TypeOf<typeof HttpError>;

export type ApiError<E extends t.Mixed> = t.UnionC<[typeof HttpError, E]>;
export const apiError = <E extends t.Mixed>(error: E): ApiError<E> =>
  t.union([HttpError, error]);

export type Mutation<
  IP extends t.Props,
  E extends t.Mixed,
  P extends t.Mixed
> = t.TypeC<{
  input: t.TypeC<IP>;
  error: E;
  payload: P;
  apiError: ApiError<E>;
  output: EitherC<ApiError<E>, P>;
}>;
export const mutation = <
  IP extends t.Props,
  E extends t.Mixed,
  P extends t.Mixed
>(
  input: t.TypeC<IP>,
  error: E,
  payload: P,
): Mutation<IP, E, P> => {
  const ApiError = apiError(error);
  return t.type({
    input,
    error,
    payload,
    apiError: ApiError,
    output: either(ApiError, payload),
  });
};

export interface ValidateOf<M extends t.TypeOf<Mutation<any, any, any>>> {
  (input: M['input']): TE.TaskEither<M['apiError'], M['input']>;
}

export interface ActionOf<M extends t.TypeOf<Mutation<any, any, any>>, T> {
  (input: M['input']): TE.TaskEither<M['apiError'], T>;
}

// Like GraphQL schema.
export const Schema = t.type({
  mutation: t.type({
    login: mutation(LoginForm, LoginError, LoginPayload),
    signUp: mutation(SignUpForm, SignUpError, SignUpPayload),
  }),
  // The query is simpler because there are no side-effects.
  // query: t.type({
  //   getUser: query(t.type({ id: NanoID }), User),
  // }),
});
export type Schema = t.TypeOf<typeof Schema>;
