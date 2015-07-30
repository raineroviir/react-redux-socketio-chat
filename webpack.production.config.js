var webpack = require('webpack')
var path = require('path')

module.exports = {
  context: __dirname,
  entry: [ 'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  devtool: '#source-map',
  module: {
    loaders: [{
      test: /\.js?$/,
      loaders: ['react-hot', 'babel?stage=0'],
      exclude: /node_modules/
    }, {
      test: /\.css?$/,
      loaders: ['style', 'raw']
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};
