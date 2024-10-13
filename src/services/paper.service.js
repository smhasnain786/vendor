import * as curd from "./curd"
import * as dataUrl  from "./dataurl"

export const paperAdd =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.addPreviousYearPaper;
    const token = localStorage.getItem("token")
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        };
    return  curd.post(url,data,headers)
}
export const paperGet =async () => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.getPreviousYearPaper;
    const token = localStorage.getItem("token")
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        };
    return  curd.get(url,{},headers)
}

export const paperUpdate =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.updatePreviousYearPaper;
        const token = localStorage.getItem("token")
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        };
    return  curd.post(url,data,headers)
}

export const paperDelete =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.deletePreviousYearPaper;
        const token = localStorage.getItem("token")
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        };
    return  curd.post(url,data,headers)
}