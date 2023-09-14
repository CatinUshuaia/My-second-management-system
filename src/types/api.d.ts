// 这个文件专门定义请求参数的类型，和响应的类型

import { message } from "antd";


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

interface FormAPIReq {
    formName: string;
    userName: string;
    department: string;
    OtherData: Dictionary<string, string>;
}


interface FormAPIRes {
    success: boolean;
    message: string;
}


interface FetchFormDataReq {
    formName?: string;
    userName?: string;
}


interface FetchFormDataRes {
    message: string;
    success: boolean;
    otherData: Dictionary<string, object>;
}

interface FormSearchAPIReq {

}

interface FormSearchAPIRes {
    records: SetStateAction<Record[]>;

}