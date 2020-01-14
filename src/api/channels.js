// 专门处理频道
import request from '@/utils/request'
// 获取我的频道
export function getMyChannels () {
  // 返回一个Promise，默认就是Git类型
  return request({
    url: '/user/channels'
  })
}
