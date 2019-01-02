import Vue from 'vue'
import Router from 'vue-router'
import login from "@/login"
import home from "@/components/home"
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
      name:"home",
      path:"/home",
      component:home
  
    },
    {
      path: '/login',
      name:"/",
      component: login
    }
  ]
})
