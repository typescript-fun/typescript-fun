import { NextPage } from 'next';
import React from 'react';
import { Text } from 'react-native';
import { Page } from '../components/Page';

const Index: NextPage = () => {
  return (
    <Page title="TypeScript.fun - Typed Functional Programming in Typescript Training">
      {/* TODO: Header */}
      <Text accessibilityRole="header">Header</Text>
      <Text>text</Text>
    </Page>
  );
};

export default Index;
