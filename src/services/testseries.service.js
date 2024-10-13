import * as curd from "./curd"
import * as dataUrl  from "./dataurl"

export const testSeriesAdd =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.addTestSeries;
        const token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return  curd.post(url,data,headers)
}
export const testSeriesGet =async () => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.getTestSeries;
    const token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return  curd.post(url,{},headers)
}

export const testSeriesUpdate =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.updateTestSeries;
        const token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return  curd.post(url,data,headers)
}

export const testSeriesDelete =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.deleteTestSeries;
        const token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return  curd.post(url,data,headers)
}