import { Router } from 'express'

import userRoute from '../modules/user/user.route'

const router = Router()

// all routes gose here
router.use('/users', userRoute)

export default router
