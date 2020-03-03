/**
 * 专门处理路由权限问题
 *
 */

// 引入路由
import router from '@/router'
// 注册全局前置守卫
// to 去哪  from 从哪来 next()必须执行的函数
// next() 直接通过
// next(false)跳转被停止
// next(新地址)改变轨迹去新的地方
router.beforeEach(function (to, from, next) {
  // 判断是否要去与主页相关的
  // startsWith()以……开头
  if (to.path.startsWith('/home')) {
    // 看是否有令牌
    const token = window.localStorage.getItem('user-token')
    token ? next() : next('/login')
  } else {
    next()
  }
})
