import { FormErrorMessage as ChakraFormErrorMessage } from '@chakra-ui/core';
import { constNull } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import React, { FC } from 'react';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  NonEmptyString: {
    id: 'NonEmptyString',
    defaultMessage: 'Can not be empty.',
  },
  TrimmedString: {
    id: 'TrimmedString',
    defaultMessage: 'Please delete leading and trailing whitespaces.',
  },
  Max64String: {
    id: 'Max64String',
    defaultMessage: 'Too long. Max 64 chars.',
  },
  Max512String: {
    id: 'Max512String',
    defaultMessage: 'Too long. Max 512 chars.',
  },
  Min6String: {
    id: 'Min6String',
    defaultMessage: 'Too short. Min 6 chars.',
  },
  EmailString: {
    id: 'EmailString',
    defaultMessage: 'Email is not valid.',
  },
  PhoneString: {
    id: 'PhoneString',
    defaultMessage: 'Invalid phone number.',
  },
  UniqueEmail: {
    id: 'UniqueEmail',
    defaultMessage: 'Email is already used.',
  },
  VerifiedPassword: {
    id: 'VerifiedPassword',
    defaultMessage: 'Password is wrong.',
  },
});

export type FormErrorID = keyof typeof messages;

export const FormErrorMessage: FC<{
  error: O.Option<FormErrorID>;
}> = ({ error }) => {
  const intl = useIntl();
  return pipe(
    error,
    O.map(error => intl.formatMessage(messages[error])),
    O.fold(constNull, message => (
      <ChakraFormErrorMessage>{message}</ChakraFormErrorMessage>
    )),
  );
};
