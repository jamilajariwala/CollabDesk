import fs from 'fs'
import {v2 as cloudinary} from 'cloudinary'
const uploadCloudinary=async(file,resource_type="auto")=>{
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    })
    try{
        const uploadResult = await cloudinary.uploader
       .upload(file,{
               resource_type:resource_type,
               folder:'/CollabDesk'
           }
       ) 
        if (fs.existsSync(file)) {
            fs.unlinkSync(file)
        }

        return uploadResult  
    }catch(error){
        console.log(error)
        if (fs.existsSync(file)) {
            fs.unlinkSync(file)
        }

        return null
    } 
}
export default uploadCloudinary