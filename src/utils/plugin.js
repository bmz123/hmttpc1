export default {
  // Vue.use(obj) => 会调用obj 中的install方法
  install (Vue) {
    //   插件
    Vue.prototype.$gnotify = (params) => Vue.prototype.$notify({ duration: 800, ...params }) // 小伎俩
    Vue.prototype.$sleep = sleep// 封装一个休眠函数
  }
}
// function (time =500)如果传time用time ，不传用500
function sleep (time = 500) {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(), time)// 表示等待time时间之后才能resolve
  })
}
