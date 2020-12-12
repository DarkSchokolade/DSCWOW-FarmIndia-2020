import express from 'express'
const router = express.Router()
import {addOrderItems,getOrderById, updateOrderToPaid,getMyOrders,getOrders,updateOrderToDelivered} from '../controllers/orderController.js'
import {protect,admin,vendor} from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect,admin,getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin,vendor,updateOrderToDelivered)

export default router