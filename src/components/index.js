// 封装方法 在main.js中用vue.ues调用
// Vue.use会调用对象中的install方法 install方法第一个参数 是Vue对象
import layoutAside from './home/layout-aside.vue' // 引入组件
import layoutHeader from './home/layout-header.vue'
import breadcrumb from './common/bread-crumb.vue'
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  install: function (Vue) {
    //   注册全局组件 Vue 一旦注册 在任意位置都可以使用
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
    Vue.component('bread-crumb', breadcrumb)
    Vue.use(VueQuillEditor)
  }
}
