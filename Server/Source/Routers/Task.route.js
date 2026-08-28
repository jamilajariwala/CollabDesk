import { Router } from "express";
import verifyJWT from "../Middlewares/auth.middleware.js";
import { approveTask, createTask, deleteTask, getAllTask, getOneTask, rejectTask, updateTask, updateTaskStatus } from "../Controllers/Task.controllers.js";
import deliverablerouter from './Deliverables.route.js'

const router=Router({mergeParams:true})

router.use(verifyJWT)

router.route('/').post(createTask)
router.route('/').get(getAllTask)
router.route('/:taskId').get(getOneTask)
router.route('/:taskId').patch(updateTask)
router.route('/:taskId').delete(deleteTask)
router.route('/:taskId/update-status').patch(updateTaskStatus)
router.route('/:taskId/approve-task').patch(approveTask)
router.route('/:taskId/reject-task').patch(rejectTask)

router.use('/:taskId/deliverables',deliverablerouter)

export default router