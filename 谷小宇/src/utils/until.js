const time = (url,istrue)=>{
    let date = new Date().getTime();
    return istrue ? `${url}&_t=${date}` : `${url}?_t=${date}`
}

export{time}