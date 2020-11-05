const path = require('path');
const webpack = require('webpack');
// const threeMinifier = require('@yushijinhun/three-minifier-webpack');

const ThreeMinifierPlugin = require("@yushijinhun/three-minifier-webpack");
const threeMinifier = new ThreeMinifierPlugin();

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        // vendor chunk
        vendor: {
            // sync + async chunks
            chunks: 'all',
            // import file path containing node_modules
            test: /node_modules/
        }
      }
    }
  },
  plugins: [
    threeMinifier,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      h: ['preact', 'h'],
    }),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat',
    },
    plugins: [threeMinifier.resolver],
  },
};
