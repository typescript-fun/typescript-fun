import * as TE from 'fp-ts/lib/TaskEither';
import * as E from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import { pipe } from 'fp-ts/lib/pipeable';
import { NextApiRequest, NextApiResponse } from 'next';
import { HttpError } from '../types';

export const createMutationEndpoint = <
  P extends {
    input: t.Mixed;
    error: t.Mixed;
    apiError: t.Mixed;
    payload: t.Mixed;
    output: t.Mixed;
  }
>(
  mutation: t.TypeC<P>,
  callback: (
    input: t.TypeOf<P['input']>,
  ) => TE.TaskEither<t.TypeOf<P['apiError']>, t.TypeOf<P['payload']>>,
) => (req: NextApiRequest, res: NextApiResponse) => {
  const decode = (): E.Either<HttpError, t.TypeOf<P['payload']>> =>
    pipe(
      mutation.props.input.decode(req.body),
      // Map t.Errors to 'badRequest'. It should not happen because of the client validation,
      // but when it does, it means the client is outdated or buggy and must be updated.
      E.mapLeft(() => ({ type: 'httpError', status: 'badRequest' })),
    );
  pipe(
    // Here we can authenticate etc.
    TE.fromEither(decode()),
    TE.chain(callback),
  )().then(output => {
    const json = mutation.props.output.encode(output);
    // It's common practice to use 200 for all GraphQL like requests.
    res.status(200).json(json);
  });
};
