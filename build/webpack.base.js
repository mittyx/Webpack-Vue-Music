const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: {
        './public/polyfills': './public/polyfills.js',
        './public/amfeFlexible': './public/amfeFlexible/index.min.js',
        main: './src/main.js'
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
        }),
        new VueLoaderPlugin()
    ]
}
