// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require('next-transpile-modules');

module.exports = withTM({
  // For lib development, use transpileModules. It's faster than tsc --watch.
  // Remember to import from `src`: `import { Hoverable } from 'typescript-fun/src'`
  // transpileModules: ['typescript-fun'],
  webpack: config => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      'react-native$': 'react-native-web',
      // Tree shaking.
      // https://github.com/gcanti/fp-ts/issues/1044#issue-536939300
      'fp-ts/lib': 'fp-ts/es6',
    };
    config.resolve.extensions.push('.web.js', '.web.ts', '.web.tsx');
    return config;
  },
});
