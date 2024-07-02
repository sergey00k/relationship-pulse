const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Add fallback for node modules
  config.resolve.fallback = {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    buffer: require.resolve('buffer/'),
    process: require.resolve('process/browser'),
    vm: require.resolve('vm-browserify'),
  };

  // Adding file loader to handle images and fonts
  config.module.rules.push({
    test: /\.(png|jpe?g|gif|svg|ttf|woff|woff2?)$/,
    use: [{
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'assets/',
        publicPath: '/assets/',
        context: 'src/assets',
      },
    }],
  });

  // Remove the HtmlWebpackPlugin if it's already included by Expo
  config.plugins = config.plugins.filter(
    plugin => !(plugin instanceof HtmlWebpackPlugin)
  );

  // Add HtmlWebpackPlugin to include the CSP meta tag
  config.plugins.push(
    new HtmlWebpackPlugin({
      templateContent: `
        <!doctype html>
        <html lang="en">
        <head>
          <meta charset="utf-8"/>
          <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
          <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1.00001,viewport-fit=cover"/>
          <title>relationship-test-app</title>
          <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-eval';">
          <style>
            #root, body, html {
              width: 100%;
              -webkit-overflow-scrolling: touch;
              margin: 0;
              padding: 0;
              min-height: 100%;
            }
            #root {
              flex-shrink: 0;
              flex-basis: auto;
              flex-grow: 1;
              display: flex;
              flex: 1;
            }
            html {
              scroll-behavior: smooth;
              -webkit-text-size-adjust: 100%;
              height: calc(100% + env(safe-area-inset-top));
            }
            body {
              display: flex;
              overflow-y: auto;
              overscroll-behavior-y: none;
              text-rendering: optimizeLegibility;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              -ms-overflow-style: scrollbar;
            }
          </style>
          <link rel="manifest" href="/manifest.json">
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
          <link rel="shortcut icon" href="/favicon.ico">
          <meta name="mobile-web-app-capable" content="yes">
          <meta name="apple-mobile-web-app-capable" content="yes">
          <meta name="apple-touch-fullscreen" content="yes">
          <meta name="apple-mobile-web-app-title" content="relationship-test-app">
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
          <link rel="apple-touch-icon" sizes="180x180" href="/pwa/apple-touch-icon/apple-touch-icon-180.png">
          <link rel="apple-touch-startup-image" media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/pwa/apple-touch-startup-image/apple-touch-startup-image-640x1136.png">
          <link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="/pwa/apple-touch-startup-image/apple-touch-startup-image-1242x2688.png">
          <link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/pwa/apple-touch-startup-image/apple-touch-startup-image-828x1792.png">
          <link rel="apple-touch-startup-image" media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="/pwa/apple-touch-startup-image/apple-touch-startup-image-1125x2436.png">
          <link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="/pwa/apple-touch-startup-image/apple-touch-startup-image-1242x2208.png">
          <link rel="apple-touch-startup-image" media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/pwa/apple-touch-startup-image/apple-touch-startup-image-750x1334.png">
          <link rel="apple-touch-startup-image" media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/pwa/apple-touch-startup-image/apple-touch-startup-image-2048x2732.png">
          <link rel="apple-touch-startup-image" media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/pwa/apple-touch-startup-image/apple-touch-startup-image-1668x2388.png">
          <link rel="apple-touch-startup-image" media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/pwa/apple-touch-startup-image/apple-touch-startup-image-1668x2224.png">
          <link rel="apple-touch-startup-image" media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/pwa/apple-touch-startup-image/apple-touch-startup-image-1536x2048.png">
          <script defer="defer" src="/static/js/710.acde0b54.js"></script>
          <script defer="defer" src="/static/js/main.dbf272f5.js"></script>
        </head>
        <body>
          <noscript>
            <form action="" style="background-color:#fff;position:fixed;top:0;left:0;right:0;bottom:0;z-index:9999">
              <div style="font-size:18px;font-family:Helvetica,sans-serif;line-height:24px;margin:10%;width:80%">
                <p>Oh no! It looks like JavaScript is not enabled in your browser.</p>
                <p style="margin:20px 0">
                  <button type="submit" style="background-color:#4630eb;border-radius:100px;border:none;box-shadow:none;color:#fff;cursor:pointer;font-weight:700;line-height:20px;padding:6px 16px">Reload</button>
                </p>
              </div>
            </form>
          </noscript>
          <div id="root"></div>
        </body>
        </html>
      `,
    })
  );

  // Enable source maps for easier debugging
  config.devtool = 'source-map';

  return config;
};
