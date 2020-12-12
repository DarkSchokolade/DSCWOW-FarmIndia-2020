import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema({
    name:{type:String,required:true},
    rating:{type:Number,required:true},
    comment:{type:String,required:true},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
        
    },

},{
    timeStamps:true
})


const productSchema  =  mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    name:{
        type:String,
        require:true
    },
    image:{
        type:String,
        required:true
        
    },
    location:{
        type:String,
        required:true,

    },
    
    description:{
        type:String,
        required:true,
        
    },
    rating:{
        type:Number,
        required:true,
        default:0
        
    },
    reviews:[reviewSchema],
    numReviews:{
        type:Number,
        required:true,
        default:0
        
    },
    price:{
        type:Number,
        required:true,
        default:0
        
    },
    countInStock:{
        type:Number,
        required:true,
        default:0
        
    }

},{
    timeStamps: true
})

const Product = mongoose.model('Product',productSchema)

export default Product