import { NextPage } from 'next';
import React from 'react';
import { Text, View } from 'react-native';
import { Page } from '../../components/Page';
import { useTheme } from '../../hooks/useTheme';

const Index: NextPage = () => {
  const theme = useTheme();

  return (
    <Page title="Sign up form | React Native Web - TypeScript.fun" codesandbox>
      <Text style={[theme.heading1, { textAlign: 'center' }]}>
        Sign up form | React Native Web
      </Text>
      <View style={{ flex: 1 }}>
        <iframe
          src="https://codesandbox.io/embed/github/typescript-fun/typescript-fun/tree/master/examples/signup-form-react-native-web?fontsize=14&hidenavigation=1&module=%2Fpages%2Findex.tsx"
          // style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
          style={{
            border: 0,
            overflow: 'hidden',
            height: '100%',
            width: '100%',
          }}
          title="signup-form-react-native-web"
          allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
          sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
        />
      </View>
    </Page>
  );
};

export default Index;
