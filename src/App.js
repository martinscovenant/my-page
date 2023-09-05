// import { Suspense } from "react";
import './App.css';
import { SignUp } from './page/Accounts/SignUp';
import { SignIn } from './page/Accounts/SignIn';
import { ViewAllReport } from './components/viewAllReport/ViewAllReport';
import { Modal } from './components/modal/Modal';
// import Fetch from "./main-components/Fetch";
import { Route, Routes } from 'react-router-dom';
 

function App() {

   return(
 <Routes>
    
    <Route path='/' element={<SignUp/>}/>
   <Route path='/SignIn' element={<SignIn/>}/>   
   <Route path='/' element={<ViewAllReport/>}/>
    <Route path='/' element={<Modal />}/>
   </Routes>
   );
  
};

export default App;
