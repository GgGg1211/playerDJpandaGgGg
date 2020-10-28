import VueRouter from 'vue-router'


// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
// const FooPage = { template: '<div>foo</div>' }


// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
    {
        path: '/',
        name: "index",
        component: () => import("@/view/index/index.vue"),
        children: [
            {
                // 当 /menu1 匹配成功，
                // menu1 会被渲染在 Home 的 <router-view> 中
                path: "menu1",
                name: "menu1",
                component: () => import("@/view/menu1/index.vue"),
            },
            {
                // 当 /menu2 匹配成功，
                // menu2 会被渲染在 Home 的 <router-view> 中
                path: "menu2",
                component: () => import("@/view/menu2/index.vue"),
            },
            {
                path: "applicationAdmin",
                name: "applicationAdmin",
                component: () => import("@/view/applicationAdmin/index.vue"),
            },
        ],
    },
    { path: '/login', name: "login", component: () => import("@/view/login/login.vue"), },
    { path: '*', name: "err", component: () => import("@/view/404/index.vue"), }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    mode: 'history',
    routes // (缩写) 相当于 routes: routes
})
const routerArr = [
    {
        name: "学校管理",
        children: [
            {
                name: "教师管理",
                path: "/menu2",
            },
            {
                name: "申请管理",
                path: "/applicationAdmin",
            },
        ],
    },
    {
        name: "成绩分析",
        children: [
            {
                name: "单次分析",
                path: "/menu1",
            },
        ],
    },
];

const myarr = ['/', '/login', '*'];

function renderFn(arr) {
    arr.forEach((item) => {
        if (item.children) {
            renderFn(item.children);
        } else {
            myarr.push(item.path);
        }
    })
}

renderFn(routerArr)

router.beforeEach((to, from, next) => {
    if (myarr.indexOf(to.path) !== -1) {
        next();
    } else {
        next(from.path)
    }
})

export default router
