import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/tabbar/Home.vue'
import login from './components/tabbar/login.vue'
import register from './components/tabbar/register.vue'
import loginout from './components/tabbar/loginout.vue'

import goodinfo from './components/good/goodinfo.vue'
import goodlist from './components/good/goodlist.vue'
import goodrecommend from './components/good/goodrecommend.vue'
import goodscart from './components/good/goodscart.vue'




Vue.use(Router)
export default new Router({
  routes: [
    {path:'/',redirect:"/Home"},   //用户访问/ 重新定位/Home 
    {path:'/Home',component:Home},
    {path:'/login',component:login},
    {path:'/register',component:register},
    {path:'/goodlist',component:goodlist},
    {path:'/goodrecommend',component:goodrecommend},
    {path:'/goodinfo',component:goodinfo},
    {path:'/goodscart',component:goodscart},
    {path:'/loginout',component:loginout}
  ]
})
