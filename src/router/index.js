import Vue from 'vue'
// 1. 导入路由
import Router from 'vue-router'
// 导入创建的两个单文件组件
import Home from '@/components/home/Home'
import Login from '@/components/login/Login'

// 将路由通过vue注册到Vue中
Vue.use(Router)
// 创建路由实例,配置路由规则
const router = new Router({
  routes: [
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
})

export default router
