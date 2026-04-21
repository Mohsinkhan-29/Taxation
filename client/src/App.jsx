import React, { useState } from 'react'
import { useEffect } from "react";
import { createBrowserRouter } from 'react-router-dom'

import HeroOne from './components/Hero/HeroOne'
import About from './components/About/About'
import Subscription from './components/Subscription/Subscription'
import Services from './components/Services/Services'
import TrustBar from './components/TrustBar/TrustBar'
import Faq from './components/Faq/Faq'
import Testimonials from './components/Testimonials/Testimonials'
import FooterOne from './components/Footer/FooterOne'
import NavbarOne from './components/Navbar/NavbarOne'


import AOS from "aos";
import "aos/dist/aos.css";


function App() {

 const route = createBrowserRouter([
  {
    path: "/About",
    element: <About />,
  },
  {},
 ])



useEffect(() => {
  AOS.init({
    duration: 2000,
    once: false, // animation only once
  });
}, []);



  return (
    <>
      <div >
        <NavbarOne />
        <HeroOne />
        <Services />
        <Subscription />
        <About />
        <TrustBar />
        <Testimonials />
        <Faq />
        <FooterOne />
      </div>
    </>
  )
}

export default App
