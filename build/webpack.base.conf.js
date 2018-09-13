var path = require('path')
  // var fs = require('fs')
  var utils = require('./utils')
  var config = require('../config')
  var vueLoaderConfig = require('./vue-loader.conf')
  var MpvuePlugin = require('webpack-mpvue-asset-plugin')
  var glob = require('glob')
  var MpvueEntry = require('mpvue-entry')
  var CopyWebpackPlugin = require('copy-webpack-plugin')
  var fs = require('fs')

  function resolve(dir) {
    return path.join(__dirname, '..', dir)
  }

  function getEntry(rootSrc, pattern) {
    var files = glob.sync(path.resolve(rootSrc, pattern))
    return files.reduce((res, file) => {
      var info = path.parse(file)
      var key = info.dir.slice(rootSrc.length + 1) + '/' + info.name
      res[key] = path.resolve(file)
      return res
    }, {})
  }

  const appEntry = {
    app: resolve('./src/main.js')
  }
  const pagesEntry = getEntry(resolve('./src'), 'pages/**/main.js')
// console.log('process.env.NODE_ENV', process.env.NODE_ENV)
const rules = process.env.DISABLE_ESLINT == 'no'?[]:[
{
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter')
  }
}]

// 处理 worker 文件 现在写死 文件目录 后期需要改为通过main.js 获取work配置
const workerEntry = {}
const workers = fs.readdirSync('./src/workers').forEach((worker) => {
  workerEntry[`../../workers/${worker.split('.')[0]}`] = `./src/workers/${worker}`
})

// page 入口页
let vueEntry
const entry = async () => {
  // 此处易引起循环引用
  if(!vueEntry){
    vueEntry = await MpvueEntry.getEntry('src/pages.js')()
  }
  return {...vueEntry}
}
module.exports = {
  // 如果要自定义生成的 dist 目录里面的文件路径，
  // 可以将 entry 写成 {'toPath': 'fromPath'} 的形式，
  // toPath 为相对于 dist 的路径, 例：index/demo，则生成的文件地址为 dist/index/demo.js
  // entry,
  entry: MpvueEntry.getEntry({
    pages : 'src/pages.js',
    app : 'dist/dist/app.json'
  }),
  target: require('mpvue-webpack-target'),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
    config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue': 'mpvue',
      '@': resolve('src'),
      'config': process.env.NODE_ENV === 'development' ? resolve('src/environment/devConfig') : resolve(`src/environment/${process.env.NODE_ENV}Config`)
    },
    symlinks: false,
    aliasFields: ['mpvue', 'weapp', 'browser'],
    mainFields: ['browser', 'module', 'main']
  },
  module: {
    rules: [...rules, {
      test: /\.vue$/,
      loader: 'mpvue-loader',
      options: vueLoaderConfig
    }, {
      test: /\.js$/,
      include: [resolve('src'), resolve('test')],
      use: [
      'babel-loader', {
        loader: 'mpvue-loader',
        options: {
          checkMPEntry: true
        }
      }
      ]
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('img/[name].[ext]')
      }
    }, {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('media/[name].[ext]')
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('fonts/[name].[ext]')
      }
    }]
  },
  plugins: [
  new MpvuePlugin(),
  new MpvueEntry()
  // new CopyWebpackPlugin([{
  //   from: path.resolve(__dirname, '../src/services/meScoresService.js'),
  //   to: path.resolve(__dirname, '../dist/services/meScoresService.js'),
  // }])
]
}