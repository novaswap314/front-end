const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const UnoCSS = require('@unocss/webpack').default
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')

let envPath = path.resolve(__dirname, `.env.${process.env.NODE_ENV}`);
require('dotenv').config({
  path: fs.existsSync(envPath)
    ? envPath
    : path.resolve(path.resolve(__dirname, '.env')),
})

module.exports = (env) => {
    console.log('envPath>>', process.env.ELECTRUMX_PROXY_BASE_URL)
    return {
        mode: process.env.NODE_ENV,  // 开发模式
        entry: './src/index.js', // 入口文件
        output: {
            // 必须是绝对路径
            path: path.resolve(__dirname, 'dist'), //打包后文件的输出位置
            filename: '[name].[contenthash].js',
            clean: true,  // 打包之前清理dist文件夹
            publicPath: '/',
        },
        resolve: {
            extensions: ['.jsx', '.json', '.ts', '.js'],
            alias: {
                '@': path.resolve(__dirname, 'src/'),
                '~': path.resolve(__dirname, '/'),
            },
            fallback: {
                "stream": false,
                "child_process": false,
                "fs": false,
                "os": false,
                "crypto": false,
                "http": false,
                "https": false,
                "url": false,
                "querystring": false,
                "zlib": false,
                "assert": false,

            }
        },
        devServer: {
            hot: true,
            static: './dist',
            historyApiFallback: true,
            proxy: [
                {
                    context: "/localapi",
                    target: process.env.PROXY_BASE_URL, // 被替换的目标地址，即把 /api 替换成这个
                    pathRewrite: {"^/localapi" : ""}, 
                    changeOrigin: true,
                }
            ]
        },
        experiments: {
            asyncWebAssembly: true,
        },
        plugins: [
            new htmlWebpackPlugin({
                favicon: './public/favicon.ico',
                template: './public/index.html',  // 生成HTML文件的模板文件
                filename: 'index.html',  // 生成的HTML文件名
                inject: 'body'  // <script>标签插入的地方
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css'
            }),
            UnoCSS(),
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
                process: 'process',
            }),
            new webpack.DefinePlugin({
                'process.env': JSON.stringify(process.env)
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.(css|less)$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
                },
                {
                    test: /\.wasm$/,
                    type: 'webassembly/async'
                },
                {
                    test: /\.(ts|tsx)$/,
                    use: [{
                        loader:'ts-loader',
                        options:{
                            transpileOnly: true,	// 只进行语法转换,不进行类型校验,提高构建速度
                        }
                    }],
                    exclude: /(node_modules)/,
                },
                {
                    test: /\.(png|svg)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'images/[contenthash][ext]'
                    }
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react',
                            ],
                            plugins: [
                                ["@babel/plugin-transform-runtime"]
                            ]
                        }
                    },
                },
            ]
        },
        optimization: {
            minimizer: [new CssMinimizerWebpackPlugin()],
            realContentHash: true,
        },
    }
}
