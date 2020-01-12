import * as E from 'fp-ts/lib/Either';
import { absurd, constVoid } from 'fp-ts/lib/function';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import * as t from 'io-ts';
import { useCallback, useState, useRef, useEffect } from 'react';
import { HttpError, Schema } from '../types';
import { Form, useForm } from './useForm';

type PostError =
  | { type: 'fetch'; message: string }
  | { type: 'unknownResponse' };

const post = (url: string, body: object): TE.TaskEither<PostError, unknown> =>
  TE.tryCatch(
    () =>
      fetch(`/api/${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }).then(response => response.json()),
    reason => ({ type: 'fetch', message: String(reason) }),
  );

// When server response can't be decoded or is bad request error.
const handleClientServerMismatch = () => {
  if (confirm('Your app is outdated. Please confirm auto update.')) {
    // Never do this automatically.
    location.reload(true);
  }
};

export const useMutation = <
  N extends keyof Schema['mutation'],
  M extends typeof Schema['props']['mutation']['props'][N]
>(
  name: N,
  initialState: t.OutputOf<M['props']['input']>,
  {
    handleError,
    handleSuccess,
  }: {
    handleError?: (
      error: t.TypeOf<M['props']['error']>,
      form: Form<M['props']['input']['props']>,
    ) => void;
    handleSuccess?: (
      payload: t.TypeOf<M['props']['payload']>,
      form: Form<M['props']['input']['props']>,
    ) => void;
  },
): {
  form: Form<M['props']['input']['props']>;
  isPending: boolean;
} => {
  const [isPending, setIsPending] = useState(false);
  const mutation = Schema.props.mutation.props[name];
  const inputMutation = mutation.props.input;
  const formRef = useRef<Form<M['props']['input']['props']>>();

  const handleApiError = useCallback(
    (error: t.TypeOf<M['props']['apiError']>) => {
      // Handling a mutation error is the caller responsibility.
      if (mutation.props.error.is(error)) {
        if (handleError && formRef.current) handleError(error, formRef.current);
        return;
      }
      // Handle the rest of API errors.
      if (HttpError.is(error)) {
        switch (error.status) {
          case 'badRequest':
            handleClientServerMismatch();
            break;
          case 'forbidden':
            alert(error.status);
            break;
          case 'internalServerError':
            alert(error.status);
            break;
          case 'notFound':
            alert(error.status);
            break;
          case 'unauthorized':
            alert(error.status);
            break;
          default:
            absurd(error.status);
        }
      }
    },
    [handleError, mutation.props.error],
  );

  const handlePostError = useCallback((error: PostError) => {
    switch (error.type) {
      case 'fetch':
        alert(
          `Please check your network connection. Error message: ${error.message}`,
        );
        break;
      case 'unknownResponse':
        handleClientServerMismatch();
        break;
      default:
        absurd(error);
    }
  }, []);

  const submit = useCallback(
    (form: Form<typeof inputMutation['props']>) => (
      data: t.TypeOf<M['props']['input']>,
    ) => {
      if (isPending) return;
      setIsPending(true);
      form.disable();

      // Note how we handle all errors in one place at the end.
      // Note how we need only `.then` because there is no catch with TaskEither.
      post(name, data)().then(posted => {
        pipe(
          // We have E.Either<PostError, unknown>.
          posted,
          // On success, try to decode a response to typed output.
          E.chain(response => {
            // Either chaining needs explicit types.
            // https://github.com/gcanti/fp-ts/issues/904
            const decoded: E.Either<
              t.Errors,
              t.TypeOf<M['props']['output']>
            > = Schema.props.mutation.props[name].props.output.decode(response);
            return pipe(
              decoded,
              // Map internal t.Errors error to unknownResponse error.
              E.mapLeft<t.Errors, PostError>(() => ({
                type: 'unknownResponse',
              })),
            );
          }),
          // We successfully posted, we successfully decoded a response, and now
          // we can add server apiError to the left or payload to the right.
          E.chain(
            (
              output: E.Either<
                PostError | t.TypeOf<M['props']['apiError']>,
                t.TypeOf<M['props']['payload']>
              >,
            ) =>
              pipe(
                output,
                E.fold(
                  error => E.left(error),
                  payload => E.right(payload),
                ),
              ),
          ),
          // At the end, we have all errors or successfully decoded payload.
          E.fold(
            error => {
              setIsPending(false);
              form.enable();
              if (mutation.props.apiError.is(error)) {
                handleApiError(error);
                return;
              }
              handlePostError(error);
            },
            payload => {
              setIsPending(false);
              form.enable();
              if (handleSuccess && formRef.current)
                handleSuccess(payload, formRef.current);
            },
          ),
        );
      });
    },
    [
      handleApiError,
      handlePostError,
      handleSuccess,
      inputMutation,
      isPending,
      mutation.props.apiError,
      name,
    ],
  );

  const handleSubmit = useCallback(
    (form: Form<typeof inputMutation['props']>) => {
      pipe(form.validated, E.fold(constVoid, submit(form)));
    },
    [inputMutation, submit],
  );

  // TODO: Investigate why `as any` is required.
  const form = useForm(inputMutation as any, initialState, {
    handleSubmit,
  });

  useEffect(() => {
    formRef.current = form;
  });

  return { form, isPending };
};
