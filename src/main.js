import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入element-ui
import axios from 'axios' // 引入axios
import 'element-ui/lib/theme-chalk/index.css' // 引入element-UI的样式文件(官网)
import '@/styles/index.less' // 引入基础样式

Vue.config.productionTip = false
Vue.use(ElementUI) // 引入element-ui
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 设置基础地址
Vue.prototype.$axios = axios // 将axios赋值给vue对象的原型属性

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
