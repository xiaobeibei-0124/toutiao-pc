// 1.封装请求工具，给request进行二次封装
// 2.设置请求拦截器
// 语法：axios.interceptors.request.use(function(){},function(){})
// 两个返回函数 成功执行第一个，失败执行第二个

// 引入axios,处理关于请求相关，就把基地址在这里设置
import axios from 'axios'
import router from '@/router'
import JSONBig from 'json-bigint' // 引入大数字处理文件
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

axios.defaults.transformResponse = [function (data) {
  // 判断相应回来的数据是否为空 为空的话就不转换了
  // 后端到前端是字符串到数组 数组有一定的精度限制 所以应用第三方插件进行大数字转化
  // 相应前转化为了大数字对象，在页面引用是要将大数字对象转成相应的字符串
  // 对应的是此项目中的留言列表中的id值
  return data ? JSONBig.parse(data) : {}
}]

axios.interceptors.request.use(function (config) {
  // 第一个参数传入一个config config就是所有axios的请求信息
  const token = localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  return Promise.reject(error)
})
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {} // 判断是否有响应的数据，有的话就返回data 脱掉一层 没有就是空数组
}, function (error) {
  // 如果现实401就是拿错钥匙/钥匙过期/钥匙没拿/钥匙名不对/钥匙格式不对 ...
  // 直接删掉本地要是，返回首页
  if (error.response.status === 401) {
    localStorage.removeItem('user-token')
    router.push('/login')
  }
  return Promise.reject(error)
})
export default axios // 到处设置好的axios
