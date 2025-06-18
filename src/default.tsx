import React, { useEffect, useState } from 'react';

import { Outlet } from 'react-router-dom';
import Footer from './components/Footer.tsx';
import Header from './components/Header.tsx';

const Default = () => {
  return (
    <>
      <Header />
      <div className="w-[90%] mx-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Default;
