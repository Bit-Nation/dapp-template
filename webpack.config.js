const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: ['babel-polyfill', './main.js'],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'lib')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};