'use strict'

var path = require('path');
var webpack = require("webpack");
var GasPlugin = require("gas-webpack-plugin");

let config = {
    entry: {
        "app-client" : './src/ts/client/entrypoint.ts',
        "app-server" : './src/ts/server/entrypoint.ts'
    },
    output: {
        filename: '[name].bundle.js',
        path: __dirname + "/dist"
    },
    devtool: "source-map",
    resolve: {
        extensions: ['.ts','.tsx']
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    plugins: [
        //new GasPlugin()
    ]
};

module.exports = config;
