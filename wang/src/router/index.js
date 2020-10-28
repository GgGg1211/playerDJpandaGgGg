import Vue from 'vue'
import VueRouter from 'vue-router'
// 
// import login from "@/views/login/index.vue";
// import home from "@/views/home/index.vue";
// // 配置一个404页面 当跳转到没有的路由时转到这个页面
// import Error from "@/views/404/index.vue";

Vue.use(VueRouter)
// name 跳转的时候用
const routes = [{
    path: '/',
    name: 'home',
    component: () => import("@/views/home/index.vue"),
    // 重定向 因为每次返回之后不会回到默认选中页的路径
    // redirect:'/analyse',
    children: [{
        path: '/analyse',
        name: 'analyse',
        component: () => import("@/views/analyse/index.vue"),
      }, {
        path: '/management',
        name: 'management',
        component: () => import("@/views/management/index.vue"),
      },
      {
        path: '/apply_management',
        name: 'apply_management',
        component: () => import("@/views/apply_management/index.vue"),
      }, {
        path: '/jurisdiction',
        name: 'jurisdiction',
        component: () => import("@/views/jurisdiction/index.vue"),
      },

    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("@/views/login/index.vue"),

  },

  {
    path: "*",
    component: () => import("@/views/404/index.vue"),

  },

]


// mode history 是去除路径上的#分隔
const router = new VueRouter({
  mode: 'history',
  routes, // 缩写 相当于 rontes: router;
})



export default router