import React from 'react';
import App from 'next/app';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { IntlProvider } from 'react-intl';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider>
        <IntlProvider locale={'en'}>
          <CSSReset />
          <Component {...pageProps} />
        </IntlProvider>
      </ThemeProvider>
    );
  }
}

export default MyApp;
