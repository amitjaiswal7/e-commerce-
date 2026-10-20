import './App.css'
import Signup from './component/Singup'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute_for_login from './protect.route/Protext.route'
import Navbar from './component/Navbar'
import Login from './component/Login'
import ProtectedRoute from './protect.route/Protect.route.login'
import Product from './component/Product'
import Layout from './component/Layout'
import Upperline from './component/Upperline'
import User_account from './component/User_account';
import Bannerslider from './component/Bannerslider';
import Productdetail from './component/Productdetail'
import Footer from './component/Footer'
import Notification from './component/Notification'
import Userproduct from './component/Add_tocard'
import UserSettings from './component/Usersetting'
import ProductUpload from './admin_component/product_upload'
import { Product_route_for_admin } from './protect.route/protect_router_admin'
function App() {


  return (
    <>


   <Routes>
    <Route path='/singup' element={<ProtectedRoute><Signup/></ProtectedRoute>}/>
    <Route path='/login' element={<ProtectedRoute><Login/></ProtectedRoute>}/>

     <Route path='/'  
     element={<ProtectedRoute_for_login> 
       <Layout>
        
       <Navbar/>
       <Upperline/>
       <Bannerslider/>
       <Product/>
        <Footer/>
       </Layout>
        </ProtectedRoute_for_login>}  />



      <Route  path='/user_account'  element={<ProtectedRoute_for_login><User_account/></ProtectedRoute_for_login>}/>

      <Route path='/product-detail/:id' element={<ProtectedRoute_for_login><Productdetail/></ProtectedRoute_for_login>}/>

      <Route path='/notification' element={<ProtectedRoute_for_login><Notification/></ProtectedRoute_for_login>}  />  
      <Route path='/user-product' element={<ProtectedRoute_for_login><Userproduct/></ProtectedRoute_for_login>}/>

     <Route path='/user-setting' element={<ProtectedRoute_for_login><UserSettings/></ProtectedRoute_for_login>} />

     <Route path='/product-upload' element={<ProtectedRoute_for_login> <Product_route_for_admin><ProductUpload/></Product_route_for_admin> </ProtectedRoute_for_login>}/>
   </Routes>

   
 
    </>
  )
}

export default App
