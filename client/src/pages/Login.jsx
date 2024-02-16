import React, { useState } from 'react'
import { MdOutlineCelebration } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { BeatLoader } from 'react-spinners';
import Swal from 'sweetalert2';

function Login() {


    const navigate = useNavigate();

    const [formData, setFormData] = useState({})
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {

            const res = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            

            if (res.status === 200) {

                Swal.fire({
                    toast: true,
                    position: 'top-right',
                    animation: true,
                    text: `Welocme to ${data.fullName} `,
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

                dispatch({ type: "LOGIN", payload: data });
                Cookies.set("user", JSON.stringify(data));
                navigate('/profile')

                
            }



            if (res.status === 400) {
                setError(data.message)
                console.log(data.message)
            }

            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    return (

        <div className='login-container'>

            {
                loading && (

                    <div className='spinners'>
                        <BeatLoader color="red" />
                    </div>

                )
            }

            <div className='login' style={{ opacity: loading ? '0.3' : '1' }}>


                <div className='card'>

                    <div className='card-header'>
                        <h3>Hello <span style={{ color: "blue" }}>Welocme</span> Back <span style={{ color: "red" }}><MdOutlineCelebration /></span></h3>
                    </div>

                    <div className='card-body'>
                        <form onSubmit={handleSubmit}>
                            {
                                error && (
                                    <span style={{ color: "red", fontWeight: "bold" }}>{error}</span>

                                )
                            }

                            <div className='row'>
                                <div className='form-group'>
                                    <input type='email' id='email' onChange={handleChange} placeholder='Enter your mail' required className='form-control' />
                                </div>

                                <div className='form-group'>
                                    <input type='password' id='password' onChange={handleChange} placeholder='Enter your password' required className='form-control' />
                                </div>

                                <button type='submit' className='submit-btn'>Submit</button>

                            </div>
                        </form>

                        <p>Donot have your account? <span><Link to={'/register'}>Register here</Link></span></p>
                    </div>

                </div>

            </div>

        </div>

    )
}

export default Login