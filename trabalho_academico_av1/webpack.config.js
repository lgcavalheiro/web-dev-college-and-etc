const webpack = require('webpack');
const miniCss = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: './frontend/index.js',
    output: {
        filename: 'index.js',
        path: __dirname + '/public'
    },
    plugins: [
        new miniCss({
            filename: 'index.css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.s?[ac]ss$/,
                use: [miniCss.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            }
        ]
    }
}