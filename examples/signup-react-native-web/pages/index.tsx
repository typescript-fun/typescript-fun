import * as E from 'fp-ts/lib/Either';
import { constVoid } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import * as t from 'io-ts';
import { option } from 'io-ts-types/lib/option';
import { NextPage } from 'next';
import React from 'react';
import { View, ScrollView } from 'react-native';
import {
  Email,
  ExistingEmail,
  Password,
  Phone,
  String64,
  useForm,
} from 'typescript-fun';
import { Button } from '../components/Button';
import { CheckBoxField } from '../components/CheckBoxField';
import { TextInputField } from '../components/TextInputField';
import { useTheme } from '../hooks/useTheme';

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
  const form = useForm(
    SignUpForm,
    {
      company: '',
      email: '',
      password: '',
      // O.none, because it's explicit. Null, undefined, empty string are not.
      phone: O.none,
      sendNewsletter: false,
    },
    {
      handleSubmit(form) {
        pipe(
          form.validated,
          E.fold(constVoid, data => {
            form.disable();
            // Simulate async sign up.
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
    <ScrollView
      style={theme.scrollView}
      contentContainerStyle={theme.container}
    >
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
    </ScrollView>
  );
};

export default Index;
