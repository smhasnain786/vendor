import { toast } from "react-hot-toast"
/* eslint-disable import/prefer-default-export */
export const HotToaster = (boolean,message) => {
    if(boolean){
        toast.success(message)
    }
    else{
        toast.error(message)
    }

}