const path = require('path')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = merge(webpackBaseConfig, {
    mode: 'production',
    devtool: false,
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader']
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
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
        ])
    ]
})
