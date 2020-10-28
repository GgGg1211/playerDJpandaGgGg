import VueRouter from 'vue-router';
import Vue from 'vue';
Vue.use(VueRouter);

const routes = [{
        path: '/',
        id: '/',
        name: 'Home',
        component: () => import('@/view/home/home.vue'),
        children: [{
                // 当 /user/:id/profile 匹配成功，
                // UserProfile 会被渲染在 User 的 <router-view> 中
                id: '/single',
                path: 'single',
                component: () => import('@/view/single/single.vue')
            },
            {
                // 当 /user/:id/posts 匹配成功
                // UserPosts 会被渲染在 User 的 <router-view> 中
                id: '/teacher',
                path: 'teacher',
                component: () => import('@/view/teacher/teacher.vue')
            }, {
                id: "/applicationAdmin",
                path: "applicationAdmin",
                component: () => import('@/view/apply/apply.vue')
            }
        ]
    },
    {
        id: '/login',
        path: '/login',
        name: 'Login',
        component: () => import('@/view/login/login.vue')
    },
    {
        id: '*',
        path: '*',
        name: 'Error',
        component: () => import('@/view/404/index.vue')
    }
]
const router = new VueRouter({
    mode: 'history',
    routes // (缩写) 相当于 routes: routes
})

export default router