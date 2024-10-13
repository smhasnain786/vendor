import * as curd from "./curd"
import * as dataUrl  from "./dataurl"

export const SubadminAdd =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.addSubadmin;
    const token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
};
    return  curd.post(url,data,headers)
}
export const getPermission =async () => {
    const token  = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        "Authorization":token
    };
    return  curd.get(dataUrl.MainUrl+dataUrl.endPoint.permissions,{},headers)
}
export const getAllSubadmins =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.getSubadminList;
    const token  = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        "Authorization":token
    };
    return  curd.post(url,data,headers)
}
export const subadminStatusChange = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.changeSubadminStatus;
    const token  = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        "Authorization":token
    };
    return  curd.post(url,data,headers)
}
export const subadminDelete = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.subadmindelete;
    const token  = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        "Authorization":token
    };
    return  curd.post(url,data,headers)
}
export const subadminUpdate = async(data) => {
    console.log("data->>>>>>>>",data);
    
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.updateSubadmin;
    const token  = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'multipart/form-data',
        "Authorization":token
    };
    return  curd.post(url,data,headers)
}
export const subadminByEmailId = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.sudadminbyEmailId;
    console.log(url);
    
    const token  = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        "Authorization":token
    };
    return  curd.get(url,data,headers)
}
export const changePassword = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.changePasswordSubadmin;
const token = localStorage.getItem("token")
 const headers = {
    'Content-Type': 'application/json',
    "Authorization":token
    };
return  curd.post(url,data,headers)
}


// export const NewsListGet = async() => {
//     return await curd.get(dataUrl.MainUrl+dataUrl.endPoint.newsGet,{})
// }
// export const NewsUpdate =async (data) => {
//     return await curd.post(dataUrl.MainUrl+dataUrl.endPoint.newsUpdate,{},data)
// }
// export const NewsDelete =async (data) => {
//     return await curd.post(dataUrl.MainUrl+dataUrl.endPoint.newsDelete,{},data)
// }