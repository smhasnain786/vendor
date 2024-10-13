import * as curd from "./curd"
import * as dataUrl  from "./dataurl"

export const currentAffairsFileAdd =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.addCurrentAffairs;
        const token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return  curd.post(url,data,headers)
}
export const currentAffairsFileGet =async () => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.getCurrentAffairs;
    const token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return  curd.get(url,{},headers)
}

export const currentAffairsFileUpdate =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.updateCurrentAffairs;
        const token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return  curd.post(url,data,headers)
}

export const currentAffairsFileDelete =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.deleteCurrentAffairs;
        const token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return  curd.post(url,data,headers)
}