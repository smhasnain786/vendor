import * as curd from "./curd"
import * as dataUrl  from "./dataurl"

export const addPermotionPopupData =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.addPermotionPopupData;
    const token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return  curd.post(url,data,headers)
}
export const getPermotionPopupData =async () => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.getPermotionPopupData;
    const token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return  curd.get(url,{},headers)
}

export const updatePermotionPopupData =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.updatePermotionPopupData;
        const token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return  curd.post(url,data,headers)
}

export const removePermotionPopupData =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.removePermotionPopupData;
        const token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return  curd.post(url,data,headers)
}