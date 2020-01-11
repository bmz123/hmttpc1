// 专门处理用户信息的存储和删除以及获取，放置在loaclStorge
const USER_TOKEN = 'heima-toutiao-m-91-token'// 这个key用来存储用户信息
// 设置用户的信息
export function setUser (user) {
  localStorage.setItem(USER_TOKEN, user)
}
// 读取用户信息
export function getUser () {
  return JSON.parse(localStorage.getItem(USER_TOKEN) || '{}')
}
// 删除用户信息
export function delUser () {
  localStorage.removeItem(USER_TOKEN)
}
