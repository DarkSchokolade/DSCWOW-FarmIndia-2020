import express from 'express'

const router = express.Router()
import { createProduct, deleteProduct, getProductById,getProducts, updateProduct , createProductReview,getTopProducts,getFilterProduct} from '../controllers/productController.js'
import {protect,admin, vendor} from '../middleware/authMiddleware.js'
router.get('/filter',getFilterProduct)
router.route('/').get(getProducts).post(protect,admin,vendor,createProduct)    
router.route('/:id/reviews').post(protect,createProductReview)
router.get('/top',getTopProducts)
router.route('/:id').get(getProductById).delete(protect , admin, deleteProduct).
put(protect , admin , updateProduct)



export default router