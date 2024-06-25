const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.resolve.fallback = {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    buffer: require.resolve('buffer/'),
    process: require.resolve('process/browser'),
    vm: require.resolve('vm-browserify'),
  };

  // Adding file loader to handle images and fonts
  config.module.rules.push({
    test: /\.(png|jpe?g|gif|svg|ttf|woff2?)$/,
    use: [{
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]',
        context: 'src/assets',
        outputPath: 'assets/',
        publicPath: '/assets/',
      },
    }],
  });

  return config;
};
