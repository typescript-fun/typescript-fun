import { constNull } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import React, { FC } from 'react';
import { Text } from 'react-native';
import { useTheme } from '../hooks/useTheme';

// TypeScript compiler ensures all errors are translated.
const fieldErrorMessages = {
  EmailString: 'This is not valid email.',
  ExistingEmail: 'This email already exists.',
  Max512String: 'Too long. Max 512 chars.',
  Max64String: 'Too long. Max 64 chars.',
  Min6String: 'Too short. Min 6 chars.',
  NonEmptyString: 'Can not be empty.',
  PhoneString: 'This is not valid phone.',
  TrimmedString: 'Please delete leading and trailing whitespaces.',
};

export type FieldErrorType = keyof typeof fieldErrorMessages;

export const FieldErrorMessage: FC<{
  error: O.Option<FieldErrorType>;
}> = ({ error }) => {
  const theme = useTheme();
  return pipe(
    error,
    // We can use intl.formatMessage here.
    O.map(error => fieldErrorMessages[error]),
    O.fold(constNull, message => (
      <Text style={theme.formErrorMessage}>{message}</Text>
    )),
  );
};
