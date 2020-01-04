import Head from 'next/head';
import React, { FC } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Logo } from './Logo';
import { Link } from './Link';

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
      <View style={theme.pageFooter}>
        <Text style={theme.text}>
          <Link href="https://twitter.com/estejs">twitter</Link> -{' '}
          <Link href="https://github.com/typescript-fun/typescript-fun/issues/new">
            report a bug
          </Link>
        </Text>
      </View>
    </ScrollView>
  );
};
