const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

const devtool = isProd ?
  'source-map' :
  'cheap-module-eval-source-map';

const entry = {
  style: path.resolve(__dirname, './src/scss/main.scss'),
  app: path.resolve(__dirname, './src/index.js')
};

const output = {
  path: path.resolve(__dirname, './build'),
  filename: `[name].bundle.js`,
  publicPath: '/'
};

const modules = {
  rules: [{
    test: /\.js$/,
    exclude: /node_modules/,
    use: "babel-loader"
  },
  {
    test: /\.(sass|scss)$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader', options: { sourceMap: true }
        },
        {
          loader: 'sass-loader', options: { sourceMap: true}
        }
      ]
    })
    /*use: [{
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
    }]*/
  },
  {
    test: /\.html$/,
    use: "html-loader"
  },
  {
    test: /\.(jpg|png|gif)$/,
    use: [{
      loader: "url-loader", options: { limit: 10000 }
    }]
  },
]};
//   loaders: [{
//       test: /\.(jpg|png|gif)$/,
//       loader: 'url-loader?limit=10000'
//     },
//     {
//       test: /\.html$/,
//       loader: 'html-loader'
//     },
//     {
//       test: /\.scss$/,
//       loaders: ['style-loader', 'css-loader', 'sass-loader']
//     },
//     {
//       test: /\.js$/,
//       loader: 'babel-loader',
//       query: {
//         plugins: ['babel-plugin-transform-object-rest-spread'],
//         presets: [
//           ['env', {
//             "targets": {
//               "browsers": ["last 2 versions", "safari >= 7"]
//             }
//           }]
//         ]
//       }
//     }
//   ]
// };

const plugins = [
  new CopyPlugin([{
      from: path.resolve(__dirname, './src/index.html'),
      to: './build'
    },
    {
      from: path.resolve(__dirname, './src/manifest.json'),
      to: './build'
    },
    {
      from: path.resolve(__dirname, './src/sw.js'),
      to: './build'
    },
    {
      from: path.resolve(__dirname, './assets'),
      to: './build'
    },
    {
      from: path.resolve(__dirname, './favicon.ico'),
      to: './build'
    }
  ]),
  new webpack.optimize.ModuleConcatenationPlugin()
];

const devServer = {
  historyApiFallback: {
    index: './build/index.html',
  },
  disableHostCheck: true
};

const resolve = {
  modules: path.resolve(__dirname, './node_modules'),
  root: path.resolve(__dirname, './src'),
  extensions: ['', '.js']
};

// Production configs and setup
if (isProd) {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    })
  );
}

module.exports = {
  devtool,
  entry,
  output,
  module: modules,
  plugins,
  resolve,
  devServer
};

/* module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  devtool: 'source-map',
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.scss$/,
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
        ]
        // use: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: [
        //     {
        //       loader: 'css-loader',
        //       options: {
        //         sourceMaps: true
        //       }
        //     },
        //     {
        //       loader: 'sass-loader',
        //       options: {
        //         sourceMaps: true
        //       }
        //     }
        //   ]
        // })

      }
    ]
  },
  // plugins: [
  //   new ExtractTextPlugin('style.css')
  // ]
} */