const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const isDev = process.env.NODE_ENV === 'development'    //配置一个全局变量，判断环境
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const config = {
    target:'web',   //编译平台
    mode:'development',
    entry: path.join(__dirname,'src/index.js'), // 入口文件
    output: {   // 出口文件
        filename:'bundle.js',   // 文件名
        path: path.join(__dirname,'dist')   //文件目录
    },
    plugins:[
        new VueLoaderPlugin(),
        new htmlWebpackPlugin(),
        // 配置环境
        new webpack.DefinePlugin({
            NODE_ENV: isDev ? '"development"' : '"production"'
        })
    ],
    module:{
        rules:[ 
            {test:/\.vue$/,loader:'vue-loader'},
            {test:/\.js$/,loader:'babel-loader',exclude:'/node_mudules/'},
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.(gif|jpg|jpeg|png|svg)$/,use:[{loader:'url-loader',options:{limit:1024,name:'[name].[ext]'}}]},
            {test:/\.styl$/,use:['style-loader','css-loader','stylus-loader']}
        ]
    }
}

if(isDev){
    const devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port:8000,
        host:'0.0.0.0',
        overlay:{
            errors:true
        },
        hot:true
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}

module.exports = config