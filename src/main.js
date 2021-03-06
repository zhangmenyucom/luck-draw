import '../static/sdk/ald-stat'
// import './common/js/ald-stat'
import Vue from 'vue'
import App from './App'
import ext from './ext/ext'

// import activitieList from '@/components/activitieList'
// import components from '@/components'
Vue.use(ext)
// components.install(Vue)
// Vue.use(components)
// components.forEach((component) => {
//   if (component.default.name) {
//     // const name = component.default.name
//     // console.log(component.default.name, component.default)
//     // console.log('activitieListactivitieList', activitieList === component.default)
//     Vue.component('activitieList', activitieList)
//   }
// })
// console.log('activitieList====', activitieList)
// var a = 'name'
// Vue.component('activitieList', activitieList)
// console.log('==1==')
// console.log(Vue.component)
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/index'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#000',
      navigationStyle: 'custom'
    },
    // workers: 'workers',
    tabBar: {
      backgroundColor: '#ffffff',
      color: '#999999',
      selectedColor: '#434343',
      list: [{
        'iconPath': 'static/img/index-normal.png',
        'selectedIconPath': 'static/img/index.png',
        'pagePath': 'pages/index/index',
        'text': '抽奖'
      // #warning  暂时不上
      // }, {
      //   'iconPath': 'static/img/createDraw.png',
      //   'selectedIconPath': 'static/img/createDraw1.png',
      //   'pagePath': 'pages/baseCreateActivityHome/index',
      //   'text': '发起抽奖'
      }, {
        'iconPath': 'static/img/obtain-normal.png',
        'selectedIconPath': 'static/img/obtain.png',
        'pagePath': 'pages/obtainGoldBean/index',
        'text': '赚金豆'
      }, {
        'iconPath': 'static/img/user-normal.png',
        'selectedIconPath': 'static/img/user.png',
        'pagePath': 'pages/infoDetail/index',
        'text': '我的'
      }]
    },
    navigateToMiniProgramAppIdList: [
      // 'wx8e18aa1fa3957964', // 正版抽奖
      // 'wx863f2ae4c229d733', // 榕港
      // 'wxe2e9103368bb3884', // 京料理
      // 'wx0cdcad29618b74a3', // 混沌
      // 'wxcc097374656e18a3', // 华莱士
      'wx2c9a9ada28d13fe8', // 2048
      'wx2c6bf13295abb15f' // 生活福利惠
    ]
  }
}
