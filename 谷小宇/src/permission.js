import router from "./router/router";


let routerNewData = ['/', '/login'];
const routerAll = (data = []) => {
    data.forEach((it) => {
        if (it.children) {
            routerAll(it.children);
        } else {
            routerNewData.push(it.path)
        }
    })
}

router.beforeEach((to, from, next) => {

    let routersData = JSON.parse(localStorage.getItem('router')) || [];
    // console.log(routersData);
    if(routersData.length === 0){
        localStorage.clear();
    }
    routerAll(routersData);
    // console.log(routersData);
    if (routerNewData.indexOf(to.path) >= 0) {
        // console.log(2);
        next()
    } else {
        // console.log(3);
        router.go(-1)
        // next({path:from.path})
    }
})

export default router;