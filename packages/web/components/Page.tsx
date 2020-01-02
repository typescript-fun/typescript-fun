import React, { FC } from 'react';
import Head from 'next/head';
import { useTheme } from '../hooks/useTheme';
import { View } from 'react-native';

export const Page: FC<{ title: string }> = ({ title, children }) => {
  const theme = useTheme();
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <View style={theme.container}>{children}</View>
    </>
  );
};
