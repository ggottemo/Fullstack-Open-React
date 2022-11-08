const path = require('path');

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: [['@babel/preset-env', {
                        useBuiltIns: 'usage',
                        corejs: 3,
                        targets: {
                            "firefox": "64",
                            "esmodules": true
                        }
                    }], '@babel/preset-react']
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },


}

module.exports = config;