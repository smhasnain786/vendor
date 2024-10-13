import axios from "axios"

export const post = async (url, parameters, headers) => {
    try {
        const response = await axios.post(url, parameters, { headers });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};




export const get = async (url, params, headers) => {
    try {
        const response = await axios.get(url, { headers, params });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};


// export const post = (url,data) => {
//     // if(token){
//     //     token = `Bearer ${token}`        
//     // }
//     return axios.post(url,data,{headers:headers}).then((res,err)=>{
//         return res.data
//     })
// }

// export const get = (url,token) => {
//     let config = {
//         headers: {
//             'Authorization': `Bearer ${token}`
//           }
//     }
//     if(token){
//         token = `Bearer ${token}`        
//     }
//     return axios.get(url,config).then((res,err)=>{
//         return res.data
//     })

// }