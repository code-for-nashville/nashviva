var path = require('path')

const webpackBase = {
  entry: ['./src/'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/js'),
    publicPath: '/js/'
  },
  module: {
    loaders: [
      {
        test: /(\.js|\.jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-2'],
          plugins: ['transform-runtime']
        }
      },
      {
        test: /(\.css|\.scss)$/,
        loaders: [
          require.resolve('style-loader'),
          require.resolve('css-loader') + '?sourceMap',
          require.resolve('sass-loader') + '?sourceMap'
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader?name=images/[name].[ext]'
      }
    ]
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'node_modules')],
    extensions: ['', '.js', '.jsx', '.scss', '.css']
  }
}

module.exports = webpackBase
