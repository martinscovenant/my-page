import React from 'react';
import './App.css';
import {Layout}from './components/Layout'
   import { Home } from './page/Home'
import { SignUp } from './page/Accounts/SignUp';
import { SignIn } from './page/Accounts/SignIn';
import { ViewAllReport } from './components/viewAllReport/ViewAllReport';
// import {UpdateReport } from './components/update/UpdateReport';
import { Route, Routes, useLocation } from 'react-router-dom';
 

function ScrollToTop() {
   const { pathname } = useLocation();
 
   React.useEffect(() => {
     window.scrollTo(0, 0);
   }, [pathname]);
 
   return null;
 }
 
 
 function App() {
 
   return (
     <>
     <ScrollToTop />

     <Routes>
   <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
      <Route path='/SignUp' element={<SignUp/>}/>
    <Route path='/SignIn' element={<SignIn/>}/>   
   <Route path='/ViewAllReport' element={<ViewAllReport/>}/> 
    {/* <Route path='/UpdateReport' element={<UpdateReport />}/>  */}
    </Route>
   </Routes>
    </>
  )
}
export default App;
