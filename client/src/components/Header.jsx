// Header.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/logo.png";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";


export default function Header() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Add this JavaScript to your component or separate script file
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      const scrolled = window.scrollY > 0;
      if (scrolled) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      // Cleanup the event listener when the component is unmounted
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <>
      <header>
        <div className='logo'>
          <Link to={"/"}>
          <img src={logo} alt="Logo" />

          </Link>
          
        </div>
        <div className={`menu ${showSidebar ? 'show' : 'hide'}`}>
          <Link className='customLink' to={'/'}>Home</Link>
          <Link className='customLink' to={'/find-doctor'}>Find a Doctor</Link>
          <Link className='customLink' to={'/services'}>Services</Link>
          <Link className='customLink' to={'/contact'}>Contact</Link>
        </div>

        <div>
          <button className='loginBtn'>Login</button>



        </div>

        <div className='mobile-menu'>

          {!showSidebar && (

            <span style={{ marginLeft: "15px" }} onClick={toggleSidebar}>
              <FaBars className='' />


            </span>

          )}


          {showSidebar && (

            <span style={{ marginLeft: "15px" }} onClick={toggleSidebar}><IoMdClose /></span>

          )}


        </div>
      </header>
    </>
  );
}
