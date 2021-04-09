const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');  //注意写法不同，并且首字母C必须大写
const optimizeCssAssetsWebpackPlugin=require('optimize-css-assets-webpack-plugin');//压缩css

module.exports = {
  mode : 'production',//生产环境下会自动压缩js代码
  entry: './src/js/index.js', //配置输入文件
  output: {
    filename: 'js/main.js', //配置输出文件名
    path: path.resolve(__dirname, 'dist'), //输出文件路径
    publicPath: './' // 用来指定静态资源发布地，以index_publish为基准
  },
  module: {//用来配置非JS文件对应的loader【加载器
    rules: [ //非JS文件和loader加载器的匹配规则
      {
        test: /\.css$/,   //正则表达式，.表示一个或多个字符，而此处只需要匹配.css，所以用反斜杠\.表示只匹配点.，$表示以.css结尾
        use: [{ //use表示使用谁来处理，可以放入多个插件，插件的调用顺序是从后往前
            loader: MiniCssExtractPlugin.loader,//拆分css文件
            options: {
              publicPath: '../'   //设置Css文件中的公共路径，防止把css文件放入css文件夹以后找不到图片。以main.css为基准
            }
          },
          'css-loader' //解析css的插件
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/, 
        use: [
          'file-loader?name=images/[hash:8]-[name].[ext]'//解析图片的插件，因为会把所有图片都重新编码为base64放到根目录，所以会重命名，防止有图片名称相同。
          //自定义命名规则为，[hash:8]为：生成哈希值，取前8位；[name]为原本图片名；[ext]为原本图片后缀
          //通过images/把图片都放到一个单独的文件夹中
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "[id].css"
    }),
    new htmlWebpackPlugin({
      template: './src/index.html', //指定要把哪个页面作为模板生成到内存中
      filename: path.resolve(__dirname, 'dist/index_publish.html'),      //发布阶段，在dist文件夹生成首页
      minify:{//压缩html
        removeComments:true,   //移除注释
        collapseWhitespace:true,//合并空白字符
        removeAttributeQuotes:true//移除属性上的引号
      }
    }),
    new optimizeCssAssetsWebpackPlugin(),//压缩css
    new CleanWebpackPlugin()
  ]
}