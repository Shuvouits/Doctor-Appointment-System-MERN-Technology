import React from 'react'
import logo from "../images/logo.png";

import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className='footer' >
      <div className='section-1'>
        <div className='flogo'>
          <img src={logo} />
        </div>
        <div className='fcopyright'>
          <span>Copyright @2024 developed by StackDeveloper all right reserved</span>
        </div>
        <div className='fsocial'>
          <span>

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
          </span>
          <span>

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </span>
          <span>

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </span>
          <span>

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </span>
        </div>
      </div>
      <div className='section-2'>
        <h2>Quick Links</h2>
        <Link to={'/'} className='customLink'><span>Home</span></Link>
        <Link to={'/find-doctor'} className='customLink'><span>Find a Doctor</span></Link>
        <Link to={'/services'} className='customLink'><span>Services</span></Link>
        <Link to={'/contact'} className='customLink'><span>Contact</span></Link>
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
