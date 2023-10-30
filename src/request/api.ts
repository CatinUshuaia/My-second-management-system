// 统一管理项目中所有的请求路径 api
import axios from 'axios';
import { loginInstance, formInstance } from './index';

//登录请求
export const LoginAPI = (params: LoginAPIReq)
    : Promise<LoginAPIRes> => loginInstance.post("/auth/Account", params);

//表单提交请求
export const FormSubmissionAPI = (params: FormAPIReq)
    : Promise<FormAPIRes> => formInstance.post("/Test/SubmitData", params);

//表单保存请求
export const FormSaveAPI = (params: FormAPIReq)
    : Promise<FormAPIRes> => formInstance.post("/Test/SaveData", params);


//查询是否有保存的表单,如果有则返回
export const fetchFormDataFromDB = (params: FetchFormDataReq)
    : Promise<FetchFormDataRes> => formInstance.post("/Test/FetchSaveFormData", params);

export const formSearchAPI = (params: FormSearchAPIReq)
    : Promise<FormSearchAPIRes> => formInstance.post("/Test/SearchRecord", params);


export const formDeleteAPI = (params: FormDeleteAPIReq)
    : Promise<FormDeleteAPIRes> => formInstance.post("/Test/DeleteRecord", params);

export const UserSettingsAPI = (params: UserSettingsReq)
    : Promise<UserSettingsRes> => formInstance.post("/api/User/UserSettings", params);

export const UserSettingsFetch = (params: UserSettingsFetchReq)
    : Promise<UserSettingsFetchRes> => formInstance.post("/api/User/UserSettingsFetch", params);
