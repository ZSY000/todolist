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
        // 生成html文件，不用手动处理bundle.js文件
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
            // url-loader可以将小于limit：1024的图片转成base64的代码放入js文件中
            // options是为loader配置参数
            // [name].[ext]：图片名.扩展名，可以加其他字符
            // url-loader依赖file-loader
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

    // 映射代码，便于调试
    const devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port:8000,
        host:'0.0.0.0',
        overlay:{
            errors:true
        },
        hot:true    // 不用刷新，只重新渲染更改组件
    }
    config.plugins.push(
        // 热更新
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