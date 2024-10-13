import * as curd from "./curd"
import * as dataUrl  from "./dataurl"

export const addFlash =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.addFlashMessage;
        const token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return  curd.post(url,data,headers)
}
export const getFlash =async () => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.getFlashMessage;
    const token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return  curd.get(url,{},headers)
}

export const updateFlash =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.updateFlashMessage;
        const token = localStorage.getItem("token")
     const headers = {
        'Content-Type':'application/json',
        'Authorization': token
    };
    return  curd.post(url,data,headers)
}

export const removeFlash =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.removeFlashMessage;
        const token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return  curd.post(url,data,headers)
}