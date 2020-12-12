import React,{useState,useEffect} from 'react'
import axios from 'axios'
import  { Link } from 'react-router-dom'
import {Form,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer  from '../components/FormContainer'

import {listProductDetails,updateProduct} from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'



const ProductEditScreen = ({match, history}) => {
    const productId = match.params.id
    const [name,setName] = useState('')
    const [price,setPrice] = useState(0)
    const [image,setImage] =  useState('')
    const [restaurant,setRestaurant] =  useState('')
    const [cuisine,setCuisine] =  useState('')
    //const [countInStock,setCountInStock] =  useState(0)
    const [description,setDescription] =  useState('')
    const [uploading,setUploading] =  useState(false)

    
    
    const dispatch = useDispatch()
    
    const productDetails = useSelector(state=>state.productDetails)
    const {loading, error, product} = productDetails

    const productUpdate = useSelector(state=>state.productUpdate)
    const {loading : loadingUpdate, error: errorUpdate,success : successUpdate} = productUpdate

   
    useEffect(()=>{
        if(successUpdate){
            dispatch({type : PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        }
        else{
            if(!product.name||product._id!==productId){
                dispatch(listProductDetails(productId))
    
            }
            else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setRestaurant(product.restaurant)
                setCuisine(product.cuisine)
                //setCountInStock(product.countInStock)
                setDescription(product.description)

            }

        }
          
        
        
    
    },[dispatch,product,productId,history,successUpdate])

    const uploadFileHandler = async(e)=>{
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image',file)
        setUploading(true)

        try {
            const config = {
                headers:{
                    'Content-Type' : 'multipart/form-data'
                }
            }

            const {data} = await axios.post('/api/upload',formData,config)

            setImage(data)
            setUploading(false)
        } catch (error) {
            console.log(error)
            setUploading(false)
        }
    }

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(updateProduct({
            _id : productId,
            name,
            price,
            image,
            restaurant,
            cuisine,
            //countInStock,
            description
        }))
    
    
    }
    return( 
        <>
        <Link to ='/admin/productlist' className ='btn btn-light my-3'></Link>
        <FormContainer>
            <h1>Edit Product </h1>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant = 'danger'>{errorUpdate}</Message>}
            
            {loading ? <Loader/> : error ? <Message varient = 'danger'>{error}</Message>:(
                <Form onSubmit ={submitHandler}>
                <Form.Group controlId ='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type ='name' placeholder='Enter Name' value={name}
                        onChange={(e)=>setName(e.target.value)}></Form.Control>
                    </Form.Group>
    
                    <Form.Group controlId ='price'>
                        <Form.Label>Price </Form.Label>
                        <Form.Control type ='number' placeholder='Enter Price' value={price}
                        onChange={(e)=>setPrice(e.target.value)}></Form.Control>
                    </Form.Group>
    
                    <Form.Group controlId ='image'>    
                    <Form.Label>image </Form.Label>
                        <Form.Control type ='text' placeholder='Enter image url' value={image}
                        onChange={(e)=>setImage(e.target.value)}></Form.Control>
                        <Form.File id = 'image-file' label ='Choose File' custom onChange={uploadFileHandler}></Form.File>
                        {uploading && <Loader/>}
                    </Form.Group>

                    <Form.Group controlId ='restaurant'>    
                    <Form.Label>Restaurant </Form.Label>
                        <Form.Control type ='text' placeholder='Enter restaurant' value={restaurant}
                        onChange={(e)=>setRestaurant(e.target.value)}></Form.Control>
                    </Form.Group>

                    {/* <Form.Group controlId ='countInStock'>
                        <Form.Label>countInstock </Form.Label>
                        <Form.Control type ='number' placeholder='Enter countInstock' value={countInStock}
                        onChange={(e)=>setCountInStock(e.target.value)}></Form.Control>
                    </Form.Group> */}

                    <Form.Group controlId ='cuisine'>    
                    <Form.Label>Cuisine </Form.Label>
                        <Form.Control type ='text' placeholder='Enter category' value={cuisine}
                        onChange={(e)=>setCuisine(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId ='description'>    
                    <Form.Label>Description </Form.Label>
                        <Form.Control type ='text' placeholder='Enter description' value={description}
                        onChange={(e)=>setDescription(e.target.value)}></Form.Control>
                    </Form.Group>

                    
                    <Button type='submit' varient = 'primary'>Update</Button>
                </Form>
            )}
            
           
        </FormContainer>
        </>
       
    
    )}

export default ProductEditScreen
