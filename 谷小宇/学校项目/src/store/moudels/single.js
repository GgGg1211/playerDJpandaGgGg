
const state = {
    type: {
        "1": "单次成绩分析",
        "2": "总分基本分析",
    },
    class: {
        "1": "小学一年级",
        "2": "小学二年级",
        "3": "小学三年级",
        "4": "小学四年级",
        "5": "小学五年级",
        "6": "小学六年级",
        "7": "初中一年级",
        "8": "初中二年级",
        "9": "初中三年级",
        "10": "高中一年级",
        "11": "高中二年级",
        "12": "高中三年级",
    },
    year: ["2020", "2019", "2018", "2017", "2016", "2015"],
}
// this.$store.getters.xxx 取值，借助Vue的计算属性computed来实现缓存
const getters = {}
// this.$store.commit('xxx')赋值，更改state方法
const mutations = {}
// this.$store.dispatch('xxx')赋值 不可以直接修改值，需要内部调用commit，触发mutations方法
const actions = {}
// 模块化，Vue.set动态添加state到响应式数据中

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}