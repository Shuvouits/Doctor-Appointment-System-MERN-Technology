import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function Booking() {

    const [specificDoctor, setSpecificDoctor] = useState({});
    const { id, doctorName } = useParams();
 

    const findDoctor = async () => {

        try {
          const res = await fetch(`https://doctor-api-backend.onrender.com/specific-doctor/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
    
          const data = await res.json();
    
          if (res.status === 200) {
            setSpecificDoctor(data);
    
          }
    
        } catch (error) {
          return (error)
    
        }
    
      };
    
      useEffect(() => {
        findDoctor();
      }, []);

      console.log(specificDoctor)


  return (
    <div className='booking'>
       <div className='left-side'>

         

            
          <span className='avatar'>
            <img src={specificDoctor.avatar} />
          </span>
          <span className='name'>
            {specificDoctor.fullName}
          </span>
          <span className='ticket'>
            B.D.T {specificDoctor.ticket}
          </span>
          <span className='speciality'>{specificDoctor.speciality}</span>

       

          
       </div>
       <div className='right-side'>
          <div className='card'>
            <div className='card-body'>
                <form>
                    <div className='form-group'>
                        <input type='email' name='email' placeholder='Enter your email' />
                    </div>

                    <div className='form-group'>
                        <label>Card Information</label>
                        <input type='email' name='email' placeholder='Enter your email' />
                    </div>

                    <div className='form-group'>
                        <label>Card Holder Name</label>
                        <input type='email' name='email' placeholder='Enter your email' />
                    </div>

                    <div className='form-group'>
                        <label>Country or Region</label>
                        <input type='email' name='email' placeholder='Enter your email' />
                    </div>

                    <button>Submit</button>


                </form>

            </div>

          </div>
       </div>
    </div>
  )
}
