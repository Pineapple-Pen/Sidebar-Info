const path = require('path');
const webpack = require('webpack');

// See: https://stackoverflow.com/questions/37788142/webpack-for-back-end

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');


const common = {
  context: SRC_DIR,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  node: {
    fs: 'empty'
  }
};

const client = {
  entry: './client.js',
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'env']
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
    ],
  },
};

const server = {
  entry: './server.js',
  target: 'node',
  output: {
    path: DIST_DIR,
    filename: 'bundle-server.js',
    libraryTarget: 'commonjs-module'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'env']
        }
      },
      {
        test: /\.css$/,
        use: [
          'css-loader'
        ]
      },
    ],
  },
};

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server)
];






// const webpack = require('webpack');
// const path = require('path');

// const common = {
//   // devtool: "source-map",
//   node: {
//     fs: 'empty'
//   }
// }

// const client = {
//   entry: './client/src/client.js',
//   output: {
//     path: __dirname + '/client/dist',
//     filename: 'bundle.js'
//   },
//   module: {
//     loaders: [
//       {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['react', 'es2015', 'env']}},
//       {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['react', 'es2015', 'env']}},
//       {test: /\.css$/, loader: ['style-loader', 'css-loader']}
//     ]
//   }
// };

// const server = {
//   entry: './client/src/server.js',
//   target: 'node',
//   output: {
//     path: __dirname + '/client/dist',
//     filename: 'bundle-server.js',
//     libraryTarget: 'commonjs-module'
//   },
//   module: {
//     loaders: [
//       {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['react', 'es2015', 'env']}},
//       {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['react', 'es2015', 'env']}},
//       {test: /\.css$/, loader: ['css-loader']}
//     ]
//   }
// };

// module.exports = [
//   Object.assign({}, common, client),
//   Object.assign({}, common, server)
// ];
