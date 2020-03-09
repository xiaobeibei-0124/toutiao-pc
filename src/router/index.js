import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import Login from '@/views/login'
import secondHome from '@/views/home/second_home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: Login,
    name: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // 二级路由 home下的二级路由写在一级路由下的children中
    children: [{
      path: '', // 什么都不写默认是二级路由的默认组件
      component: secondHome
    },
    {
      path: 'comment',
      component: () => import('@/views/comment')
    },
    {
      path: 'material',
      component: () => import('@/views/material')
    },
    {
      path: 'articles',
      component: () => import('@/views/articles')
    },
    {
      path: 'publish',
      component: () => import('@/views/publish')
    }
    ]
  }
  // {
  //   //按需加载
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
