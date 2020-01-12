import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from '@chakra-ui/core';
import * as E from 'fp-ts/lib/Either';
import { absurd, constVoid } from 'fp-ts/lib/function';
import { pipe } from 'fp-ts/lib/pipeable';
import * as T from 'fp-ts/lib/Task';
import * as TE from 'fp-ts/lib/TaskEither';
import * as t from 'io-ts';
import Head from 'next/head';
import Router from 'next/router';
import React, { KeyboardEventHandler, useState } from 'react';
import { Email, Password, VerifiedPassword } from 'typescript-fun';
import { FormErrorMessage } from '../components/FormErrorMessage';
import { Form, useForm } from '../hooks/useForm';

const LoginForm = t.type({
  email: Email,
  password: t.union([Password, VerifiedPassword]),
});
type LoginForm = t.TypeOf<typeof LoginForm>;

const LoginFormAsyncErrors = t.type({
  password: t.array(t.literal('VerifiedPassword')),
});

const LoginError = t.union([
  LoginFormAsyncErrors,
  t.literal('suspendedEmail'),
  t.literal('somethingElse'),
]);
type LoginError = t.TypeOf<typeof LoginError>;

const LoginPayload = t.type({ token: t.string });
type LoginPayload = t.TypeOf<typeof LoginPayload>;

const LoginSimple = () => {
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (form: Form<typeof LoginForm['props']>) => {
    const asyncLogin = (
      data: LoginForm,
    ): TE.TaskEither<LoginError, LoginPayload> => {
      if (data.email === 'a@a.com' && data.password === 'aaaaaa')
        return T.delay(500)(TE.right({ token: '123' }));
      if (data.email === 'b@b.com') return TE.left('suspendedEmail');
      return TE.left({ password: ['VerifiedPassword'] });
    };

    const handleError = (error: LoginError) => {
      setIsPending(false);
      form.enable();
      if (LoginFormAsyncErrors.is(error)) form.setAsyncErrors(error);
      else {
        switch (error) {
          case 'suspendedEmail':
            alert(error);
            break;
          case 'somethingElse':
            alert(error);
            break;
          default:
            // Absurd ensures all cases are handled.
            absurd(error);
        }
      }
    };

    const handleSuccess = (payload: LoginPayload) => {
      setIsPending(false);
      form.reset();
      alert(`payload: ${JSON.stringify(payload, null, 2)}`);
      Router.push('/');
    };

    pipe(
      form.validated,
      E.fold(constVoid, data => {
        setIsPending(true);
        form.disable();
        pipe(
          asyncLogin(data),
          TE.mapLeft(handleError),
          TE.map(handleSuccess),
        )();
      }),
    );
  };

  const form = useForm(
    LoginForm,
    {
      email: '',
      password: '',
    },
    { handleSubmit },
  );

  const submitOnEnter: KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === 'Enter') form.submit();
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Box m={8}>
        <Text fontSize="xl">Login</Text>
        <Box maxW="sm" borderWidth="1px" rounded="lg" p={4} my={4}>
          <Stack spacing={4}>
            <FormControl isRequired isInvalid={form.fields.email.isInvalid}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                value={form.fields.email.value}
                onChange={form.fields.email.onHTMLInputValue}
                onKeyPress={submitOnEnter}
                ref={form.fields.email.ref}
              />
              <FormErrorMessage error={form.fields.email.firstError} />
            </FormControl>
            <FormControl isRequired isInvalid={form.fields.password.isInvalid}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                value={form.fields.password.value}
                onChange={form.fields.password.onHTMLInputValue}
                onKeyPress={submitOnEnter}
                ref={form.fields.password.ref}
              />
              <FormErrorMessage error={form.fields.password.firstError} />
            </FormControl>
            <Button
              isDisabled={isPending}
              onClick={form.submit}
              mt={4}
              variantColor="green"
            >
              Login
            </Button>
          </Stack>
        </Box>
        <Stack>
          <Text>
            Try email <b>a@a.com</b> with passwords <b>aaaaaa</b>, <b>bbbbbb</b>
            , or email <b>b@b.com</b>.
          </Text>
        </Stack>
      </Box>
    </>
  );
};

export default LoginSimple;
