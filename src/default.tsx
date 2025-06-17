import React, { useEffect, useState } from 'react';
import Header from './components/Header.tsx';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer.tsx';

const Default = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Default;
