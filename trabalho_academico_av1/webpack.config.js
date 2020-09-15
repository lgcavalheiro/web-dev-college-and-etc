const webpack = require('webpack');
const miniCss = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: {
        entry: './frontend/entry.js',
        index: './frontend/js/index.js',
        "home-aluno": './frontend/js/home-aluno.js',
        "home-professor": './frontend/js/home-professor.js',
    },
    output: {
        filename: '[name].js',
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
                use: ['file-loader?name=[name].[ext]']
            }
        ]
    }
}