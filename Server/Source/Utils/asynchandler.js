const asyncHandler=(requestFunction)=>{
    return async(req,res,next)=>{
    try{
        await requestFunction(req,res,next)
    }
    catch(error){
        next(error)
    }
}
}
export default asyncHandler