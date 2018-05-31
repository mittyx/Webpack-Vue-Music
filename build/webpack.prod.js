const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.base.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = merge(base, {
    mode: 'production',
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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css')
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist')
    }
})
