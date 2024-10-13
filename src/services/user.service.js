import * as curd from "./curd"
import * as dataUrl  from "./dataurl"

export const AddUserService = async (data) => {
    return curd.post(dataUrl.MainUrl + dataUrl.endPoint.addUser, {}, data);
};

export const getUserDataService =async () => {
    const token  = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        "Authorization":token
    };
    return  curd.get(dataUrl.MainUrl+dataUrl.endPoint.getUser,{},headers)
}
export const UpdateUserService =async (data) => {
    return  curd.post(dataUrl.MainUrl+dataUrl.endPoint.updateUser,{},data)
}
export const DeleteUserService =async (data) => {
    return  curd.post(dataUrl.MainUrl+dataUrl.endPoint.deleteUser,{},data)
}
export const AdminLogin =async (data) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    return  curd.post(dataUrl.MainUrl+dataUrl.endPoint.login,data,headers)
}

export const tokenValaidation = async() => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.checkTokenValidation;
    const headers = {
        "Content-Type":"aplication/json"
    }
    return  curd.get(url,{},headers)
}
export const forgotPassword = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.forgotPassword;
// const token = localStorage.getItem("token")
 const headers = {
    'Content-Type': 'application/json'
};
    return  curd.post(url,data,headers)
}