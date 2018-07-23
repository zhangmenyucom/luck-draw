// const context = require.context('./', false, /\.vue$/)
// const keys = context.keys().filter(item => item !== './index.js')

// const components = []
// for (let i = 0; i < keys.length; i += 1) {
//   components.push(context(keys[i]))
// }

// export default components
import activitieList from './activitieList'
export default {
  install (Vue) {
    // components.forEach((component, i) => {
    //   console.log(i)
    //   if(component.default.name){
    //     Vue.component(component.default.name, component.default)
    //   }
    // })
    Vue.component('activitieList', activitieList)
  }
}
