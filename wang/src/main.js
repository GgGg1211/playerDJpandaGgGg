import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import store from "./store/index.js";
import 'element-ui/lib/theme-chalk/index.css'
import EditTeacherDialog from "./components/editTeacherDialog.vue"
import bus from "../src/utills/bus"
Vue.use(ElementUI);

Vue.config.productionTip = false
// 在全局上挂载组建
Vue.component("EditTeacherDialog",EditTeacherDialog)
// 在vue原型上挂一个bus
Vue.prototype.$bus = bus;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
