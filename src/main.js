import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

//导入全局样式表
import './assets/css/global.css'
Vue.config.productionTip = false
//导入axios
import axios from 'axios'
//每一个vue组件都可以通过this.$http访问axios
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
Vue.prototype.$http = axios



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
