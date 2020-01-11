module.exports = {
  plugins: {
    'autoprefixer': {},
    'postcss-pxtorem': {
      rootValue: 37.5, // 手机以苹果6为主要适配器
      propList: ['*']
    }
  }
}
