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
    component:()=>import('../components/Home'),
    redirect: '/welcome',
    children:[
      {
      path:'/welcome',
      component:()=>import('../components/Welcome')
      },
      {
        path: '/users',
        component:()=>import('../components/User')
      },
      {
        path:'/rights',
        component:()=>import('../components/Right')
      }
    ]
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
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


export default router
