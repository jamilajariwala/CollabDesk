import { Router } from "express";
import verifyJWT from "../Middlewares/auth.middleware.js";
import { createTask, deleteTask, getAllTask, getOneTask, updateTask, updateTaskStatus } from "../Controllers/Task.controllers.js";

const router=Router({mergeParams:true})

router.use(verifyJWT)

router.route('/').post(createTask)
router.route('/').get(getAllTask)
router.route('/:taskId').get(getOneTask)
router.route('/:taskId').patch(updateTask)
router.route('/:taskId').delete(deleteTask)
router.route('/:taskId/update-status').patch(updateTaskStatus)

export default router