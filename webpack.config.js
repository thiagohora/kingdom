const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', path.resolve(__dirname, './src/index.js')],
  output: {
    path: path.resolve(__dirname, './build'),
    filename: `bundle.js`,
    publicPath: '/'
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        { loader: 'babel-loader' },
        { loader: 'eslint-loader' }
      ]
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url-loader',
      options: {
        limit: 10000
      }
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }, {
      test: /\.(sass|scss)$/,
      use: [{
        loader: "style-loader"
      },
      {
        loader: "css-loader",
        options: {
          sourceMap: true
        }
      },
      {
        loader: "sass-loader",
        options: {
          sourceMap: true
        }
      }
    ]}
  ]},
  resolve: {
    modules: [
      path.resolve(__dirname, './node_modules'),
      path.resolve(__dirname, './src')
    ],
    extensions: ['.js']
  },
  devServer: {
    compress: true,
    noInfo: true,
    overlay: { errors: true },
    port: 8080,
    historyApiFallback: true
    // disableHostCheck: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor'
    // }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // favicon: './src/assets/images/logo-48.png',
    }),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, './src/data'), to: './build' },
      // { from: path.resolve(__dirname, './src/manifest.json'), to: './build' },
      // { from: path.resolve(__dirname, './src/sw.js'), to: './build' },
      // { from: path.resolve(__dirname, './src/assets'), to: './build' },
    ]),
    new CleanWebpackPlugin(['./build'])
  ]
};