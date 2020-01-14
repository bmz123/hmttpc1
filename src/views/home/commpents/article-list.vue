<template>
  <div class="scroll-wrapper">
    <van-pull-refresh v-model="downLoading" @refresh="onRefresh" :success-text="refreshSuccessText">
      <van-list v-model="upLoading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <!-- 渲染数据 -->
        <van-cell v-for="article in articles" :key="article.art_id.toString()">
          <div class="article_item">
            <h3 class="van-ellipsis"> {{article.title}}</h3>
            <div class="img_box" v-if='article.cover.type===3'>
              <van-image class="w33" fit="cover" :src="article.cover.images[0]" />
              <van-image class="w33" fit="cover" :src="article.cover.images[1]" />
              <van-image class="w33" fit="cover" :src="article.cover.images[2]" />
            </div>
            <!-- 单图模式 -->
            <div class="img_box" v-if='article.cover.type===1'>
              <van-image class="w100" fit="cover" :src="article.cover.images[0]" />
            </div>
            <div class="info_box">
              <span>{{ article.aut_name }}</span>
              <span>{{ article.comm_count }}</span>
              <span>{{ article.pubdate }}</span>
              <span class="close">
                <van-icon name="cross"></van-icon>
              </span>
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  //   name: 'article-list',
  data () {
    return {
      downLoading: false, // 是否开启下拉状态
      upLoading: false, // 是否开启上拉加载
      finished: false, // 是否完成全部加载
      articles: [], // 定义一个数据接收上拉加载的数据
      refreshSuccessText: '', // 加载成功提示
      timestamp: null// 定义时间戳，这个时间戳告诉服务器，现在我要求什么样的数据
    }
  },
  props: {
    channel_id: {
      type: Number, // 指定要传的类型
      required: true, // 要求props必传
      default: null // 给props一个默认值

    }
  },
  methods: {
    // 上拉加载方法
    async onLoad () {
      // setTimeout(() => {
      //   if (this.articles.length < 50) {
      //     let arr = Array.from(
      //       Array(10),
      //       (value, index) => this.articles.length + index + 1
      //     )
      //     this.articles.push(...arr)
      //     //   关掉状态
      //     this.upLoading = false
      //   } else {
      //     this.finished = true // 我已经加载完了，不用触发了
      //   }
      // }, 1000)
      // 请求数据。如果时间戳为空就传当前时间
      const data = await getArticles({ channel_id: this.channel_id,
        timestamp: this.timestamp || Date.now() })
      this.articles.push(...data.results)
      // 关掉状态
      this.upLoading = false
      // 判断历史时间戳，如果你有历史表示还可以继续往下看，否则就不看了
      if (data.pre_timestamp) {
        this.timestamp = data.pre_timestamp
      } else {
        // 否则认为没有历史了，没有必要加载了
        this.finished = true // 我已经加载完了，不用触发了
      }
    },
    // 下拉刷新的方法
    onRefresh () {
      // 触发下拉刷新
      setTimeout(() => {
        console.log('下拉刷新')
        let arr = Array.from(Array(10), (value, index) => '追加' + (index + 1))
        this.articles.unshift(...arr) // 数据添加到队首
        this.downLoading = false // 关掉下拉数据
        this.refreshSuccessText = `更新了${arr.length}条数据`
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      width: 100%;
      height: 180px;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span {
      padding-right: 10px;
      &.close {
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>
