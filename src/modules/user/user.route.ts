import express from 'express'
import { UserController } from './user.controller'

const router = express.Router()

router.post('/', UserController.createUser)
router.get('/', UserController.getAllUsers)
router.get('/:userId', UserController.getUserByUserId)
router.put('/:userId', UserController.updateUserByUserId)
router.delete('/:userId', UserController.deleteUserByUserId)
router.put('/:userId/orders', UserController.addNewProductToOrders)
router.get('/:userId/orders', UserController.getUserOrders)
router.get('/:userId/orders', UserController.getUserOrderTotal)
router.get('/:userId/orders/total-price', UserController.getUserOrderTotal)

export default router
