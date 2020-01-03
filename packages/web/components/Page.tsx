import Head from 'next/head';
import React, { FC } from 'react';
import { View, ScrollView } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Logo } from './Logo';

export const Page: FC<{ title: string }> = ({ title, children }) => {
  const theme = useTheme();
  return (
    <ScrollView
      style={theme.rootScrollView}
      contentContainerStyle={theme.container}
    >
      <Head>
        <title>{title}</title>
      </Head>
      <View style={theme.pageHeader}>
        <Logo />
      </View>
      {children}
    </ScrollView>
  );
};
