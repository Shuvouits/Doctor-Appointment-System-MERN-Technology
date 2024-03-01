import React from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Contact() {

    const navigate = useNavigate();

    const handleClick = () => {
        Swal.fire({
            toast: true,
            position: 'top-right',
            animation: true,
            text: 'Thanks for your valuable information we will contact soon',
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

        
    }
    return (
        <>

            <div className='contact'>
                <div className='card'>
                    <div className='card-header'>
                        <h3>Contact Us</h3>
                        <span>Got a technical Issue? Want to send feedback about a better feature? Let Us Koow</span>

                    </div>
                    <div className='card-body'>
                        <form className='form'>
                            <div className='form-group'>
                                <label>Your Email</label>
                                <input type='email' placeholder='Enter your mail' className='form-control' />
                            </div>

                            <div className='form-group'>
                                <label>Subject</label>
                                <input type='text' placeholder='Enter your mail' className='form-control' />
                            </div>

                            <div className='form-group'>
                                <label>Your Message</label>
                                <textarea style={{ height: "100px" }} className='form-control' />
                            </div>

                            <button type='submit' className='contact-us' onClick={handleClick}>Submit</button>

                        </form>

                    </div>
                    <div className='card-footer'>

                    </div>

                </div>



            </div>

            <div style={{ marginBottom: "100px" }}></div>

        </>



    )
}

export default Contact