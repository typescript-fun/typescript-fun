import Head from 'next/head';
import React, { FC } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Logo } from './Logo';
import { Link } from './Link';

export const Page: FC<{ title: string; codesandbox?: boolean }> = ({
  title,
  children,
  codesandbox,
}) => {
  const theme = useTheme();

  return (
    <ScrollView
      style={theme.rootScrollView}
      contentContainerStyle={
        codesandbox ? theme.containerCodesandbox : theme.container
      }
    >
      <Head>
        <title>{title}</title>
      </Head>
      <View
        style={codesandbox ? theme.pageHeaderCodesandbox : theme.pageHeader}
      >
        <Link href="/" style={theme.logo}>
          <Logo />
        </Link>
      </View>
      {children}
      {!codesandbox && (
        <View style={theme.pageFooter}>
          <Text style={theme.text}>
            <Link href="https://twitter.com/estejs">twitter</Link> -{' '}
            <Link href="https://github.com/typescript-fun/typescript-fun/issues/new">
              report a bug
            </Link>
          </Text>
        </View>
      )}
    </ScrollView>
  );
};
