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
  }

]

const router = new VueRouter({
  routes
})

export default router
