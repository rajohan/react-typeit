const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: ["@babel/polyfill", "./src/index.js"],
    output: {
        filename: "js/bundle.js",
        path: path.resolve(__dirname, "build"),
        publicPath: ""
    },
    mode: "development",
    devServer: {
        contentBase: path.resolve(__dirname, "build"),
        index: "index.html",
        port: 3000,
        open: true,
        stats: "errors-only"
    },
    module: {
        rules: [
            {
                test: /\.(gif|png|jpe?g|svg)$/,
                use: [{loader: "file-loader", options: {outputPath: "images/"}}]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
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
    plugins: [
        new CopyWebpackPlugin([{from: 'src/images', to: 'images'}]),
        new CleanWebpackPlugin("build"),
        new HtmlWebpackPlugin({template: "src/index.html"})
    ]
};