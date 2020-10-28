import {post, get} from "../utills/request";

// 获取列表接口
const postUser = (data) => post("/login", data);

const getSchoolList = (data)=> get ("/schoolList", data);

// 确认学校获取权限
const postSchoolRouter = (data) => post("/schoolRouter", data);

// 请求处理列表
const getSchoolApply = (data) => get("/schoolApply", data);

// 请求教师列表
const getTeacherList = (data) => get("/teacherList", data)

export { postUser, getSchoolList ,postSchoolRouter, getSchoolApply,getTeacherList};