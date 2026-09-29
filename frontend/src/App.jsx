import React from 'react';
import {createBrowserRouter , RouterProvider } from 'react-router-dom'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import VerifyEmail from './pages/VerifyEmail';
import Verify from './pages/Verify';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPaswword from './pages/ForgotPassword';
import VerifyOtp from './pages/verifyOTP';
import ChangePassword from './pages/changePassword';
import AuthSuccess from './pages/AuthSuccess';
const router = createBrowserRouter([
  {
    path:"/",
    element:<><Navbar/><Home/></> 
    //elemet: <ProtectedRoute><Navbar><Home/></Navbar></ProtectedRoute> // find the user
  },
  {
    path:"/signup",
    element:<Signup></Signup>
  },
  {
    path:"/verify",
    element:<VerifyEmail/>
  },
  {
    path:"/verify/:token",
    element:<Verify/>
  },
  {
    path:"/auth-success",
    element:<AuthSuccess></AuthSuccess>
  },
  ,
  {
    path:"/login",
    element:<Login></Login>
  },
  
  {
    path:"/forgot-password",
    element:<ForgotPaswword/>
  },{
    path:"/verify-otp/:email",
    element:<VerifyOtp/>
  }
  ,{
    path:"/change-password/:email",
    element:<ChangePassword/>
  }
  
])
function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
      

    </div>
  );
}

export default App
