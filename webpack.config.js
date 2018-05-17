const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',

    entry: {
        polyfills: './deploy/polyfills.js',
        index: './src/index.js'
    },
    devServer: {
        contentBase: '.dist',
        hot: true
    },
    module: {
        rules: [
            {  
                test: /\.js$/,  
                exclude: /(node_modules|bower_components)/,  
                use: {  
                    loader: 'babel-loader',  
                    options:{  
                        cacheDirectory:true, //缓存  
                    }  
                }  
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/, 
                use: [{ loader: 'url-loader',options: { limit: 8192 } }] 
            }
        ]      
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Hot Module Replacement'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],

    //output为输出 path代表路径 filename代表文件名称
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}