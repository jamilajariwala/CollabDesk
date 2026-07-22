import {Router} from 'express'
import { changePassword, forgotPassword, getCurrentUser, login, logout, refreshAccessToken, register, resendOtp, resetPassword, verifyOtp } from '../Controllers/User.controllers.js'
import verifyJWT from '../Middlewares/auth.middleware.js'

const router=Router()

router.route('/register').post(register)
router.route('/login').post(login)

router.route('/logout').post(verifyJWT,logout)
router.route('/change-password').patch(verifyJWT,changePassword)
router.route('/getuser').get(verifyJWT,getCurrentUser)

router.route('/forgot-password').post(forgotPassword)
router.route('/verify-otp').post(verifyOtp)
router.route('/resend-otp').post(resendOtp)
router.route('/reset-password').patch(resetPassword)

router.route('/refresh-token').post(refreshAccessToken)

export default router
