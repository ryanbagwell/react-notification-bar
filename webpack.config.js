import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import ForceCaseSensitivityPlugin from 'force-case-sensitivity-webpack-plugin';


export default {

  stats: 'verbose',

  context: path.resolve(__dirname, 'src'),

  entry: {
    'index': 'NotificationBar',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: "commonjs2",
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
      },
    }),
    new ForceCaseSensitivityPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    // new webpack.ProvidePlugin({
    //   Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
    //   fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    // }),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insertAt: 'top',
            },
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    symlinks: false,
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules',
    ],
  },

};
