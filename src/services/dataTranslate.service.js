import * as curd from "./curd";
import * as dataUrl from "./dataurl";

const getAllDataTranslateQuery = async () => {
  const { MainUrl, endPoint } = dataUrl;
  const url = MainUrl + endPoint.getAllDataTranslateQuery;
  const token = localStorage.getItem("token");
  
  const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': token
  };

  return curd.get(url, {}, headers);
};

export default getAllDataTranslateQuery;
