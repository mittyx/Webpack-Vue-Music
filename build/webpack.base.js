const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: {
        './public/polyfills': './public/polyfills.js',
        main: './src/main.js',
        vendors: ['vue', 'vue-router', 'vuex', 'axios', 'vue-template-compiler']
    },
    output: {
        filename: '[name].js',
        // chunkFilename: 'js/[name].js',
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
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: [ { loader: 'url-loader', options: { limit: 1024 * 10 } } ]
            }
        ]
    },
    resolve: {
        mainFiles: ['index'],
        extensions: ['.js', '.vue'],
        alias: {
            '~': path.resolve(__dirname, '../src/assets/')
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {root: '../'}),
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: true // 折叠空白区域 也就是压缩代码
            },
            hash: true,
            title: 'Custom template',
            template: 'index.html'
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    name: 'vendors',
                    priority: -10
                }
            }
        },
        runtimeChunk: 'single'
    }
}
