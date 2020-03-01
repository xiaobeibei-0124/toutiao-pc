import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入element-ui
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less'

Vue.config.productionTip = false
Vue.use(ElementUI) // 引入element-ui

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
