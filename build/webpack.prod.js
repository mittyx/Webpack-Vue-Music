const path = require('path')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = merge(webpackBaseConfig, {
    mode: 'production',
    devtool: false,
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.s?[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
            // {
            //     test: /\.css$/,
            //     use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader', 'postcss-loader']
            // }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: './assets/css/[name].[hash:7].css'
        }),
        new UglifyJsPlugin({
            test: /\.js($|\?)/i,
            uglifyOptions: {
                warnings: false,
                compress: {
                    drop_debugger: true,// 去除debugger
                    warnings: true,
                }
            },
            parallel: true
        })
    ]
})
