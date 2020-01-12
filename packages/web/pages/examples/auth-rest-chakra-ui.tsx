import { NextPage } from 'next';
import React from 'react';
import { Text, View } from 'react-native';
import { Page } from '../../components/Page';
import { useTheme } from '../../hooks/useTheme';

const Index: NextPage = () => {
  const theme = useTheme();

  return (
    <Page title="Auth with REST | Chakra UI - TypeScript.fun" codesandbox>
      <Text style={[theme.heading1, { textAlign: 'center' }]}>
        Auth with REST | Chakra UI
      </Text>
      <View style={{ flex: 1 }}>
        <iframe
          src="https://codesandbox.io/embed/github/typescript-fun/typescript-fun/tree/master/examples/auth-rest-chakra-ui?fontsize=14&hidenavigation=1&module=%2Fpages%2Findex.tsx"
          style={{
            border: 0,
            overflow: 'hidden',
            height: '100%',
            width: '100%',
          }}
          title="auth-rest-chakra-ui"
          allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
          sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
        />
      </View>
    </Page>
  );
};

export default Index;
