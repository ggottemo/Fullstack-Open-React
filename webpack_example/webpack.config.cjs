const path = require('path');
const webpack = require('webpack');

const config = (env, argv) => {
    console.log('argv.mode', argv.mode);

    const backend_url = argv.mode === 'development' ? 'http://localhost:3001/anecdotes' : 'https://fullstackopen.com';

    return {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.js'
    },
    devServer: {
        static: path.resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            BACKEND_URL: JSON.stringify(backend_url)
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }


}
}


module.exports = config;