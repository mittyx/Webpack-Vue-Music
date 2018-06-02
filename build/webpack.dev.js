const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.js')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = merge(webpackBaseConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
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
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader'
                ]
            },
            {
                test: /\.s?[ac]ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader' // compiles Sass to CSS
                ]
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin()
    ]
})
