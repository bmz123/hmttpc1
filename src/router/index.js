import Vue from 'vue'
import VueRouter from 'vue-router'
const Layout = () => import('@/views/layout')// 布局组件
const Home = () => import('@/views/home')// 主页组件
const Question = () => import('@/views/question')// 问答组件
const Video = () => import('@/views/video')// 视频组件
const User = () => import('@/views/user')// 用户组件
const Profile = () => import('@/views/user/profile')// 编辑资料
const Chat = () => import('@/views/user/chat')// 小智同学
const Login = () => import('@/views/login')// 登录组件
const Search = () => import('@/views/search')// 搜索中心
const SearchResult = () => import('@/views/search/result')
const Article = () => import('@/views/article')// 文章详情
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Layout, // 一级路由
    children: [{
      path: '/',
      component: Home// 二级路由首页
    },
    {
      path: '/question',
      component: Question
    },
    { path: '/video', name: 'video', component: Video },
    { path: '/user', name: 'user', component: User }
    ]
  },
  {
    path: '/user/profile', name: 'user-profile', component: Profile
  },
  {
    path: '/user/chat', name: 'user-chat', component: Chat
  },
  {
    path: '/user/login', name: 'login', component: Login
  },
  { path: '/search', name: 'search', component: Search },
  { path: '/search/result', name: 'search-result', component: SearchResult },
  { path: '/article', name: 'article', component: Article }
  // {
  // path: '/about',
  // name: 'about',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
