
    
    const state = {
        stage:{
            1:"小学阶段",
            2:"初中阶段",
            3:"高中阶段",
        },
        subject:{
            1:"语文",
            2:"数学",
            3:"英语",
            4:"道法",
            5:"历史",
            6:"地理",
        }
    }
    // this.$store.getters.xxx 取值，借助Vue的计算属性computed来实现缓存
    const getters = {}
    // this.$store.commit('xxx')赋值，更改state方法
    const mutations=  {}
    // this.$store.dispatch('xxx')赋值 不可以直接修改值，需要内部调用commit，触发mutations方法
    const actions=  {}
    // 模块化，Vue.set动态添加state到响应式数据中

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}