import { TEACHERINFO } from "../mutation-type";

// initial state
const state = {
  stageObj: {
    "1": "小学阶段",
    "2": "初中阶段",
    "3": "高中阶段",
  },
  subjectObj: {
    "1": "语文",
    "2": "数学",
    "3": "英语",
    "4": "道法",
    "5": "思美",
    "6": "体育",
  },
  sexObj: {
    0: "女",
    1: "男",
    "default":"保密"
  },
};

// getters
const getters = {};

// actions
const actions = {};

// mutations
const mutations = {};
  // namespaced: true 让teacherInfo 变成一个被命名的模块

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
