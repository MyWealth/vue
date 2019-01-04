import Vue from 'vue'
import Router from 'vue-router'
import login from "@/login"
import home from "@/components/home"
import users from "@/user"
Vue.use(Router)

export default new Router({
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
      }]
    }
  ]
})
