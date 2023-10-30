import axios from "axios";

const loginInstance = axios.create({
    baseURL: "http://192.168.2.73:5012", // 登录请求的后端API的URL
    timeout: 20000
});

const formInstance  = axios.create({
    baseURL: "http://192.168.2.73:5223", // 表单相关请求的后端API的URL
    timeout: 20000
});

const uploadFormImgURL = "http://192.168.2.73:5223/Test/UploadImg";
const uploadUserImgURL = "http://192.168.2.73:5223/api/User/UploadUserImg";

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

export { loginInstance, formInstance, uploadFormImgURL, uploadUserImgURL };