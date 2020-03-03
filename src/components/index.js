// 封装方法 在main.js中用vue.ues调用
// Vue.use会调用对象中的install方法 install方法第一个参数 是Vue对象
import layoutAside from './home/layout-aside.vue' // 引入组件
import layoutHeader from './home/layout-header.vue'

export default {
  install: function (Vue) {
    //   注册全局组件 Vue 一旦注册 在任意位置都可以使用
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
  }
}
