const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        './public/polyfills': './public/polyfills.js',
        './public/amfeFlexible': './public/amfeFlexible/index.min.js',
        main: './src/main.js'
    },
    devServer: {
        contentBase: './dist',
        host: 'localhost',
        port: 8090,
        hot: true,
        open: true,
        overlay: { // 当有编译错误或者警告的时候显示一个全屏overlay
            errors: true,
            warnings: false
        },
        clientLogLevel: 'warning',
        noInfo: true,
        quiet: true,
        watchOptions: {
            poll: false
        }
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
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [ { loader: 'url-loader', options: { limit: 8192 } } ]
            },
            {
                test: /\.s?[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ]
    },
    resolve: {
        mainFiles: ['index'],
        extensions: ['.js', '.vue'],
        alias: {
            '~': path.resolve(__dirname, 'src/assets/')
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: true // 折叠空白区域 也就是压缩代码
            },
            hash: true,
            title: 'Custom template',
            template: 'index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),

        new ExtractTextPlugin('style.css'),

        // 复制项目
        new CopyWebpackPlugin([ // 支持输入一个数组
            {
                from: path.resolve(__dirname, 'public/iconfont'), // 将src/assets下的文件
                to: './public/iconfont' // 复制到public
            }
        ])
    ],

    // output为输出 path代表路径 filename代表文件名称
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
}
