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
// 导航守卫
// router.beforeEach 注册一个全局前置守卫：
router.beforeEach((to, form, next) => {
  // 1 如果访问的是登录页，直接展示登录页面
  if (to.path === '/login') {
    return next()
  }
  // 判断有没有登录
  const token = localStorage.getItem('token')
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
