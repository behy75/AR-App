'use strict';

const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

module.exports = async () => {
  const baseConfig = getDefaultConfig(__dirname);

  const {
    resolver: {assetExts},
  } = await getDefaultConfig();

  // Add additional asset extensions
  const extendedAssetExts = [
    ...assetExts,
    'obj',
    'mtl',
    'JPG',
    'vrx',
    'hdr',
    'gltf',
    'glb',
    'GLB',
    'bin',
    'arobject',
    'gif',
  ];

  // Merge configurations
  return mergeConfig(baseConfig, {
    resolver: {
      assetExts: extendedAssetExts,
    },
  });
};
