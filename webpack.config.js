const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //mode: 'development', // or production
    mode: 'production',
    entry: {
        starter: './src/app/app.module.js'
    },
    module: {
        rules: [{
            test: /\.html$/,
            loader: 'html-loader',
            options: {
                minimize: true
            }
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        }]
    },
    externals: [
        //'bootstrap',
        'src/app/lib/angular/angular.js',
        'src/app/lib/html5-boilerplate/angular.js',
        'src/app/lib/angular-route/angular-route.js'
    ],
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve('./dist/')
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/app/index.html',
            filename: 'index.html'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8000,
        overlay: true
    }

}
