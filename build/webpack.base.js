const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: {
        './public/polyfills': './public/polyfills.js',
        './assets/js/mock': ['mockjs'],
        './assets/js/main': './src/main.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: { cacheDirectory: true }
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 10
                        }
                    }
                ]
            },
            {
                test: /\.mp3(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: './music/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.lrc(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: './music/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: [ { loader: 'url-loader', options: { 
                    limit: 1024 * 10,
                    name: './assets/imges/[name].[hash:7].[ext]'
                } } ]
            }
        ]
    },
    resolve: {
        mainFiles: ['index'],
        extensions: ['.js', '.vue'],
        alias: {
            '~': path.resolve(__dirname, '../src/assets/'),
            src: path.resolve(__dirname, '../src/'),
            root: path.resolve(__dirname, '../'),
            images: path.resolve(__dirname, '../src/assets/images')
        }
    },
    plugins: [
        new CleanWebpackPlugin([path.resolve(__dirname, '../dist')]),
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: true // 折叠空白区域 也就是压缩代码
            },
            hash: true,
            title: 'Custom template',
            template: 'index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../public/iconfont'), // 将src/assets下的文件
                to: './public/iconfont' // 复制到public
            },
            {
                from: path.resolve(__dirname, '../public/amfeFlexible'),
                to: './public/amfeFlexible'
            }
            // ,
            // {
            //     from: path.resolve(__dirname, '../src/assets/music'),
            //     to: './public/music'
            // }
        ])
    ],
    optimization: {
        splitChunks: {
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            chunks: 'async',
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                },
                commons: {
                    name: './assets/js/commons',
                    chunks: 'initial',
                    minChunks: 2
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'async',
                    name: 'vendors'
                    // priority: -10
                },
                mock: {
                    chunks: 'async',
                    name: 'mock',
                    priority: -10
                }
            }
        },
        runtimeChunk: 'single'
    }
}
