import express from 'express'
import cookieParser from 'cookie-parser'

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(cookieParser())

import userRouter from './Routers/user.route.js'

app.use('/api/v1/user',userRouter)

export {app}