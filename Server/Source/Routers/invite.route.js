import { Router } from "express";
import verifyJWT from "../Middlewares/auth.middleware.js";
import { acceptInvitation, getInvitationInfo, sendInvitation } from "../Controllers/Invitation.controllers.js";

const router =Router()


router.route('/:projectId').post(verifyJWT,sendInvitation)
router.route('/:token').get(getInvitationInfo)
router.route('/:token/accept').patch(verifyJWT,acceptInvitation)

export default router