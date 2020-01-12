import { NextPage } from 'next';
import React from 'react';
import { Text } from 'react-native';
import { Page } from '../../components/Page';
import { useTheme } from '../../hooks/useTheme';
import { Link } from '../../components/Link';

const Index: NextPage = () => {
  const theme = useTheme();
  return (
    <Page title="Examples - TypeScript.fun">
      <Text style={theme.heading1}>Examples</Text>
      <Text style={[theme.text, theme.bigMarginBottom]}>
        <Link
          style={theme.linkButtonOutline}
          href="/examples/signup-form-react-native-web"
          icon
        >
          Sign up form | React Native Web
        </Link>
      </Text>
      <Text style={theme.text}>
        <Link
          style={theme.linkButtonOutline}
          href="/examples/auth-rest-chakra-ui"
          icon
        >
          Auth with REST | Chakra UI
        </Link>
      </Text>
    </Page>
  );
};

export default Index;
