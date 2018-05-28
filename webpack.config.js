const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: 'development',
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
        open: true
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
                use: [
                    process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
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
            Utilities: path.resolve(__dirname, 'src/assets/')
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
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new VueLoaderPlugin(),
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
