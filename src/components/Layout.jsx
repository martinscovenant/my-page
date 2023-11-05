
import React from 'react'
import { Outlet } from 'react-router-dom'
// import {Footer } from './footer/Footer';
export const Layout = () => {
  return <>
  <Outlet />
   {/* <Footer /> */}
  </>;
}