// 时间戳封装
const time = (url = "") => {
  let time = new Date().getTime();
  let newUrl = "";
  url ? (newUrl = `${url}&_t=${time}`) : (newUrl = `${url}?_t=${time}`);
  return newUrl;
};

export {
  time
}