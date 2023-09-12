import axios from "axios";

// 创建登录请求的axios实例
const loginInstance = axios.create({
    baseURL: "http://localhost:5012", // 登录请求的后端API的URL
    timeout: 20000
});

// 创建表单提交请求的axios实例
const formInstance  = axios.create({
    baseURL: "http://localhost:5223", // 表单相关请求的后端API的URL
    timeout: 20000
});

// 请求拦截器
loginInstance.interceptors.request.use(config => {
    return config;
}, err => {
    return Promise.reject(err);
});

formInstance .interceptors.request.use(config => {
    return config;
}, err => {
    return Promise.reject(err);
});

// 响应拦截器
loginInstance.interceptors.response.use(res => {
    return res.data;
}, err => {
    return Promise.reject(err);
});

formInstance .interceptors.response.use(res => {
    return res.data;
}, err => {
    return Promise.reject(err);
});

export { loginInstance, formInstance  };