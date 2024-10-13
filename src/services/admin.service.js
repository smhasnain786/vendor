import * as curd from "./curd"
import * as dataUrl  from "./dataurl"

export const addAdminInformation =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.addAdminInformation;
        const token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
   
    return  curd.post(url,data,headers)
}


export const getAdminInformation =async () => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.getAdminInformation;
        const token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return  curd.get(url,{},headers)
}

export const updateAdminInformation =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.updateAdminInformation;
        const token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return  curd.post(url,data,headers)
}