import * as curd from "./curd";
import * as dataUrl from "./dataurl";

const getSupportService = async () => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.getAllSupportRequest;
    const token = localStorage.getItem("token");
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return curd.get(url, {}, headers);
};

export default getSupportService;
