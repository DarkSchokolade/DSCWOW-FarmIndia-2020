import React,{useState , useEffect} from 'react'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import {Link} from 'react-router-dom'
import {Button,Row,Col,ListGroup,Image,Card, ListGroupItem} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message  from '../components/Message'
import Loader from '../components/Loader'
import {getOrderDetails , payOrder,deliverOrder} from '../actions/orderActions'
import {ORDER_PAY_RESET,ORDER_DELIVER_RESET} from '../constants/orderConstants'

const OrderScreen = ({match,history}) => {
    const orderId = match.params.id
    const [sdkReady, setSdkReady] = useState(false)
    const dispatch = useDispatch()
    const orderDetails = useSelector(state =>state.orderDetails)
    const {order,loading,error} = orderDetails

    const orderPay = useSelector(state =>state.orderPay)
    const {loading: loadingPay,success : successPay} = orderPay

    const userLogin = useSelector(state =>state.userLogin)
    const {userInfo} = userLogin

    
    const orderDeliver = useSelector(state =>state.orderDeliver)
    const {loading: loadingDeliver,success : successDeliver} = orderDeliver

    useEffect(()=>{


        if(!userInfo){
            history.push('/login')
        }
        const addPayPalScript = async ()=>{
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () =>{
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        
        if(!order || successPay ||successDeliver) {
            dispatch({ type : ORDER_PAY_RESET})
            dispatch({ type : ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId))
        }
        else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }
        }else{
            setSdkReady(true)
        }
    }, [dispatch,order, successPay,successDeliver,orderId]) 
    const succesPaymentHandler =(paymentResult) =>{
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))

    }

    const deliverHandler = ()=>{
        dispatch(deliverOrder(order))
    }


    return loading? <Loader/> : error ? <Message>{error}</Message>:<>
        <h1>Order {order._id}</h1>

        <Row>
            <Col md={8}>
                <ListGroup variant = 'flush'>
                    <ListGroupItem>
                        <h2>Shipping</h2>
                        <p><strong>Name : </strong>{order.user.name}</p>
                        <strong>Email : </strong>
                        <p><a href = {`mail to : ${order.user.email}`}> {order.user.email}</a></p>
                        <p>
                            <strong>Address:</strong>
                            {order.shippingAddress.address},
                            {order.shippingAddress.city},
                            {order.shippingAddress.postalCode},
                            {order.shippingAddress.country},
                            
                        </p>
                        {order.isDelivered ? (<Message variant = 'success'>Delivered On {order.deliveredAt}</Message>):(<Message variant ='danger'>yet to be Delivered</Message>)}
                    </ListGroupItem>
                    <ListGroupItem>
                        <h2>Payment Method</h2>
                        <p> 
                        <strong>Method:</strong>
                        {order.paymentMethod}
                        </p>
{order.isPaid ? <Message variant = 'success'>Paid On {order.paidAt}</Message>:<Message variant ='danger'>Not Paid</Message>}
                    </ListGroupItem>

                    <ListGroupItem>
                        <h2>Order Items</h2>
                        {order.orderItems.length===0 ? <Message>Order is empty</Message>:(
                            <ListGroup variant = 'flush'>
                                {order.orderItems.map((item,index)=>(
                                    <ListGroupItem key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col>
                                                <Link to ={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x ${item.price} =${item.qty * item.price}
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                            ))}
                            </ListGroup>
                        )}
                    </ListGroupItem>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup>
                        <ListGroupItem>
                            <h2>Order Summary</h2>
                        </ListGroupItem>
                        <ListGroupItem> 
                            <Row>
                                <Col>Items</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem> 
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem> 
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem> 
                            <Row>
                                <Col>Total</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        {!order.isPaid && (
                            <ListGroupItem>
                                {loadingPay && <Loader/>}
                                {!sdkReady ? <Loader /> : (
                                    <PayPalButton  amount ={order.totalPrice} onSuccess = {succesPaymentHandler} />
                                )}
                            </ListGroupItem>
                        )}
                        {loadingDeliver && <Loader/>}
                        {userInfo && userInfo.isAdmin&&order.isPaid &&!order.isDelivered&&(
                            <ListGroupItem>
                                <Button type='button' className = 'btn btn-block' onClick={deliverHandler}>Mark As Delivered</Button>
                            </ListGroupItem>
                        )}
                       
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
    
}

export default OrderScreen
