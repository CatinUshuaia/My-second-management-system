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

interface FormAPIReq {
    formName: string;
    userName: string;
    department: string;
    OtherData: Dictionary<string, string>;
}


interface FormAPIRes {
}


// 表单的响应类型约束
interface FormData1 {
    'Dia. of bolt circle Value': number;
    'Dia. of bolt circle Unit': string;
    'External diameter Value': number;
    'External diameter Unit': string;
    'Effective length Value': number;
    'Effective length Unit': string;
    'Iron thickness Value': number;
    'Iron thickness Unit': string;
    'Cement lining thickness Value': number;
    'Cement lining thickness Unit': string;
    'Epoxy coating thickness Value': number;
    'Epoxy coating thickness Unit': string;
    'Bitumen Coating thickness Value': number;
    'Bitumen Coating thickness Unit': string;
    'Cover Height Value': number;
    'Cover Height Unit': string;
    'hydrostatic pressure test duration Value': number;
    'hydrostatic pressure test duration Unit': string;
    'Other Tests': string;
    'Upload': FileList;
    'Project Number': string;
}

interface FormData2 {
    'Field A': string;
    'Field B': string;
}


type SingleFormData = FormData1 | FormData2;
type FetchFormDataRes = SingleFormData[];