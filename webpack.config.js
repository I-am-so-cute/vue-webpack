const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: './src/js/index.js', //配置输入文件
  output: {
    filename: 'main.js', //配置输出文件名
    path: path.resolve(__dirname, 'dist'), //输出文件路径
    publicPath: 'dist/' // 用来指定静态资源发布地，不然后面图片会找不到的
  },
  module: {//用来配置非JS文件对应的loader【加载器
    rules: [ //非JS文件和loader加载器的匹配规则
      {
        test: /\.css$/,   //正则表达式，.表示一个或多个字符，而此处只需要匹配.css，所以用反斜杠\.表示只匹配点.，$表示以.css结尾
        use: [{ //use表示使用谁来处理，可以放入多个插件，插件的调用顺序是从后往前
            loader: MiniCssExtractPlugin.loader,//拆分css文件
            options: {
              publicPath: ''
            }
          },
          'css-loader' //解析css的插件
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/, 
        use: [
          'file-loader?name=[hash:8]-[name].[ext]'//解析图片的插件，因为会把所有图片都重新编码为base64放到根目录，所以会重命名，防止有图片名称相同。
          //自定义命名规则为，[hash:8]为：生成哈希值，取前8位；[name]为原本图片名；[ext]为原本图片后缀
        ]
      },
      { test: /\.vue$/, use: 'vue-loader' } // 处理 .vue 文件的 loader
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new htmlWebpackPlugin({
      template: './src/index.html', //指定要把哪个页面作为模板生成到内存中
      filename: path.resolve(__dirname, 'index.html')  //开发阶段，在根目录生成首页
    }),
    new VueLoaderPlugin()
  ]
}