import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入element-ui
import 'element-ui/lib/theme-chalk/index.css' // 引入element-UI的样式文件(官网)
import '@/styles/index.less' // 引入基础样式

Vue.config.productionTip = false
Vue.use(ElementUI) // 引入element-ui

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
