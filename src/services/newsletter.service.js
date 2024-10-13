import * as curd from "./curd"
import * as dataUrl  from "./dataurl"
// export const NewsAdd =async (data) => {
//     const { MainUrl, endPoint } = dataUrl;
//     const url = MainUrl + endPoint.newsAdd;
//     let token = localStorage.getItem("token")
//     const headers = {
//         'Content-Type': 'application/json',
//         'Authorization': token
//     };
//     return await curd.post(url,data,headers)
// }
export const NewsLetterListGet = async() => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.newsLetterGet;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return await curd.get(url,{},headers)
}
// export const NewsUpdate =async (data) => {
//     const { MainUrl, endPoint } = dataUrl;
//     const url = MainUrl + endPoint.newsGet;
//     let token = localStorage.getItem("token")
//     const headers = {
//         'Content-Type': 'application/json',
//         'Authorization': token
//     };
//     return await curd.post(url,data,headers)
// }
// export const NewsDelete =async (data) => {
//     const { MainUrl, endPoint } = dataUrl;
//     const url = MainUrl + endPoint.newsDelete;
//     let token = localStorage.getItem("token")
//     const headers = {
//         'Content-Type': 'application/json',
//         'Authorization': token
//     };
//     return await curd.post(url,data,headers)
// }