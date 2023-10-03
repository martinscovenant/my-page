import React from 'react';
import './App.css';
import { Layout }from './components/Layout';
import { Home } from './page/Home';
// import { Signup } from './page/Accounts/Signup';
import { Login } from './page/Accounts/Login';
// import { Update } from './components/Update/Update';
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
   <Route path='/' element={<Layout/>}>
        <Route index element={<Home />} />
      {/* <Route path='/Signup' element={<Signup/>}/> */}
    <Route path='/Login' element={<Login/>}/>   
   {/* <Route path='/Update' element={<Update/>}/>  */}
    {/* <Route path='/UpdateReport' element={<UpdateReport />}/>  */}
    </Route>
   </Routes>
    </>
  )
}
export default App;
