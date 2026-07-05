import mongoose from 'mongoose'

// console.log(process.env.MONGODB_URL)
const ConnectDb=async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/CollabDesk`)
        console.log("Database Connection Is Successful")
    }
    catch(e){
        console.log("Database Connection Failed",e)
        process.exit(1)
    }
   
}

export default ConnectDb