
import {
    time
} from './until';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = "application/json";

const instance = axios.create({
    baseURL: 'https://www.fastmock.site/mock/5b3b4639b7827095ba75073be5a578ce/vue',
    timeout: 15000
})

instance.interceptors.request.use(
    function (config) {
        config.url = time(config.url)
        return config
    }
)

instance.interceptors.response.use(
    function (res) {
        return res.data.data
    }
)

function get(url, params) {
    return new Promise((res, rej) => {
        instance.get(url, {
            params: params
        }).then((data) => {
            res(data)
        }).catch((err) => {
            rej(err);
        })
    })
}

function post(url, params = {}) {
    return new Promise((res, rej) => {
        instance.post(url, params)
            .then((data) => {
                res(data)
            }).catch((err) => {
                rej(err);
            })
    })
}

function put(url, params = {}) {
    return new Promise((res, rej) => {
        instance.put(url, params)
            .then((data) => {
                res(data)
            }).catch((err) => {
                rej(err);
            })
    })
}

function patch(url, params = {}) {
    return new Promise((res, rej) => {
        instance.patch(url, params)
            .then((data) => {
                res(data)
            }).catch((err) => {
                rej(err);
            })
    })
}

export {get,post,put,patch}