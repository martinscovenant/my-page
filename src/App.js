
import './App.css';
import { SignUp } from './page/Accounts/SignUp';
import { SignIn } from './page/Accounts/SignIn';
import { Route, Routes } from 'react-router-dom';

function App() {

   return(
 <Routes>
    
   <Route path='/' element={<SignUp/>}/>
   <Route path='/SignIn' element={<SignIn/>}/>

   </Routes>
   );
  
};

export default App;
