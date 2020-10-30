import Vue from 'vue';
import Vuex from 'vuex';

import teacherInfo from "./moudels/teacherInfo"
import single from "./moudels/single"
Vue.use(Vuex);
export default new Vuex.Store({
    // this.$store.state.xxx 取值，提供一个响应式数据

    // 模块化，Vue.set动态添加state到响应式数据中
    modules: {
        teacherInfo,
        single
    },

})