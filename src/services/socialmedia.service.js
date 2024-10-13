import * as curd from "./curd"
import * as dataUrl  from "./dataurl"

export const addSocialMediaurl =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.addSocialMediaurl;
        const token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
   
    return  curd.post(url,data,headers)
}


export const getSocialMediaurl =async () => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.getSocialMediaurl;
        const token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return  curd.get(url,{},headers)
}

export const updateSocialMediaurlById =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.updateSocialMediaurlById;
        const token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return  curd.post(url,data,headers)
}

export const deleteSocialMediaurlById =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.deleteSocialMediaurlById;
        const token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return  curd.post(url,data,headers)
}