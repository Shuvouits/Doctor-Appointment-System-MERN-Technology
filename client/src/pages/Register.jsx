import React from 'react'
import banner from "../images/signup.gif"
import doctor from "../images/doctor-img01.png"
import { Link } from 'react-router-dom'

function Register() {
    return (
        <div className='register'>

            <div className='banner'>
                <img src={banner} />
            </div>

            <div className='card'>
                <div className='card-body'>
                    <form className='form'>
                        <div className='form-group'>
                            <input type='text' placeholder='Full name' className='form-control' />
                        </div>
                        <div className='form-group'>
                            <input type='email' placeholder='Enter your mail' className='form-control' />
                        </div>
                        <div className='form-group'>
                            <input type='password' placeholder='Enter your password' className='form-control' />
                        </div>

                        <div className='col'>
                            <div className='form-group'>
                                <label>Are you a</label>
                                <select class="form-select">
                                    <option>Patient</option>
                                    <option>Doctor</option>
                                </select>
                            </div>

                            <div className='form-group'>
                                <label>Gender</label>
                                <select class="form-select">
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>

                        </div>

                        <div className='col'>

                            <div className='upload-img'>
                                <img src={doctor} />
                            </div>

                            <div className='form-group'>
                                <input type='file' placeholder='Enter your password' className='form-control' />
                            </div>

                        </div>



                        <button type='submit' className='sign-up'>SignUp</button>


                    </form>

                </div>
                <div className='card-footer'>
                    <span>Already have an account? <Link to={'/login'}>Login</Link></span>
                </div>
            </div>

        </div>
    )
}

export default Register