import dotenv from 'dotenv'
dotenv.config({
    path:"./.env",
})

import dns from "dns";
dns.setServers(["8.8.8.8","8.8.4.4"])

import {app} from './app.js'
import ConnectDb from './Db/DbConnection.js'


ConnectDb()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
    console.log("server started")
})  
}  
)
.catch(
    (error)=>{
        console.log("Database Connection Failed..... ERROR",error)
    }
)