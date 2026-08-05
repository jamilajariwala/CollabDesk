import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(cookieParser())
app.use(cors({
    origin:process.env.CLIENT_URL || "http://localhost:5173",
    credentials:true
}
))

import userRouter from './Routers/user.route.js'
import projectRouter from './Routers/project.route.js'
import calculation from './Routers/calculation.route.js'
import invite from './Routers/invite.route.js'

app.use('/api/v1/user',userRouter)
app.use('/api/v1/project',projectRouter)
app.use('/api/v1/calculate',calculation)
app.use('/api/v1/invite',invite)

app.use((err, req, res, next) => {
    res.status(err.statuscode || 500).json({
        success: err.success || false,
        message: err.message || "Something went wrong",
        errors: err.error || [],
        data: err.data || null,
    });
});
export {app}