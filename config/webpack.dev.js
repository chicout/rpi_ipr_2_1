const webpack = require('webpack');
const { merge } = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common');
const helpers = require('./helpers');
const environment = require('../src/environments/environment');

module.exports = merge(commonConfig, {
    mode: environment.mode,

    devtool: 'cheap-module-eval-source-map',

    output: {
        path: helpers.root('dist'),
        filename: '[name].js',
    },

    module: {
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        }]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'GLOBAL_PATH': JSON.stringify(environment.globalPath),
                'VERSION_PATH': JSON.stringify(environment.versionPath),
                'NEWS_API_KEY':  JSON.stringify(environment.newsApiKey)
            }
        }),
        new ExtractTextPlugin('[name].css')
    ],

    devServer: {
        historyApiFallback: true,
        hot: true,
        port: 8080,
        open: true,
        compress: true
    }
});