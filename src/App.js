import React from 'react';
import './App.css';
import { Layout }from './components/Layout';
import { Home } from './page/Home';
import { Signup } from './page/Accounts/Signup';
import { SignIn } from './page/Accounts/SignIn';
import { ViewSpecificReport } from "./components/ViewSpecificReport"
import { UpdateReports } from './components/updateReport/UpdateReport'
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
      <Route path='/Signup' element={<Signup/>}/>
    <Route path='/SignIn' element={<SignIn/>}/>   
    <Route path='/UpdateReports' element={<UpdateReports />}/> 
   <Route path="/view-specific-report" element={< ViewSpecificReport />}/> 
    </Route>
   </Routes>
    </>
  )
}
export default App;
