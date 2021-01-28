//加载path模块
const path = require('path')
//定义resolve方法，把相对路径转换成绝对路径
const resolve = dir => path.join(__dirname, dir)


//
//
module.exports = {
  //引入下边得
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('api', resolve('src/api'))
      .set('views', resolve('src/views'))
      .set('components', resolve('src/components'))
  },
  devServer: {
    // ....
    proxy: {
      //配置跨域
      '/api': {
        target: 'http://admintest.happymmall.com/', // 接口的域名
        ws: true, // 是否启用websockets
        changOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

}