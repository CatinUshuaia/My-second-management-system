
// 登录请求参数类型约束
interface LoginAPIReq {
    staffid: string;
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
    imageUrls: List<string>;
}

interface FormSearchAPIReq {
}

interface FormSearchAPIRes {
    records: SetStateAction<Record[]>;
}

interface FormDeleteAPIReq {
    formId: string;
    formName: string;
    staffCode: string;
    createTime: string;
    department: string;
}

interface FormDeleteAPIRes {
}


interface FormImgRes {
    message: string;
    status: string;
    url: string;
}

interface UserSettingsRes {
}

interface UserSettingsReq {
}

interface UserSettingsFetchRes {
    otherData: any;
    success: any;
}

interface UserSettingsFetchReq {
}