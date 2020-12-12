import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'


//desc Create new Order
//route post api/orders
//accses Protected
const addOrderItems =asyncHandler(async(req,res)=>{
   const {orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,totalPrice,shippingPrice} = req.body
   if(orderItems && orderItems.length === 0){
       res.status(400)
       throw new Error('no order items')
       return
   }
   else{
       const order =new Order({
        orderItems,
        user : req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        totalPrice,
        shippingPrice
       })

       const createdOrder = await order.save()

       res.status(200).json(createdOrder)
   }
})


//desc To get order by id
//route GET api/orders
//accses private
const getOrderById =asyncHandler(async(req,res)=>{
   
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if(order){
        res.json(order)
    }
    else{
        res.status(404)
        throw new Error('Order not found')
    }
 })
 


//desc Update order to paid
//route GET api/orders/:id/pay
//accses Private
const updateOrderToPaid =asyncHandler(async(req,res)=>{
   
    const order = await Order.findById(req.params.id)
    if(order){
        order.isPaid = true,
        order.paidAt = Date.now(),
        order.paymentResult = {
            id: req.body.id,
            status : req.body.status,
            update_time : req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    }
    else{
        res.status(404)
        throw new Error('Order not found')
    }
 })


 //desc Update order to delivered
//route GET api/orders/:id/delivered
//accses Private/Admin
const updateOrderToDelivered =asyncHandler(async(req,res)=>{
   
    const order = await Order.findById(req.params.id)
    if(order){
        order.isDelivered = true,
        order.deliveredAt = Date.now()
       

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    }
    else{
        res.status(404)
        throw new Error('Order not found')
    }
 })


//desc Get logged in user orders
//route GET api/orders/myorders
//accses Private
const getMyOrders = asyncHandler(async(req,res)=>{
   
    const orders = await Order.find({user : req.user._id})
    res.json(orders)

})



//desc Get all orders
//route GET api/orders/orders
//accses Private/Admin
const getOrders = asyncHandler(async(req,res)=>{
   
    const orders = await Order.find({}).populate('user','id name')

    res.json(orders)

})

export {addOrderItems,getOrderById,updateOrderToPaid,updateOrderToDelivered,getMyOrders,getOrders}