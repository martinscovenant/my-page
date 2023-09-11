import './App.css';
// import { SignUp } from './page/Accounts/SignUp';
// import { SignIn } from './page/Accounts/SignIn';
// import { ViewAllReport } from './components/viewAllReport/ViewAllReport';
import {UpdateReport } from './components/update/UpdateReport';
import { Route, Routes } from 'react-router-dom';
 

function App() {

   return(
 <Routes>
     {/* <Route path='/' element={<SignUp/>}/>
   <Route path='/SignIn' element={<SignIn/>}/>   
   <Route path='/' element={<ViewAllReport/>}/> */}
    <Route path='/UpdateReport' element={<UpdateReport />}/>
   </Routes>
   );
  
};

export default App;
