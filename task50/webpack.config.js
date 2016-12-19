var webpack = require('webpack');

module.exports = {
    entry: "./src/main.js",
    output: {
        path: "./dist",
        filename: "[name].js",
        publicPath: "/dist/"
    },
    module: {
        loaders: [
            {test: /\.vue$/ , loader: "vue"},
            { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
            { test: /\.css$/, loader: 'style!css!autoprefixer'},
        ]
    },
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime']
  }, 
    resolve: {
        extensions: ['', '.js', '.vue'],
        alias:{
            vue: "../dist/vue/vue.min.js",
        }
    },
}
