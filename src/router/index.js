import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter);

  const routes = [
    {
      path:'/',
      redirect:'/login'

    },
    {
      path: '/login',
      component: () => import('../components/Login.vue')

    },
    {
      path:'/home',
      component: () => import('../components/Home.vue'),
      redirect: '/welcome',
      children:[
        {
          path:'/welcome',
          component: () => import('../components/Welcome.vue')
        },
        {
          path:'/user',
          component: () => import('../components/admin/UserList.vue')
        }
      ]
    }

]

const router = new VueRouter({
  routes
});




  //挂在路由导航守卫
router.beforeEach((to,from,next)=>{
  if (to.path=='/login') return next();
  //获取user
const userFlag =  window.sessionStorage.getItem("user");//取出当前用户
  if (!userFlag) return next('/login');//无值，返回登录页面
  next();//符合要求

})

export default router
