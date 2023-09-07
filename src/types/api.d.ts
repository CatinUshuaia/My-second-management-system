// 这个文件专门定义请求参数的类型，和响应的类型


// 登录请求参数类型约束
interface LoginAPIReq {
    name: string;
    password: string;
}


// 登录的响应类型约束
interface LoginAPIRes {
    refreshToken: string;
    data: {
    accesstoken: string;
    refreshToken:string;
  };
    message: string;
    success: boolean;
    Ovalue: object | null;
}