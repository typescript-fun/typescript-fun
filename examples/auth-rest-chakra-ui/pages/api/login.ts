import { sequenceS } from 'fp-ts/lib/Apply';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import * as T from 'fp-ts/lib/Task';
import * as TE from 'fp-ts/lib/TaskEither';
import * as t from 'io-ts';
import { createMutationEndpoint } from '../../models/api';
import { createNanoID } from '../../models/nanoid';
import {
  ActionOf,
  DBUser,
  NanoID,
  Schema,
  User,
  ValidateOf,
} from '../../types';

const mutation = Schema.props.mutation.props.login;
type Mutation = t.TypeOf<typeof mutation>;

const validateEmailSuspended: ValidateOf<Mutation> = input =>
  input.email === 'b@b.com'
    ? TE.left({ type: 'suspendedEmail', reason: 'fraud' })
    : TE.right(input);

const db: t.OutputOf<typeof DBUser>[] = [
  {
    company: 'Foo',
    createdAt: 1577490785044,
    email: 'a@a.com',
    id: 'D3ZB5kvctkBJVRbte1dkl',
    password: 'aaaaaa',
    phone: O.some('123123'),
    sendNewsletter: false,
  },
];

// Simulate (slow) loading User from DB by email.
const loadUser: ActionOf<Mutation, User> = input =>
  T.delay(500)(
    pipe(
      User.decode(
        db.find(u => u.email === input.email && u.password === input.password),
      ),
      TE.fromEither,
      TE.mapLeft(() => ({ password: ['VerifiedPassword'] })),
    ),
  );

const createToken: ActionOf<Mutation, NanoID> = () =>
  pipe(
    TE.fromEither(createNanoID()),
    TE.mapLeft(() => ({ type: 'httpError', status: 'internalServerError' })),
  );

const createPayload: ActionOf<Mutation, Mutation['payload']> = input =>
  sequenceS(TE.taskEither)({
    user: loadUser(input),
    token: createToken(input),
  });

const login = createMutationEndpoint(mutation, input =>
  pipe(validateEmailSuspended(input), TE.chain(createPayload)),
);

export default login;
