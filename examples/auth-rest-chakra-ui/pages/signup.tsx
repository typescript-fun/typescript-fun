import { Box, Button, Icon, Stack, Text } from '@chakra-ui/core';
import { absurd } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import Head from 'next/head';
import Router from 'next/router';
import React from 'react';
import { CheckboxField } from '../components/fields/CheckboxField';
import { TextInputField } from '../components/fields/TextInputField';
import { useMutation } from '../hooks/useMutation';
import { SignUpFormAsyncErrors } from '../types';

const SignUp = () => {
  const { form, isPending } = useMutation(
    'signUp',
    {
      company: '',
      email: '',
      password: '',
      phone: O.none,
      sendNewsletter: false,
    },
    {
      handleError(error, form) {
        if (SignUpFormAsyncErrors.is(error)) {
          form.setAsyncErrors(error);
          return;
        }
        switch (error.type) {
          case 'signUpUsedAsLogin':
            alert('You used sign up form as the login form.');
            Router.push('/login');
            break;
          case 'suspendedEmail':
            alert(`This email has been suspended because of ${error.reason}.`);
            break;
          default:
            absurd(error);
        }
      },
      handleSuccess(payload) {
        form.reset();
        alert(`payload: ${JSON.stringify(payload, null, 2)}`);
        Router.push('/');
      },
    },
  );

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <Box m={8}>
        <Text fontSize="xl">Sign Up</Text>
        <Box maxW="sm" borderWidth="1px" rounded="lg" p={4} my={4}>
          <Stack spacing={4}>
            <TextInputField
              field={form.fields.company}
              type="text"
              label="Company"
            />
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
            <TextInputField
              field={form.fields.phone}
              type="tel"
              label="Phone"
              icon={<Icon name="phone" color="gray.300" />}
            />
            <CheckboxField
              field={form.fields.sendNewsletter}
              label="Yes, send me a newsletter"
            />
            <Button
              isDisabled={isPending}
              onClick={form.submit}
              mt={4}
              variantColor="green"
            >
              Sign Up
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

export default SignUp;
