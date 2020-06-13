import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'Login'
  },
  {
    path: '/login',
    component:()=>import('../components/Login')
  },
  {
    path: '/home',
    component:()=>import('../components/Home')
  }

]

const router = new VueRouter({
  routes
})

//路由导航守卫
router.beforeEach((to,from,next)=>{
  if(to.path ==='/login') return  next()
  const  tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return  next ('/login')
  next()
 })


export default router
