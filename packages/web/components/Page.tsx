import React, { FC } from 'react';
import Head from 'next/head';
import { useTheme } from '../hooks/useTheme';
import { View, Image } from 'react-native';
// import { Logo } from './Logo';

export const Page: FC<{ title: string }> = ({ title, children }) => {
  const theme = useTheme();
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <View style={theme.container}>
        <Image
          style={{ width: 300, height: 45 }}
          source={{ uri: '/logo.svg' }}
        />
        {children}
      </View>
    </>
  );
};
