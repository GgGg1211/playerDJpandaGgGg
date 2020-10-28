// 时间戳封装
/**
 * 
 * @param {String} url // 需要处理的路径
 */
function time(url = "") {
    let time = new Date().getTime();
    let newUrl = "";
    url ? (newUrl = `${url}&_t=${time}`) : (newUrl = `${url}?_t=${time}`);
    return newUrl;
};
/**
 * 
 * @param {Number} min // 最小值
 * @param {Number} max // 最大值
 */
function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

export {
    time,
    random
}