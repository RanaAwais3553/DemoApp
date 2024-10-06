const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);
const config = {
  resetCache: true,
  resolver: {
    assetExts: [
        ...defaultConfig.resolver.assetExts,
        'png',
        'jpg',
        'jpeg',
        'svg',
    ],
},
    transformer: {
        unstable_allowRequireContext: true, // Enable require.context feature
      },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
