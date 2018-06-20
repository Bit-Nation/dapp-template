const path = require('path');
const webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');
var assetsPluginInstance = new AssetsPlugin({
  filename: 'assets.json',
  includeManifest: 'manifest',
});

module.exports = {
  entry: ['babel-polyfill', './main.js'],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [assetsPluginInstance],
};
