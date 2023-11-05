
import './App.css';
import React from "react";
import { Route, Routes} from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './page/Home';
import { Signup } from './page/Accounts/Signup';
import { Signin } from './page/Accounts/Signin';
import { UpdateReport } from './components/updateReport/UpdateReport';
// \`
export default function App() {
  return (
      <Routes>
        < Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
          <Route path="UpdateReport" element={<UpdateReport />} />
        </Route>
      </Routes>
  );
}

