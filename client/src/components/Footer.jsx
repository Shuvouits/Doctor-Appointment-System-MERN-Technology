import React from 'react'
import logo from "../images/logo.png";
import { CiYoutube } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";

export default function Footer() {
  return (
    <div className='footer' >
      <div className='section-1'>
        <div className='flogo'>
          <img src={logo} />
        </div>
        <div className='fcopyright'>
          <span>Copyright @2024 developed by ShuvoBhowmik all right reserved</span>
        </div>
        <div className='fsocial'>
          <span><CiYoutube /></span>
          <span><FaGithub /></span>
          <span><CiLinkedin /></span>
          <span><CiFacebook /></span>
        </div>
      </div>
      <div className='section-2'>
        <h2>Quick Links</h2>
        <span>Home</span>
        <span>About Us</span>
        <span>Services</span>
        <span>Blog</span>
      </div>
      <div className='section-3'>
        <h2>I Want To</h2>
        <span>Find a Doctor</span>
        <span>Request an Appointment</span>
        <span>Find a Location</span>
        <span>Get a Opinion</span>
      </div>
      <div className='section-4'>

        <h2>Support</h2>
        <span>Donate</span>
        <span>Contact Us</span>

      </div>
    </div>
  )
}
