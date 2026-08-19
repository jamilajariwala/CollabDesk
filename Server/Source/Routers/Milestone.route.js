import {Router} from 'express'
import verifyJWT from '../Middlewares/auth.middleware.js'
import { createMilestone, deleteMilestone, getAllMilestone, getOneMilestone, updateMilestone } from '../Controllers/Milestone.controllers.js'
import taskrouter from './Task.route.js'

const router=Router({ mergeParams: true }) // coz we have made nested route. project route is the parent route look at project.route.js file

router.use(verifyJWT)

router.route('/').get(getAllMilestone)
router.route('/:mileId').get(getOneMilestone)
router.route('/').post(createMilestone)
router.route('/:mileId').patch(updateMilestone)
router.route('/:mileId').delete(deleteMilestone)

router.use('/:mileId/task',taskrouter)

export default router