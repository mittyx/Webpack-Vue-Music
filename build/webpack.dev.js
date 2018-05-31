const merge = require('webpack-merge')
const base = require('./webpack.base.js')
const webpack = require('webpack')

module.exports = merge(base, {
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
                test: /\.vue$/,
                use: 'vue-loader'
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
        new webpack.HotModuleReplacementPlugin()
    ]
})
