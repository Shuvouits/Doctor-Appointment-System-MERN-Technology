import React from 'react'
import { MdOutlineCelebration } from "react-icons/md";
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className='login'>
        <div className='card'>

            <div className='card-header'>
                <h3>Hello <span style={{color: "blue"}}>Welocme</span> Back <span style={{color: "red"}}><MdOutlineCelebration /></span></h3>
            </div>

            <div className='card-body'>
                <form>
                    <div className='row'>
                        <div className='form-group'>
                            <input type='email' placeholder='Enter your mail' className='form-control' />
                        </div>

                        <div className='form-group'>
                            <input type='email' placeholder='Enter your mail' className='form-control' />
                        </div>

                        <button type='submit' className='submit-btn'>Submit</button>

                    </div>
                </form>

                <p>Donot have your account? <span><Link to={'/register'}>Register here</Link></span></p>
            </div>

        </div>
        
    </div>
  )
}

export default Login