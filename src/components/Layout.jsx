// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './header/Header';
import {Footer } from './footer/Footer';
export const Layout = () => {
  return <>
  <Header />
  <Outlet />
  <Footer />
  </>;
}