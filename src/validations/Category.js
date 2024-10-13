export default function hasEmptyValue(name,value){
    let error;
    let regex = /^(?!\s+$).+$/;
    if(!value){
        error = `Please add ${name} name`
        return error
    }
    if (!regex.test(value)) {
        error = `Only space is not allowed in ${name}`
        return error
        }
    // return true
}