// 用于文章数据的获取
import request from '@/utils/request'
// 获取推荐文章的数据
// axios中query参数放置在parmas上
// body参数放置在data上
export function getArticles (params) {
  return request({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    params: { with_top: 1, ...params }
  })
}
