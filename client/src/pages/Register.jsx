import React, { useEffect, useState } from 'react'
import banner from "../images/signup.gif"
import doctor from "../images/doctor-img01.png"
import { Link, useNavigate } from 'react-router-dom'

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app, storage } from '../firebase.js'
import Swal from 'sweetalert2';
import { BeatLoader } from 'react-spinners';


function Register() {
    const [formData, setFormData] = useState({})
    const [error, setError] = useState('');

    const [file, setFile] = useState(undefined)
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false)
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false)
    const [imageLoading, setImageLoading] = useState(false)


    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })

    }




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




    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)


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
            const res = await fetch('https://doctor-api-backend.onrender.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
                    text: `Welocme to ${data.fullName}, You are successfully registered`,
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


                navigate('/login');
            }

            if(res.status === 400){
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

        <div className='register-container'>

            {
                loading && (

                    <div className='spinners'>
                        <BeatLoader color="red" />
                    </div>

                )
            }




            <div className='register' style={{opacity: loading ? '0.3' : '1'}}>



                <div className='banner'>
                    <img src={banner} />
                </div>

                <div className='card'>
                    <div className='card-body'>
                       
                       
                        <form className='form' onSubmit={handleSubmit}>

                        {
                            error && (
                                <span style={{color: "red", fontWeight: "bold"}}>{error}</span>

                            )
                        } 

                            <div className='form-group'>
                                <input type='text' id='fullName' onChange={handleChange} placeholder='Full name' className='form-control' required />
                            </div>
                            <div className='form-group'>
                                <input type='email' id='email' onChange={handleChange} placeholder='Enter your mail' className='form-control' required />
                            </div>
                            <div className='form-group'>
                                <input type='password' id='password' onChange={handleChange} placeholder='Enter your password' className='form-control' required />
                            </div>

                            <div className='col'>
                                <div className='form-group'>
                                    <label>Are you a</label>
                                    <select className="form-select" id='userType' onChange={handleChange}>
                                        <option>Patient</option>
                                        <option >Doctor</option>
                                    </select>
                                </div>

                                <div className='form-group'>
                                    <label>Gender</label>
                                    <select className="form-select" id='gender' onChange={handleChange}>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                </div>

                            </div>

                            <div className='col'>

                                <div className='upload-img'>
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Uploaded Preview"  />
                                    ) : (
                                        <img src={doctor} alt="Default Doctor Image" />
                                    )}
                                </div>

                                <div className='form-group'>
                                    <input type='file' onChange={(e) => setFile(e.target.files[0])}  className='form-control' />
                                    

                                </div>

                                {
                                    imageLoading && (

                                        <span style={{color: 'red', fontWeight: 'bold'}}>{filePerc}% </span>

                                    )
                                }

                                



                            </div>



                            <button type='submit' className='sign-up' disabled={loading} style={{ background: loading ? 'red' : '', cursor: loading ? 'not-allowed' : 'pointer' }}>


                                <span>SignUp</span>

                            </button>


                        </form>

                    </div>
                    <div className='card-footer'>
                        <span>Already have an account? <Link to={'/login'}>Login</Link></span>
                    </div>
                </div>

            </div>

        </div>

    )
}

export default Register