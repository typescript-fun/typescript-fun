import { sequenceS } from 'fp-ts/lib/Apply';
import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import { TypeOf } from 'io-ts';
import { createMutationEndpoint } from '../../models/api';
import { createNanoID } from '../../models/nanoid';
import { ActionOf, NanoID, Schema, User, ValidateOf } from '../../types';

const mutation = Schema.props.mutation.props.signUp;
type Mutation = TypeOf<typeof mutation>;

const validateSignUpUsedAsLogin: ValidateOf<Mutation> = input =>
  input.email === 'a@a.com' && input.password === 'aaaaaa'
    ? TE.left({ type: 'signUpUsedAsLogin' })
    : TE.right(input);

const validateEmailSuspended: ValidateOf<Mutation> = input =>
  input.email === 'b@b.com'
    ? TE.left({ type: 'suspendedEmail', reason: 'fraud' })
    : TE.right(input);

const validateEmailExists: ValidateOf<Mutation> = input =>
  input.email === 'a@a.com'
    ? TE.left({ email: ['UniqueEmail'] })
    : TE.right(input);

const createUser: ActionOf<Mutation, User> = input =>
  pipe(
    // Simulate async reading from DB.
    TE.fromEither(
      sequenceS(E.either)({
        id: createNanoID(),
        createdAt: E.right(new Date()),
      }),
    ),
    // Add what we already have.
    TE.map(props => ({
      ...props,
      company: input.company,
      email: input.email,
      phone: input.phone,
      sendNewsletter: input.sendNewsletter,
    })),
    TE.mapLeft(() => ({ type: 'httpError', status: 'internalServerError' })),
  );

const createToken: ActionOf<Mutation, NanoID> = () =>
  pipe(
    TE.fromEither(createNanoID()),
    TE.mapLeft(() => ({ type: 'httpError', status: 'internalServerError' })),
  );

const createPayload: ActionOf<Mutation, Mutation['payload']> = input =>
  // Something like Promise.all, but better.
  sequenceS(TE.taskEither)({
    user: createUser(input),
    token: createToken(input),
  });

const signUp = createMutationEndpoint(mutation, input =>
  pipe(
    validateSignUpUsedAsLogin(input),
    TE.chain(validateEmailSuspended),
    TE.chain(validateEmailExists),
    TE.chain(createPayload),
  ),
);

export default signUp;
