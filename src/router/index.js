
import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui';

//组件
const login = () => import("@/components/login")
const home = () => import( "@/components/home")
const users = () => import("@/components/user")
const rights= () => import( "@/components/rights")
const roles = () => import("@/components/roles") 
const goodsadd = () => import("@/components/goodsadd") 
const goods = () => ("@/components/goods") 
const reports = () => import ("@/components/reports")
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: {
        name: "/"
      }
    },
    {
      name: "/",
      path: '/login',
      component: login
    },
    {
      name: "home",
      path: "/",
      component: home,
      children: [{
        path: "/users",
        component: users
      },
      {
        path: "/rights",
        component: rights
      },
      {
        path: "/roles",
        component: roles
      },
      {
        path: "/goods",
        component: goods
      },
      {
        name: "goodsadd",
        path: "/goodsadd",
        component: goodsadd
      },
      {
        name: "reports",
        path: "/reports",
        component: reports
      }]
    }
  ]
})
router.beforeEach((to,form,next) =>{
if(to.path === '/login'){
  next()
}else{
  if(!localStorage.getItem('token')){
    Message.warning('请先登录')
    router.push({
      name:"/"
    })
  }else{
    next()
  }
}

})
export default router