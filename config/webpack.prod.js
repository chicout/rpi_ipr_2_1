const webpack = require('webpack');
const { merge } = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common');
const helpers = require('./helpers');
const environment = require('../src/environments/environment.prod');

module.exports = merge(commonConfig, {
    mode: environment.mode,

    output: {
        path: helpers.root('dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    module: {
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            })
        }]
    },

    plugins: [
        new ExtractTextPlugin('[name].[hash].css'),

        new webpack.DefinePlugin({
            'process.env': {
                'GLOBAL_PATH': JSON.stringify(environment.globalPath),
                'VERSION_PATH': JSON.stringify(environment.versionPath),
                'NEWS_API_KEY':  JSON.stringify(environment.newsApiKey)
            }
        })
    ]
});