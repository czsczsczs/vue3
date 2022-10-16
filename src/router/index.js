import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/index.js'

const routes = [

  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect:'/index',
    children:[
      {
        path:"/index",
        name:"index",
        component:()=>import("../views/pages/index.vue")
      },
      {
        path:"/user",
        name:"user",
        component:()=>import("../views/pages/UserPages.vue")
      },
      {
        path:"/role",
        name:"role",
        component:()=>import("../views/pages/RolePages.vue")
      },
      {
        path:"/goods",
        name:"goods",
        component:()=>import("../views/pages/GoodsPages.vue")
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path:"/login",
    name:"login",
    component:()=>import("../views/pages/login.vue")
  },
]

const router = createRouter({
  // eslint-disable-next-line no-undef
  history: createWebHistory(process.env.BASE_URL),
  routes
}) 
router.beforeEach((to,form,next)=>{
    
    const uInfo=store.state.uInfo.userInfo;
    if(!uInfo.username){
      if(to.path==="/login"){
        next()
        return
      }
      next("/login")
    }else{
      next()
    }
    
})

export default router
