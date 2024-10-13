import { HotToaster } from "../utils/Toaster"
/* eslint-disable import/prefer-default-export */

export const ResultFunction = (result,fun) => {
    if(result.status){
        HotToaster(result.status,result.message)
        fun()
      }
      else{
        HotToaster(result.status,result.message)
      }
}