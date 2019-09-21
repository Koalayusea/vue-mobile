const path = require('path')

// 导入内存中生成 HTML 页面的插件
const htmlWebpackPlugin = require('html-webpack-plugin')

const { VueLoaderPlugin } = require('vue-loader');


// 这个配置文件，其实就是 JS 文件，通过 Node 中的模块操作，向外暴露了一个配置对象
module.exports = {
    //  需要配置入口和出口
    entry: './src/main.js',//入口
    output: {   //输入文件配置
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    mode: 'development',
    devServer: { //这是配置 dev-server 命令参数的第二组形式，相对来说麻烦一点
        // --open --port 3000 --contentBase src --hot
        open: true,  //自动打开浏览器
        port: 3000,  //设置启动时的运行端口
        // contentBase: 'src', //指定托管的根目录
        hot: true //启动热更新
    },
    plugins: [
        //配置插件的节点
        new htmlWebpackPlugin({
            // 创建一个在内存中生成 HTML 页面的插件
            template: './src/index.html',
            filename: 'index.html',
        }),
        new VueLoaderPlugin()
    ],
    module: {    //这个节点配置所有第三方加载器
        rules: [     //所有第三方模块的匹配规则
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/, use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: '[hash:8]-[path][name].[ext]'
                    }
                }]
            },
            // 处理字体文件
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: ["@babel/plugin-transform-runtime", "@babel/plugin-proposal-function-bind", "@babel/plugin-proposal-class-properties"]
                    }
                }
            },
            { test: /\.vue$/, use: 'vue-loader' }
        ]
},
    resolve: {
    alias: {
        // 'vue$': "vue/dist/vue.js"
    }
}
}

// 使用 webpack-dev-server 这个工具，来实现自动打包编译的功能
// 1.运行 npm i webpack-dev-server -D 把这个工具安装到项目的本地开发依赖
// 2.安装完成后，这个工具的用法，和 webpack 命令的用法，完全一致
// 3.由于是在项目中，本地安装的 webpack-dev-server ，所以无法当做脚本，在 powershell 终端中直接运行（只有那些安装到全局 -g 的工具，才能在终端中正常执行）
// 4.如果 webpack-dev-server 这个工具，如果想要正常运行，需要在本地项目中，安装 webpack,webpack-cli( cnpm i webpack -D/cnpm i webpack-cli -D )
// 5. webpack-dev-server 帮我们打包生成的 bundle.js 并没有存放到实际的物理磁盘上，而是托管到了电脑的内存中，所以我们在项目根目录中，根本找不到打包好的 bundle.js
// 6.webpack-dev-server 以虚拟的形式托管到了项目的根目录中