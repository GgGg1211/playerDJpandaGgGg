// 引入axios 模块
import axios from "axios";
// 获取公共方法
import {
    time
} from "./utills.js"
// post发送格式为formData (默认值)
axios.defaults.headers.post["Content-Type"] = "application/json";

let axioss = axios.create({
    baseURL: "https://www.fastmock.site/mock/a076f79f48c407308e2dbda3dedd9ff4/api",
    timeout: 15000,
})

// 添加请求拦截器 --请求前处理
axioss.interceptors.request.use(function (config) {
    // 对请求体中的路径进行处理
    let url = config.url.split("?");
    // 调用公用方法给路径添加时间戳
    config.url = url.length > 1 ? `${url[0]}?${time(url[1])}` : `${url[0]}${time(url[1])}`;
    // 返回处理过的请求体
    return config;
}, function (err) {
    // 对请求错误进行处理
    return Promise.reject(err)
})
// 对响应数据进行处理
axioss.interceptors.response.use(function (res) {
    // 结构出data
    // let {
    //     data
    // } = res;
    // // 判断code码
    // if (data.code === 0) {
    //     // 提示错误
    //     alert(data.message);
    // }
    // 返回响应体
    return res;
}, function (err) {
    // 对错误进行处理
    return Promise.reject(err)
})
/**
 * 
 * @param {String} url // 接口路径
 * @param {Any} data // 数据值
 */
function get(url, data) {
    return new Promise((resolve, rej) => {
        axioss.get(url, {
            params: data,
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            rej(err.data);
        });
    });
}
/**
 * 
 * @param {String} url // 接口路径
 * @param {Object} data // 传给后端的参数
 */
function post(url, data = {}) {
    return new Promise((resolve, rej) => {
        axioss.post(url, data).then(res => {
            resolve(res.data);
        }).catch(err => {
            rej(err.data);
        })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axioss.patch(url, data).then(
            (response) => {
                resolve(response.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axioss.put(url, data).then(
            (response) => {
                resolve(response.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
}

export {
    get,
    post,
    patch,
    put
};