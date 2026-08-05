import { Router } from "express";
import verifyJWT from "../Middlewares/auth.middleware.js";
import { sendInvitation } from "../Controllers/Invitation.controllers.js";

const router =Router()

router.use(verifyJWT)

router.route('/:projectId').post(sendInvitation)


export default router