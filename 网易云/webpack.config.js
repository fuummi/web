const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: {
        index:'./src/js/index.js',
        banner:'./src/js/banner.js',
        nowplay:'./src/js/nowplay.js',
        play:'./src/js/play.js',
        plays:'./src/js/plays.js',
        search:'./src/js/search.js',
        songList:'./src/js/songList.js',
        test:'./src/js/test.js',
        login:'./src/js/login.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath: '/dist'
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(gif|png|jpg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/',
                            esModule: false,
                        }
                    }
                ],
            },
            {
                test: /\.html$/,
       　　　　　loader: 'html-withimg-loader'
             }
       
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src/index.html') ,filename: 'index.html'}),
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src/play.html') ,filename: 'play.html'}),
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src/search.html') ,filename: 'search.html'}),
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src/songlist.html') ,filename: 'songlist.html'}),
    ],
}