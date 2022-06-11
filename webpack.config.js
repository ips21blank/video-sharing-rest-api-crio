// const path = require('path');
const paths = require('./paths');

function getMode() {
  let mode = process.env.WEBPACK_MODE;
  return mode === 'development' ? mode : 'production';
}

module.exports = {
  mode: getMode(),
  target: 'node',

  // ALREADY IN DEFAULTS.
  // entry: path.resolve(__dirname, './src/index.ts'),
  // output: {
  //   path: path.resolve(__dirname, './dist'),
  //   filename: '[name].js'
  // },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: paths,
    fallback: {
      fs: false,
      os: false,
      net: false,
      url: false,
      util: false,
      http: false,
      path: false,
      zlib: false,
      crypto: false,
      stream: false,
      querystring: false,
      async_hooks: false
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/i,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }]
      }
    ]
  }
};
