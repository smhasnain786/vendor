import * as curd from "./curd"
import * as dataUrl  from "./dataurl"


export const getOrders = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.ordersBySubadminId;
const token = localStorage.getItem("token")
 const headers = {
    'Content-Type': 'application/json',
    "Authorization":token
    };
return  curd.post(url,data,headers)
}
export const aloo = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.ordersBySubadminId;
const token = localStorage.getItem("token")
 const headers = {
    'Content-Type': 'application/json',
    "Authorization":token
    };
return  curd.post(url,data,headers)
}
