import React from 'react';
import App from 'next/app';
import { ThemeProvider } from '../hooks/useTheme';
import { theme } from '../themes/theme';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider value={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}

export default MyApp;
