var path = require('path')
var webpack = require('webpack')
var fs = require('fs')
var config = require('../config')

process.env.NODE_ENV = 'development'
// 处理 worker 文件 现在写死 文件目录 后期需要改为通过main.js 获取work配置
const workerEntry = {}
const workers = fs.readdirSync('./src/workers').forEach((worker) => {
  workerEntry[`${worker.split('.')[0]}`] = `./src/workers/${worker}`
})

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: workerEntry,
  output: {
    libraryTarget: "var",
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist/workers'),
  },
  resolve: {
    alias: {
      '@': resolve('src'),
      'xyz$': process.env.NODE_ENV === 'development' ? resolve('src/environment/devConfig.js') : resolve('src/environment/preConfig.js')
    }
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: [resolve('src'), resolve('test')],
      use: [
        'babel-loader'
      ]
    }]
  }
}