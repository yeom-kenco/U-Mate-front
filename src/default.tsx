import React, { useEffect, useState } from 'react';
import Header from './components/Header.tsx';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer.tsx';
import ChatbotButton from './components/ChatbotButton.tsx';

const Default = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ChatbotButton />
    </>
  );
};

export default Default;
