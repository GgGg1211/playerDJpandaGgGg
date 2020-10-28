import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './permission';
import TeacherInfo from "./components/teacherInfo.vue";
import Bus from "./Bus";
import store from "@/store"


Vue.use(ElementUI);



Vue.config.productionTip = false;
Vue.component("TeacherInfo",TeacherInfo);

Vue.prototype.$bus = Bus
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
