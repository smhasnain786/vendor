const EmptyState = (states,image) => {
        if(image){
            image.current.value = ""
        }
    return states.map((val)=>{console.log("statesstates",val);
        return val("")
    })
}
export default EmptyState