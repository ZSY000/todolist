const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const isDev = process.env.NODE_ENV === 'development'    //配置一个全局变量，判断环境
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// css分离打包
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = {
    target:'web',   //编译平台
    entry: path.join(__dirname,'src/index.js'), // 入口文件
    output: {   // 出口文件
        filename:'bundle.[hash:8].js',   // 文件名
        path: path.join(__dirname,'dist')   //文件目录
    },
    plugins:[
        new VueLoaderPlugin(),
        new htmlWebpackPlugin(),
        // 配置环境
        new webpack.DefinePlugin({
            NODE_ENV: isDev ? '"development"' : '"production"'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    module:{
        rules:[ 
            {test:/\.vue$/,loader:'vue-loader'},
            {test:/\.js$/,loader:'babel-loader',exclude:'/node_mudules/'},
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.(gif|jpg|jpeg|png|svg)$/,use:[{loader:'url-loader',options:{limit:1024,name:'[name].[ext]'}}]},
            // 根据环境来加载
            // {test:/\.styl/,use:['style-loader','css-loader',{loader:'postcss-loader',options:{sourceMap:true}},'stylus-loader']},
            {test:/\.jsx$/,loader:'babel-loader'}
        ]
    }
}

if(isDev){
    config.module.rules.push({
        test:/\.styl/,
        use:[
            'style-loader',
            'css-loader',
            {
                loader:'postcss-loader',
                options:{sourceMap:true}
            },
            'stylus-loader'
        ]
    })
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
}else{
    config.entry = {
        app: path.join(__dirname,'src/index.js'),
        vendor: ['vue']
    }
    config.output.filename = '[name].[chunkhash:8].js'
    config.module.rules.push({
        test: /\.styl/,
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true
                }
            },
            'stylus-loader'
        ]
    })
    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: "styles.[chunkhash:8].css",
            chunkFilename: "[id].css"
        })
    )
    config.optimization = {   
        splitChunks:{
            cacheGroups: {
                commons: {
                    name: "vendor",
                },
            },
        },
        runtimeChunk: true      
    }
}

module.exports = config