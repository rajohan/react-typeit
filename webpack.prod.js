const path = require("path");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safeParser = require('postcss-safe-parser');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: ["@babel/polyfill", "./src/TextEditor.js"],
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "build"),
        publicPath: "./",
        library: "ReactTypeIt",
        libraryTarget: "umd",
        umdNamedDefine: true,
        globalObject: 'typeof self !== \'undefined\' ? self : this',
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
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
            })
        ],
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
        new CleanWebpackPlugin("build")
    ]
};