import { Router } from "express";
import verifyJWT from "../Middlewares/auth.middleware.js";
import { calculate } from "../Controllers/calculation.controller.js";

const router=Router()

router.route('/').get(verifyJWT,calculate)

export default router