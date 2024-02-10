import React from 'react'

function Contact() {
  return (
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
                        <input type='email' placeholder='Enter your mail' className='form-control' />
                    </div>

                    <div className='form-group'>
                        <label>Your Message</label>
                        <textarea style={{height: "100px"}}  className='form-control'/>
                    </div>

                    <button type='submit' className='contact-us'>Submit</button>

                </form>

            </div>
            <div className='card-footer'>

            </div>

        </div>
        
    </div>
  )
}

export default Contact