module.exports = {
  webpack(config, options) {
    // Enable tree shaking.
    // https://github.com/gcanti/fp-ts/issues/1044#issue-536939300
    config.resolve.alias['fp-ts/lib'] = 'fp-ts/es6';
    return config;
  },
};
