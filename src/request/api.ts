// 统一管理项目中所有的请求路径 api
import { loginInstance, formInstance } from "./index"


//登录请求
export const LoginAPI = (params: LoginAPIRes)
    : Promise<LoginAPIRes> => loginInstance.post("/auth/Account", params);

//表单提交请求
export const FormSubmissionAPI = (params:FormAPIRes)
    : Promise<FormAPIRes> => formInstance.post("/Test/SubmitData", params);


//表单保存请求
export const FormSaveAPI = (params: FormAPIRes)
    : Promise<FormAPIRes> => formInstance.post("/Test/SaveData", params);

//查询是否有保存的表单
export const fetchFormDataFromDB = ()
    : Promise<FetchFormDataRes> => formInstance.get("/your/api/endpoint");