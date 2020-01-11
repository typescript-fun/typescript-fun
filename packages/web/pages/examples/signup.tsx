import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import * as t from 'io-ts';
import { option } from 'io-ts-types/lib/option';
import { NextPage } from 'next';
import React, { FC, useCallback, useState, useMemo } from 'react';
import {
  Text,
  TextInput,
  View,
  CheckBox,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {
  Email,
  ExistingEmail,
  FieldMaybeOptional,
  isOptionalField,
  Password,
  Phone,
  String64,
  useForm,
  Field,
} from 'typescript-fun/src';
import { Page } from '../../components/Page';
import { useTheme } from '../../hooks/useTheme';
import { constNull } from 'fp-ts/lib/function';

// At first, we need a model for the form. Models define types with their validations.
// We can reuse existing types or create our own to compose new types.
const SignUpForm = t.type({
  company: String64,
  email: t.union([Email, ExistingEmail]),
  password: Password,
  phone: option(Phone),
  sendNewsletter: t.boolean,
});

// We can manually validate with pipe and E.fold:
// pipe(
//   Email.decode('almost@email'),
//   E.fold(
//     error => console.log(error),
//     email => console.log(email),
//   ),
// );
// pipe(
//   SignUpForm.decode({ email: 'a@a.com', password: '123456' }),
//   E.fold(
//     error => console.log(error),
//     signUpForm => console.log(signUpForm.email),
//   ),
// );

// We also need some reusable form field components tailored to our needs.

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

type FieldErrorType = keyof typeof fieldErrorMessages;

export const FieldErrorMessage: FC<{
  error: O.Option<FieldErrorType>;
}> = ({ error }) => {
  const theme = useTheme();
  return pipe(
    error,
    // If there is an error, get its message. We can use intl.formatMessage here.
    O.map(error => fieldErrorMessages[error]),
    O.fold(constNull, message => (
      <Text style={theme.formErrorMessage}>{message}</Text>
    )),
  );
};

const TextInputField: FC<{
  // A field can be Field, OptionalField or FieldMaybeOptional.
  // It's generic type. First arg is "output" type, the second is error type.
  field: FieldMaybeOptional<string, FieldErrorType>;
  label: string;
  secureTextEntry?: boolean;
}> = ({ field, label, secureTextEntry }) => {
  const theme = useTheme();

  const value = isOptionalField(field)
    ? pipe(
        field.value,
        O.getOrElse(() => ''),
      )
    : field.value;

  const handleChangeText = useCallback(
    (value: string) => {
      if (isOptionalField(field)) {
        field.onChange(value.length === 0 ? O.none : O.some(value));
      } else {
        field.onChange(value);
      }
    },
    [field],
  );

  const [hasFocus, setHasFocus] = useState(false);
  const handleFocus = useCallback(() => {
    setHasFocus(true);
  }, []);
  const handleBlur = useCallback(() => {
    setHasFocus(false);
  }, []);

  const handleSubmitEditing = useCallback(() => {
    field.submit();
  }, [field]);

  return (
    <View>
      <View style={theme.row}>
        <Text style={theme.textInputLabel}>{label}</Text>
        {!isOptionalField(field) && (
          <Text style={theme.textInputIsRequiredAsterisk}> *</Text>
        )}
      </View>
      <TextInput
        onChangeText={handleChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSubmitEditing={handleSubmitEditing}
        style={[
          theme.textInput,
          hasFocus && theme.textInputFocus,
          field.isInvalid && theme.textInputInvalid,
        ]}
        value={value}
        secureTextEntry={secureTextEntry}
        blurOnSubmit={false}
        ref={field.ref}
      />
      <FieldErrorMessage error={field.firstError} />
    </View>
  );
};

const CheckBoxField: FC<{
  field: Field<boolean, FieldErrorType>;
  label: string;
}> = ({ field, label }) => {
  const theme = useTheme();
  const { color, ...style } = useMemo(
    () => StyleSheet.flatten(theme.checkbox),
    [theme.checkbox],
  );
  return (
    <View style={theme.row}>
      <CheckBox
        {...Platform.select({ web: { color } })}
        accessible
        value={field.value}
        onValueChange={field.onChange}
        style={style}
      />
      <Text style={theme.checkboxLabel}>{label}</Text>
    </View>
  );
};

const Button: FC = ({ children }) => {
  const theme = useTheme();
  const [hasFocus, setHasFocus] = useState(false);
  const handleFocus = useCallback(() => {
    setHasFocus(true);
  }, []);
  const handleBlur = useCallback(() => {
    setHasFocus(false);
  }, []);
  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={[theme.button, hasFocus && theme.buttonFocus]}
      {...Platform.select({
        web: {
          onFocus: handleFocus,
          onBlur: handleBlur,
        },
      })}
    >
      <Text style={theme.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

const Index: NextPage = () => {
  const theme = useTheme();

  // Step 2: Create a form state with all validations and imperative methods.
  // Forms are complex and tricky. Even a moderate form is like a small application.
  // Traditionally, a developer writes a lot of boilerplate code or leverages
  // some helper library. The biggest challenge for a helper library is to be
  // both powerfull and not opinionated more than necessary. Forms can be built with
  // any component library and their validations shall be reusable elsewhere.
  const form = useForm(SignUpForm, {
    // Initial state.
    company: '',
    email: '',
    password: '',
    // Not fulfilled phone is not an empty string. Empty string is not valid phone.
    // O.none or O.some('foo').
    phone: O.none,
    sendNewsletter: false,
  });

  return (
    <Page title="Sign Up - Examples - TypeScript.fun">
      <Text style={theme.heading1}>Sign Up</Text>
      <View style={theme.form}>
        <TextInputField label="Company" field={form.fields.company} />
        <TextInputField label="Email" field={form.fields.email} />
        <TextInputField
          label="Password"
          field={form.fields.password}
          secureTextEntry
        />
        <TextInputField label="Phone" field={form.fields.phone} />
        <CheckBoxField
          field={form.fields.sendNewsletter}
          label="Yes, send me a newsletter"
        />
        <Button>Sign Up</Button>
        {/* <Button
              isDisabled={isPending}
              onClick={form.submit}
              mt={4}
              variantColor="green"
            >
              Sign Up
            </Button> */}
      </View>
    </Page>
  );
};

export default Index;
