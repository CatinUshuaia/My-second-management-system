﻿// 统一管理项目中所有的请求路径 api
import request from "./index"

//请求中：请求参数和返回值的类型都需要进行约束

//登录请求
export const LoginAPI = (params: LoginAPIRes)
    : Promise<LoginAPIRes> => request.post("/auth/Account", params);

//其它请求