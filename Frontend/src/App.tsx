import React from 'react';

import { BrowserRouter } from "react-router-dom";

import Link from "next/link";

import type { AppProps } from 'next/app';

// import BackgroundSistema from './assets/Background Sistema.svg';

import { Card, Container, Button } from "./styles"
import { AuthProvider } from './contexts/AuthContext';


function App( { Component, pageProps }:AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;