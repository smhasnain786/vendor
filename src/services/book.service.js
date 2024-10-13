import * as curd from "./curd"
import * as dataUrl  from "./dataurl"

export const CategoryAdd = async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.categoryAdd;
    const token = localStorage.getItem("token");
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return  curd.post(url, data, headers);
};

export const CategoryListGet = async () => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.categoryGet;
    const token = localStorage.getItem("token");
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return curd.get(url, {}, headers);
};

export const CategoryUpdate = async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.updateCategory;
    const token = localStorage.getItem("token");
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return curd.post(url, data, headers);
};
export const CategoryDelete =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.deleteCategory;
    const token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
};
    return  curd.post(url,data,headers)
}
export const CategoryStatusChange =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.changeCategoryStatus;
    const token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
};
    return  curd.post(url,data,headers)
}
export const BookAdd = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.addBookDetails;
    const token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return  curd.post(url,data,headers)
}

export const getBookList =async () => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.bookList;
    const token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return  curd.get(url,{},headers)
}

export const BookUpdate =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.updateBookDetails;
    const token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return  curd.post(url,data,headers)
}
export const BookDelete =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.deleteBookById;
    const token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return  curd.post(url,data,headers)
}
export const BookStatusChange =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.changeBookStatus ;
    const token = localStorage.getItem("token")
    const headers = {
        'Content-Type':  'application/json',
        'Authorization': token
    };
    return  curd.post(url,data,headers)
}

export const PosterAdd =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.addPoster;
    const token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return  curd.post(url,data,headers)
}

export const getPosterList =async () => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.getPoster;
    const token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return  curd.get(url,{},headers)
}

export const PosterUpdate =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.updatePoster;
    const token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return  curd.post(url,data,headers)
}
export const PosterDelete =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.deletePoster;
    const token = localStorage.getItem("token")
    const headers = {
        'Content-Type':  'application/json',
        'Authorization': token
    };
    return curd.post(url,data,headers)
}
export const PosterStatusChange =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.changePosterStatus;
    const token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return curd.post(url,data,headers)
}

export const GetAllReviews =async () => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.getAllReview;
    const token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return curd.get(url,{},headers)
}

export const changeReviewStatus =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.changeReviewStatus;
    const token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return curd.post(url,data,headers)
}

export const getCartDetails =async () => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.getAllCartInfo;
    const token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return curd.get(url,{},headers)
}

export const setTrendingTitleImage =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.setTrendingTitleImage;
    const token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return curd.post(url,data,headers)
}
export const getTrandingTitleImagesData =async () => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.getTrandingTitleImagesData;
    const token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return curd.post(url,{},headers)
}
export const titleImageUpdateById =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.titleImageUpdateById;
    const token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return curd.post(url,data,headers)
}

export const titleImageDeleteById =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.titleImageDeleteById;
    const token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return curd.post(url,data,headers)
}

export const PermotiopromotionAndOfferAdd =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.addPromotionAndOfferDetails;
    const token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return curd.post(url,data,headers)
}
export const getPromotionAndOfferDetails =async () => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.getPromotionAndOfferDetails;
    const token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return curd.get(url,{},headers)
}
export const updatePromotionAndOfferDetails =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.updatePromotionAndOfferDetails;
    const token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return curd.post(url,data,headers)
}
export const deletePromotionAndOfferDetails =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.deletePromotionAndOfferDetails;
    const token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return curd.post(url,data,headers)
}

export const addBookFiles = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.addBookFiles;
    const token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return curd.post(url,data,headers)
}

export const getBookFiles =async () => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.getBookFiles;
    const token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return curd.get(url,{},headers)
}

export const BookFilesUpdate =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.updateBookFiles;
    const token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return curd.post(url,data,headers)
}
export const BookFilesDelete =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.deleteBookFiles;
    const token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return curd.post(url,data,headers)
}