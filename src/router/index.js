import Vue from 'vue'
import Router from 'vue-router'
import login from "@/login"
import home from "@/components/home"
import users from "@/user"
import rights from "@/rights"
import roles from "@/roles"
import { Message } from 'element-ui';
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path:"/",
      redirect:{
        name:"/"
      }
    },
    {
      name:"/",
      path: '/login',
      component: login
    },
    { 
      name:"home",
      path:"/",
      component:home,
      children:[{
        path:"/users",
        component:users
      },
    {
      path:"/rights",
      component:rights
    },
    {
      path:"/roles",
      component:roles
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