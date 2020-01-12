import { Box, Button, Stack, Text } from '@chakra-ui/core';
import Head from 'next/head';
import React from 'react';
import { TextInputField } from '../components/fields/TextInputField';
import { useMutation } from '../hooks/useMutation';
import { LoginFormAsyncErrors } from '../types';
import Router from 'next/router';

const Login = () => {
  const { form, isPending } = useMutation(
    'login',
    {
      email: '',
      password: '',
    },
    {
      handleError(error, form) {
        if (LoginFormAsyncErrors.is(error)) form.setAsyncErrors(error);
        else alert(`This email has been suspended because of ${error.reason}.`);
      },
      handleSuccess(payload, form) {
        form.reset();
        alert(`payload: ${JSON.stringify(payload, null, 2)}`);
        Router.push('/');
      },
    },
  );

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Box m={8}>
        <Text fontSize="xl">Login</Text>
        <Box maxW="sm" borderWidth="1px" rounded="lg" p={4} my={4}>
          <Stack spacing={4}>
            <TextInputField
              field={form.fields.email}
              type="email"
              label="Email"
            />
            <TextInputField
              field={form.fields.password}
              type="password"
              label="Password"
            />
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

export default Login;
