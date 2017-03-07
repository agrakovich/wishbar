const path = require('path')
const webpack = require('webpack')
const nodeRefillsPaths = require("bourbon").includePaths;
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const isDebug = global.DEBUG === false ? false : !process.argv.includes('--release')

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        'babel-polyfill',
        './client/index'
    ],
    output: {
        path: path.resolve(__dirname, '/'),
        publicPath: '/',
        sourcePrefix: '  ',
        filename: 'main.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin({
            filename: 'main.css',
            allChunks: true
        }),
        new webpack.LoaderOptionsPlugin({
            debug: isDebug,
            minimize: !isDebug,
            options: {
                sassLoader: {
                    includePaths: [...nodeRefillsPaths],
                }
            }
        })
    ],
    devtool: isDebug ? 'source-map' : false,
    target: "web",
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, './client'),
                ],
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            },
            { test: /\.(scss|sass)$/, loader: 'style-loader!css-loader!sass-loader' },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {
                test: /\.(png|jpg|jpeg|svg|woff|woff2|gif)$/,
                loader: 'url-loader',
                query: {
                    limit: 100,
                    name: "[path][name].[ext]",
                    context: './client/assets/',
                }
            }
        ],
    },
    resolve: {
        modules: [
            'node_modules',
        ],
    }
}