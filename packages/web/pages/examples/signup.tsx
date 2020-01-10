import { NextPage } from 'next';
import React from 'react';
import { Text } from 'react-native';
import { Page } from '../../components/Page';
import { useTheme } from '../../hooks/useTheme';
import { Password } from 'typescript-fun/src';

const Index: NextPage = () => {
  const theme = useTheme();
  return (
    <Page title="Sign Up - Examples - TypeScript.fun">
      <Text style={theme.heading1}>Sign Up</Text>
      <Text style={theme.text}>{String(Password.is('a@a.com'))}</Text>
    </Page>
  );
};

export default Index;
