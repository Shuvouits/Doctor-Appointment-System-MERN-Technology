import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import Doctor from "../images/feature-img.png"

function Profile() {

  const [booking, setBooking] = useState(true);
  const [profile, setProfile] = useState(false);

  const handleBooking = () => {
    setProfile(false)
    setBooking(true)

  }

  const handleProfile = () => {
    setProfile(true)
    setBooking(false)
  }

  return (
    <div className='profile'>

      <div className='left-part'>
        <div className='card'>
          <div className='card-body'>
            <div className='profile-image'>
              <img src={Doctor} />
            </div>
            <div className='profile-info'>
              <span>Shuvo Bhowmik</span>
              <span>shuvo@test.com</span>
              <span>Blood Type: B+</span>
            </div>
          </div>
          <div className='card-footer'>
            <button className='logout'>Logout</button>
            <button className='delete'>Delete Account</button>
          </div>
        </div>
      </div>

      <div className='right-part'>
        <div className='card'>
          <div className='card-header'>
            <button className='booking' onClick={handleBooking}>My Bookings</button>
            <button className='profile-setting' onClick={handleProfile}>Profile Settings</button>
          </div>
          <div className='card-body'>

            {booking && (

              <div className='booking-part'>
                <p>No Doctor booking yet</p>
              </div>

            )}



            {profile && (

              <form className='form profile-part'>
                <div className='form-group'>
                  <input type='text' className='form-control' placeholder='Your name' />
                </div>

                <div className='form-group'>
                  <input type='email' className='form-control' placeholder='Your Email' />
                </div>

                <div className='form-group'>
                  <input type='password' className='form-control' placeholder='Your password' />
                </div>

                <div className='form-group'>
                  <input type='text' className='form-control' placeholder='Blood group' />
                </div>

                <div className='form-group'>

                  <select className="form-select" id='gender'>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>

                <div className='form-group' >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>

                    <img src={Doctor} style={{ width: '70px', height: '70px', borderRadius: '35px' }} />
                    <input type='file' className='form-control' />

                  </div>

                </div>
              </form>

            )}






          </div>
        </div>

      </div>

    </div>
  )
}

export default Profile