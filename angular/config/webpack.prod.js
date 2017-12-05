var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var S3Plugin = require('webpack-s3-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

var ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      mangle: {
        keep_fnames: true
      }
    }),
    new ExtractTextPlugin({filename: '[name].[hash].css'}),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),
    new S3Plugin({
      // Exclude uploading of html 
      // exclude: /.*\.html$/,
      // s3Options are required 
      s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: 'us-east-1'
      },
      s3UploadOptions: {
        Bucket: 'jrw-psst-angular'
      },
      cdnizerOptions: {
        defaultCDNBase: 'https://psst.dayspring-tech.net'
      }
    })    
  ]
});
