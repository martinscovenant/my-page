
import './App.css';
import React from "react";
import { Route, Routes} from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './page/Home';
import { SignUp } from './page/Accounts/SignUp';
import { SignIn } from './page/Accounts/SignIn';
import { UpdateReport } from './components/updateReport/UpdateReport';
// \`
export default function App() {
  return (
      <Routes>
        < Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="signIn" element={<SignIn />} />
          <Route path="UpdateReport" element={<UpdateReport />} />
        </Route>
      </Routes>
  );
}

