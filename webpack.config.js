var webpack = require('webpack');

module.exports = {
    entry:"./src/index.js",
    output: {
        path: __dirname + "/public/build",
        publicPath: "build/",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: './public'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.jsx?$/,         // Match both .js and .jsx files
                exclude: /node_modules/,
                loader: "babel-loader",
                query:
                    {
                        presets:['react']
                    }
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
        ]
    }
}