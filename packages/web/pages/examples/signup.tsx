import { NextPage } from 'next';
import React from 'react';
import { Text } from 'react-native';
import { Page } from '../../components/Page';
import { useTheme } from '../../hooks/useTheme';
import { Link } from '../../components/Link';

const Index: NextPage = () => {
  const theme = useTheme();
  return (
    <Page title="Sign Up - Examples - TypeScript.fun">
      <Text style={theme.heading1}>Sign Up</Text>
      <Text>foo</Text>
    </Page>
  );
};

export default Index;
