const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: {
        './public/polyfills': './public/polyfills.js',
        main: './src/main.js'
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
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: [ { loader: 'url-loader', options: { limit: 1024 * 10 } } ]
            }
        ]
    },
    resolve: {
        mainFiles: ['index'],
        extensions: ['.js', '.vue'],
        alias: {
            '~': path.resolve(__dirname, '../src/assets/'),
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
                    minChunks: 1
                },
                common: {// ‘src/js’ 下的js文件
                    chunks: 'all',
                    test: /[\\/]src[\\/]js[\\/]/, // 也可以值文件/[\\/]src[\\/]js[\\/].*\.js/
                    name: 'common', // 生成文件名，依据output规则
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority: 1
                }
            }
        },
        runtimeChunk: 'single'
    }
}
