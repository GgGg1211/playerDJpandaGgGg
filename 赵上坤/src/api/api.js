import { get, post, patch, put } from "@/utils/request.js";
import { getV, postV, patchV, putV } from "@/utils/requestVue.js";

// 获取验证码
const mylist = (data) => get("/mylist", data);
const phone = (data) => post("/phone", data);
const login = (data) => post("login", data);
const loginV = (data) => postV('/codeLogin', data);
const scrollV = (data) => getV('/scrollList', data);
const okscrollV = (data) => postV('/okScroll', data);
const tableV = (data) => getV('/schoolApply', data);
const getteacherList = (data) => getV('/getteacherList', data);


export { mylist, phone, login, loginV, scrollV, okscrollV, tableV, getteacherList };
