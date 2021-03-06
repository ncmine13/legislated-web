var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = function (config) {
  return {
    entry: [
      'babel-polyfill',
      './src/app.js'
    ],
    output: {
      path: path.resolve('./dist'),
      filename: 'bundle-[hash].js',
      publicPath: '/'
    },
    resolve: {
      alias: {
        shared: path.resolve('./src/shared')
      }
    },
    devtool: 'source-map',
    devServer: {
      historyApiFallback: true
    },
    plugins: [
      new CleanWebpackPlugin([
        'dist'
      ]),
      new webpack.DefinePlugin({
        'process.env': {
          'ENVIRONMENT': JSON.stringify(config.env)
        }
      }),
      new HtmlWebpackPlugin({
        template: './src/index.ejs',
        favicon: './assets/logo.png'
      }),
      new CopyWebpackPlugin([{
        from: 'assets',
        to: 'assets'
      }])
    ],
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loaders: [
          'file-loader?name=assets/[name].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }]
    }
  }
}
