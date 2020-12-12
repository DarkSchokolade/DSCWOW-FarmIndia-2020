import jwt from 'jsonwebtoken'
import AsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = AsyncHandler( async (req,res,next)=>{
    let token 

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not Authorized Token failed')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not Authorized, no token')
    }


})

const admin = (req,res,next) =>{
    if(req.user && req.user.isAdmin){
        next()
    }
    else{
        res.status(401)
        throw new Error('Not Authorized as a admin')
    }
}

const vendor = (req,res,next) =>{
    if(req.user && req.user.isVendor){
        next()
    }
    else{
        res.status(401)
        throw new Error('Not Authorized as a vendor')
    }
}

export { protect , admin , vendor}