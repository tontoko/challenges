const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = merge(baseConfig, {
  mode: 'production',
  plugins: [new CleanWebpackPlugin()],
});

module.exports = config;
