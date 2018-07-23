import Vue from 'vue'
import App from './App'
import ext from './ext/ext'
// import activitieList from '@/components/activitieList'
import components from '@/components'
Vue.use(ext)
// components.install(Vue)
Vue.use(components)
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
console.log(Vue.component)
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#000'
    },
    tabBar: {
      backgroundColor: '#ffffff',
      color: '#999999',
      selectedColor: '#434343',
      list: [{
        'iconPath': 'static/img/index-normal.png',
        'selectedIconPath': 'static/img/index.png',
        'pagePath': 'pages/index/index',
        'text': '首页'
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
    }
  }
}
