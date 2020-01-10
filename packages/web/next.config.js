// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require('next-transpile-modules');

module.exports = withTM({
  // For Yarn workspace, transpileModules and importing from /src is the must.
  // Otherwise CircleCI and ZEIT Now: Module not found: Can't resolve 'typescript-fun'
  // That's probably because of how Yarn resolves dependencies per workspaces.
  transpileModules: ['typescript-fun'],
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
