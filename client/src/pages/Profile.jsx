import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Doctor from "../images/feature-img.png"
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie"
import Swal from 'sweetalert2';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app, storage } from '../firebase.js'
import { BeatLoader } from 'react-spinners';

function Profile() {

  const { user } = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(true);
  const [profile, setProfile] = useState(false);

  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false)
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)

  const handleBooking = () => {
    setProfile(false)
    setBooking(true)

  }

  const handleProfile = () => {
    setProfile(true)
    setBooking(false)
  }

  const handleLogout = async () => {
    try {

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

    } catch (error) {

    }

  }

  const [formData, setFormData] = useState({
    fullName: user.fullName || '',
    email: user.email || '',
    password: user.password || '',
    gender: user.gender || '',
    blood: user.blood || '',
    userType: user.userType || '',
    avatar: user.avatar || ''
  })



  const handleFileUpload = (file) => {
    setImageLoading(true)
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePerc(Math.round(progress));
    }, (error) => {
      setFileUploadError(true);
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setFormData({ ...formData, avatar: downloadURL });
        setImagePreview(downloadURL);
        setImageLoading(false)
      });
    });
  };

  useEffect(() => {

    if (file) {
      handleFileUpload(file)
    }

  }, [file]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })

  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    console.log(formData)

    try {

      if (file) {

        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Wait for both upload and download URL retrieval
        const [snapshot] = await Promise.all([
          new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                // Handle upload state changes if needed
              },
              (err) => {
                console.log(err);
                reject(err);
              },
              () => {
                resolve(uploadTask.snapshot);
              }
            );
          }),
        ]);

        // Get the download URL
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        // Update formData with the download URL
        setFormData((prevData) => ({
          ...prevData,
          avatar: downloadURL,
        }));

      }


      // Make the API request with updated formData
      const res = await fetch('http://localhost:4000/profile-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false)

      if (res.status === 200) {

        Swal.fire({
          toast: true,
          position: 'top-right',
          animation: true,
          text: `Your profile is successfully updated`,
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

        dispatch({ type: "UPDATE", payload: data });
        Cookies.set("user", JSON.stringify(data));


      }

      if (res.status === 400) {
        setError(data.message)
        console.log(error)
      }


    } catch (error) {
      // Handle error appropriately
      //console.log(error);
      setLoading(false)
    }
  };

  return (
    <div className='profile-container'>

      {
        loading && (

          <div className='spinners'>
            <BeatLoader color="red" />
          </div>

        )
      }

      <div className='profile' style={{ opacity: loading ? '0.3' : '1' }}>

        <div className='left-part'>
          <div className='card'>
            <div className='card-body'>
              <div className='profile-image'>
                <img src={formData.avatar} />
              </div>
              <div className='profile-info'>
                <span style={{ textTransform: 'capitalize' }}>{user.fullName}</span>
                <span>{user.email}</span>
                <span>Blood Group: {user.blood}</span>
              </div>
            </div>
            <div className='card-footer'>
              <button className='logout' onClick={handleLogout}>Logout</button>
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

                <form className='form profile-part' onSubmit={handleSubmit}>
                  <div className='form-group'>
                    <input type='text' id='fullName' value={formData.fullName} onChange={handleChange} className='form-control' placeholder='Your name' />
                  </div>

                  <div className='form-group'>
                    <input type='email' id='email' value={formData.email} onChange={handleChange} className='form-control' placeholder='Your Email' />
                  </div>

                  <div className='form-group'>
                    <input type='password' id='password' value={formData.password} onChange={handleChange} className='form-control' placeholder='Your password' />
                  </div>

                  <div className='form-group'>
                    <input type='text' id='blood' value={formData.blood} onChange={handleChange} className='form-control' placeholder='Blood group' />
                  </div>

                  <div className='form-group'>

                    <select className="form-select" id='gender' onChange={handleChange}>
                      <option value='Male' {...formData.gender === 'Male' ? 'selected' : ""} >Male</option>
                      <option value='Female' {...formData.gender === 'Female' ? 'selected' : ""} >Female</option>
                    </select>
                  </div>

                  <div className='form-group' >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>


                      {
                        imagePreview ? (
                          <img src={imagePreview} style={{ width: '70px', height: '70px', borderRadius: '35px' }} />

                        ) : (
                          <img src={formData.avatar} style={{ width: '70px', height: '70px', borderRadius: '35px' }} />

                        )
                      }
                      <input type='file' onChange={(e) => setFile(e.target.files[0])} className='form-control' />

                    </div>

                    {
                      imageLoading && (

                        <span>{filePerc}% </span>

                      )
                    }

                  </div>
                  <button type='submit' style={{ background: loading ? 'red' : '', cursor: loading ? 'not-allowed' : 'pointer' }} className='submit-btn'>
                    {loading ? "...Profile Updated" : "Submit"}
                    
                  </button>
                </form>

              )}






            </div>
          </div>

        </div>

      </div>

    </div>

  )
}

export default Profile