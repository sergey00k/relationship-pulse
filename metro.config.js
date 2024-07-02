// metro.config.js
module.exports = {
    resolver: {
      blacklistRE: /node_modules\/react-native\/src\/private\/specs\/components\/DebuggingOverlayNativeComponent.js/,
    },
  };
  