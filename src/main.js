// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 导入路由模块
import router from './router'

// 导入ElementUI
import ElementUI from 'element-ui'
// 引入 导入ElementUI 的css文件
import 'element-ui/lib/theme-chalk/index.css'

// 导入css样式
import './assets/css/index.css'

// 安装ElementUI 插件'
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  // 将路由和Vue实例关联在一起
  router
})
