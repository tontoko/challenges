const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.common.js');

const config = merge(baseConfig, {
  mode: 'production',
});

module.exports = config;
