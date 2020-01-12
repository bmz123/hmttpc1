// 封装request模块
// 为什么要封装，因为要在拦截器中处理token统一注入，相应数据的统一处理返回，处理大数字
// token失效
import axios from 'axios'// 引入axios插件
import JSONBig from 'json-bigint'// 处理大数字插件
import store from '@/store'// 引入vuex中的store实例
// import { Transform } from 'stream'
// 创建一个新的插件实例
// 应该给request请求一个默认的请求地址 baseURL
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/', // 设置一个常量的基础地址
  transformResponse: [function (data) {
    // 当后台相应的字符串回到axios请求时就会触发
    // data是一个字符串，把字符串转化成对象并且返回，默认的是JSON.parse()
    // 如果data是一个空字符串，直接转化就会直接报错
    // data?JSONBig.parse(data):{}
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data// 失败字符串直接返回
    }
  }]// 处理后台返回数据，字符串转换成对象，JSON.parse有大数字无法使用，需要使用JSONbig.parse
  // data是一个字符串，把字符串转成对象并返回
})// 创建一个axios的请求工具

// 拦截器，
// 请求拦截器，发起请求到达服务器之前中间的拦截器，统一注入token
instance.interceptors.request.use(function (config) {
  // 应该在返回配置之前，往配置里添加token
  if (store.state.user.token) {
    // 如果token存在就要注入
    config.headers['Authorization'] = `Bearer ${store.state.user.token}`// 统一注入token
  }
  // config是配置信息
  return config
}, function (error) {
  return Promise.reject(error)// 直接返回promise错误
})
// 相应拦截器，后台服务器到获得结果then，await之间
instance.interceptors.response.use(function (response) {
  // 响应数据,返回得到的响应数据
  // return response.data.data 第一次data是axios默认包的data，第二个data是接口返回里面包的data
  try {
    return response.data.data
  } catch (error) {
    return response.data
  }
}, function (error) {
  // 错误的时候代码失效
  return Promise.reject(error)
})
export default instance// 导入request工具
