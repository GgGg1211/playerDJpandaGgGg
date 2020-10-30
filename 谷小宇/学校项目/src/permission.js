import router from "./router/router";


let routerNewData = ['/', '/login',"Error"];
const routerAll = (data = []) => {
    data.forEach((it) => {
        if (it.children) {
            routerAll(it.children);
        } else {
            routerNewData.push(it.id)
        }
    })
}

router.beforeEach((to,from,next) => {

    let routersData = JSON.parse(localStorage.getItem('router')) || [];
    // console.log(routersData);
    if(routersData.length === 0){
        localStorage.clear();
    }
     routerAll(routersData);

    if (routerNewData.indexOf(to.name.split("_")[0]) >= 0) {
        next()
    } else {
        router.go(-1)
    }
})

export default router;