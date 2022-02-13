const { VueLoaderPlugin } = require('vue-loader')
const path = require('path');
module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: ['vue-loader']
        }
        ]
    },
    // plugins: [
    //     // 请确保引入这个插件！
    //     new VueLoaderPlugin()
    // ]
}