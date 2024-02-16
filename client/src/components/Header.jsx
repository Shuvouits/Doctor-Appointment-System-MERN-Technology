// Header.js

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../images/logo.png";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie"
import Swal from 'sweetalert2';


export default function Header() {
  const { user } = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleLogout = async() => {
    try{

      const res = await fetch('http://localhost:4000/signout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        }
      });

      const data = await res.json();

      if (res.status === 200) {
        dispatch({ type: "LOGOUT", payload: null });
        Cookies.set("user", null);

        Swal.fire({
          toast: true,
          position: 'top-right',
          animation: true,
          text: `${user.fullName}, You have logged out`,
          icon: 'success',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          customClass: {
              container: 'custom-toast-container',
              popup: 'custom-toast-popup',
              title: 'custom-toast-title',
              icon: 'custom-toast-icon',
          },
      });

      
        navigate('/login')
      }

    }catch(error){

    }
    
  }


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
         

          {
            user ? (
              <Link className='customLink' to="/profile">
              <div style={{display: 'flex', alignItems: "center", gap: "10px"}}>
                    <img style={{width: "50px", height: "50px", borderRadius: "25px"}} src={user.avatar} />
                    <span>{user.fullName}</span>

                </div>
                </Link>
            ): (
              <Link to="/login"><button className='loginBtn'>Login</button></Link>
            )
          }




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
