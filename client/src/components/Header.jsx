// Header.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/logo.png";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";


export default function Header() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <header>
        <div className='logo'>
          <img src={logo} alt="Logo" />
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
