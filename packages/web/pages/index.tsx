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
      <Text style={theme.paragraph}>
        Typed functional programming in Typescript is a game-changer for many
        reasons.
      </Text>
      <Text style={theme.paragraph}>
        But instead of a long and tedious explanation of why we created a
        five-minutes-demo for you. A form with browser and server validation.
        Until we write a blog post, explore the well-commented code.
      </Text>
    </Page>
  );
};

export default Index;
