const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        publicPath:'/',
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    mode: "development",
    module: {},
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ template: 'index.html' }),
        new webpack.HotModuleReplacementPlugin()
    ],
    
}