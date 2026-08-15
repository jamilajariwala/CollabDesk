import { Router } from "express";
import verifyJWT from "../Middlewares/auth.middleware.js";
import { createProject, deleteProject, getOneProject, getProjects, updateProject } from "../Controllers/Project.controllers.js";
import milestone from './Milestone.route.js'

const router = Router()

router.use(verifyJWT)

router.route('/')
.post(createProject)
.get(getProjects)

router.route('/:projectId')
.get(getOneProject)
.patch(updateProject)
.delete(deleteProject)

router.use('/:prjtId/milestone',milestone)

export default router