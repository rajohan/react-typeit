const path = require("path");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safeParser = require('postcss-safe-parser');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: ['@babel/polyfill', "./src/index.js"],
    output: {
        filename: "js/bundle.[contentHash].js",
        path: path.resolve(__dirname, "build"),
        publicPath: "./"
    },
    mode: "production",
    stats: {children: false},
    module: {
        rules: [
            {
                test: /\.(gif|png|jpe?g|svg)$/,
                use: [{loader: "file-loader", options: {outputPath: "images/"}}]
            },
            {
                test: /\.css$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader, options: {publicPath: "../"}},
                    "css-loader",
                    {loader: "postcss-loader", options: {plugins: () => [autoprefixer()]}}
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader, options: {publicPath: "../"}},
                    "css-loader",
                    {loader: "postcss-loader", options: {plugins: () => [autoprefixer()]}},
                    "sass-loader"
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    externals: {
        // Don't bundle react or react-dom
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "React",
            root: "React"
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "ReactDOM",
            root: "ReactDOM"
        }
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    },
    plugins: [
        new ProgressBarPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/bundle.[contentHash].css"
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /css\/bundle\..*\.css$/,
            cssProcessor: require("cssnano"),
            cssProcessorOptions: {parser: safeParser, discardComments: {removeAll: true}},
            canPrint: true
        }),
        new CopyWebpackPlugin([{from: 'src/images', to: 'images'}]),
        new CleanWebpackPlugin("build"),
        new HtmlWebpackPlugin({template: "src/index.html"})
    ]
};