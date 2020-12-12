import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import UserEditScreen from './screens/UserEditScreen';
import OrderListScreen from './screens/OrderListScreen';






const App = () => {
  return (
    <Router>
    <Header/>
    <main className='py-3'>
      <Container>
        <Route path='/' component={HomeScreen} exact/>
        <Route path='/page/:pageNumber' component={HomeScreen} exact/>
        <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact/>
        <Route path='/search/:keyword' component={HomeScreen} exact />
        <Route path='/shipping' component={ShippingScreen} />
        <Route path='/placeorder' component={PlaceOrderScreen} />
        <Route path='/order/:id' component={OrderScreen} />
        <Route path='/payment' component={PaymentScreen} />
        <Route path='/login' component={LoginScreen} />
        <Route path='/register' component={RegisterScreen} />
        <Route path='/profile' component={ProfileScreen} />
        <Route path='/product/:id' component={ProductScreen} />
        <Route path='/adminuserList' component={UserListScreen} />
        <Route path='/admin/productlist' component={ProductListScreen} exact />
        <Route path='/admin/productlist/:pageNumber' component={ProductListScreen} exact />
        <Route path='/admin/orderlist' component={OrderListScreen} />
        <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
        <Route path='/admin/user/:id/edit' component={UserEditScreen} />
        

        <Route path='/cart/:id?' component={CartScreen} />
        


      </Container>
    
    </main>
    <Footer/>
       
    </Router>
  );
}

export default App;
