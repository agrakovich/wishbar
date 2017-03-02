const path = require('path')
const webpack = require('webpack')
//const bourbonPaths = require('node-bourbon').includePaths
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const isDebug = global.DEBUG === false ? false : !process.argv.includes('--release')

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        'babel-polyfill',
        './client/index'
    ],
    output: {
        path: path.resolve(__dirname, './public/assets'),
        publicPath: '/assets/',
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
                    //includePaths: [...bourbonPaths],
                },
                context: path.resolve(__dirname, 'client'),
                output: {
                    path: path.resolve(__dirname, './public/assets'),
                },
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
                    presets: ['react', 'es2015']
                }
            },
            //{ test: /\.(scss|sass)$/, loader: 'style-loader!css-loader!sass-loader' },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(scss|sass)$/,
                // using "loader" instead of newer "use"
                loader: ExtractTextPlugin.extract({
                    loader: [
                        {loader: 'style-loader'},
                        {
                            loader: 'css-loader',
                            // current extract-text-plugin supports query not never options format
                            query: {
                                importLoaders: 3,
                                minimize: true,
                                // Even if disabled sourceMaps gets generated
                                sourceMap: false
                            }
                        },
                        {loader: 'resolve-url-loader'},
                        {
                            loader: 'sass-loader',
                            query: {
                                // Enable sourcemaps for resolve-url-loader to work properly
                                sourceMap: true
                            }
                        },
                        // {
                        //     loader: 'sass-resources-loader',
                        // },
                    ],
                }),
                // options: {
                //     resources: ['./src/assets/styles/theme.scss']
                // },
            },
            {
                test: /\.md$/,
                loader: path.resolve(__dirname, './utils/webpack-loaders/markdown-loader.js'),
            },
            {
                test: /\.(png|jpg|jpeg|svg|woff|woff2|gif)$/,
                loader: 'url-loader',
                query: {
                    limit: 100,
                    name: "[path][name].[ext]",
                    context: './client/assets/',
                }
            },
            {
                test: /\.(eot|ttf|wav|mp3)$/,
                loader: 'file-loader',
            },
        ],
    },
    resolve: {
        modules: [
            'node_modules',
        ],
    }
}