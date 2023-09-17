import './App.css';
// import { Header } from './components/header/Header'
   import { Home } from './page/Home'
// import { SignUp } from './page/Accounts/SignUp';
// import { SignIn } from './page/Accounts/SignIn';
// import { ViewAllReport } from './components/viewAllReport/ViewAllReport';
// import {UpdateReport } from './components/update/UpdateReport';
// import { Footer } from "./components/footer/Footer";
// import { FooterBottom }from "./components/footer/FooterBottom";
import { Route, Routes } from 'react-router-dom';
 

function App() {

   return(
 <Routes>
   <Route path='/' element={< Home />} />
  {/* <Route path='/' element={< Header/>}/> */}
     {/* <Route path='/' element={<SignUp/>}/>
   <Route path='/SignIn' element={<SignIn/>}/>   
   <Route path='/' element={<ViewAllReport/>}/> */}
    {/* <Route path='/UpdateReport' element={<UpdateReport />}/> */}
      {/* <Route path='/' element={<Footer/>}/>
      <Route path='/' element={<FooterBottom/>}/> */}
   </Routes>
   );
  
};

export default App;
