import { Router } from "express";
import verifyJWT from "../Middlewares/auth.middleware.js";
import upload from "../Middlewares/multer.middleware.js";
import { addDeliverables, deleteDeliverable, getAllDeliverables, getOneDeliverable, updateDeliverable } from "../Controllers/Deliverables.controllers.js";

const router=Router({mergeParams:true})

router.use(verifyJWT)

router.route('/').post(upload.single('file'),addDeliverables)
router.route('/').get(getAllDeliverables)
router.route('/:deliverableId').get(getOneDeliverable)
router.route('/:deliverableId').patch(upload.single('file'),updateDeliverable)
router.route('/:deliverableId').delete(deleteDeliverable)

export default router