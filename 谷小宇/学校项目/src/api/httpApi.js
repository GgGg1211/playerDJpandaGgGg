
import {
    post,
    get
} from '../utils/request';

export const postLogin = (data) => {
    return post('/login', data)
};
export const postVerify = (data) => {
    return post('/verify', data)
};
export const getLevel = (data) => {
    return get('/level', data)
};
export const postSchoolRouter = (data) => {
    return post('/schoolRouter', data)
};

export const getInput = (data) => {
    return get('/input', data)
};

export const getSingle = (data) => {
    return get('/single', data)
};