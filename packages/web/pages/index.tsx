import { NextPage } from 'next';
import React from 'react';
import { Text } from 'react-native';
import { Page } from '../components/Page';
import { useTheme } from '../hooks/useTheme';

const Index: NextPage = () => {
  const theme = useTheme();
  return (
    <Page title="TypeScript.fun - Typed Functional Programming in Typescript Training">
      <Text style={theme.heading1}>
        Typed Functional Programming in Typescript
      </Text>
      <Text style={theme.heading2}>Why</Text>
    </Page>
  );
};

export default Index;
