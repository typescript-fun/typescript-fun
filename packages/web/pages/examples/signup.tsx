import * as O from 'fp-ts/lib/Option';
import * as E from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import { option } from 'io-ts-types/lib/option';
import { NextPage } from 'next';
import React from 'react';
import { Text, View } from 'react-native';
import {
  Email,
  ExistingEmail,
  Password,
  Phone,
  String64,
  useForm,
} from 'typescript-fun/src';
import { Button } from '../../components/Button';
import { CheckBoxField } from '../../components/CheckBoxField';
import { Page } from '../../components/Page';
import { TextInputField } from '../../components/TextInputField';
import { useTheme } from '../../hooks/useTheme';
import { pipe } from 'fp-ts/lib/pipeable';
import { constVoid } from 'fp-ts/lib/function';

// Step 1: Create form model.
const SignUpForm = t.type({
  company: String64,
  // Because of ExistingEmail, we can set async error 'ExistingEmail'.
  email: t.union([Email, ExistingEmail]),
  password: Password,
  phone: option(Phone),
  sendNewsletter: t.boolean,
});

const Index: NextPage = () => {
  const theme = useTheme();

  // Step 2: Create form state.
  const form = useForm(
    SignUpForm,
    {
      company: '',
      email: '',
      password: '',
      // Not fulfilled phone is not an empty string. Empty string is not valid phone.
      // Not fulfilled phone is O.none. Fulfilled phone is O.some('123123123').
      phone: O.none,
      sendNewsletter: false,
    },
    {
      // Step 4: Handle submit.
      handleSubmit(form) {
        pipe(
          form.validated,
          E.fold(constVoid, data => {
            form.disable();
            // Simulate async sign up action.
            setTimeout(() => {
              form.enable();
              if (data.email === 'a@a.com') {
                form.setAsyncErrors({ email: ['ExistingEmail'] });
              } else {
                form.reset();
              }
            }, 1000);
          }),
        );
      },
    },
  );

  return (
    <Page title="Sign Up - Examples - TypeScript.fun">
      <Text style={theme.heading1}>Sign Up</Text>
      {/* Step 3: Create the form. */}
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
        <Button
          label="Sign Up"
          onPress={form.submit}
          disabled={form.isDisabled}
        />
      </View>
    </Page>
  );
};

export default Index;
