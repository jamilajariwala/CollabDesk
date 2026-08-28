import {v2 as cloudinary} from 'cloudinary'
const deleteCloudinary=async(publicId,resourcetype)=>{
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    })
    try{
        const uploadResult =  await cloudinary.uploader.destroy(publicId,{
                    resource_type:resourcetype
                })

        return uploadResult  
    }catch(error){
        console.log("Cloudinary delete error:", error)
        return null
    } 
}
export default deleteCloudinary