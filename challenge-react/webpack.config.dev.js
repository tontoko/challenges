const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.common.js');

const config = merge(baseConfig, {
  devtool: 'inline-source-map',

  devServer: {
    inline: true,
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true,
    disableHostCheck: true,
    contentBase: path.resolve(__dirname, 'dist'),
    writeToDisk: true,
  },
  mode: 'development',
});

module.exports = config;
