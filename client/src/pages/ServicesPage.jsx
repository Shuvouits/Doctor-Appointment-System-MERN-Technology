import React, { useEffect, useState } from 'react'
import Services from '../components/Services'
import MedicalService from '../components/MedicalService'
import FAQ from '../components/FAQ'
import TestimonialCarousel from '../components/Testmonial'

function ServicesPage() {

    
  const [review, setReview] = useState([]);

  const allUserReview = async () => {

    try {
      const res = await fetch(`https://doctor-api-backend.onrender.com/all-review`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });


      const data = await res.json();
      setReview(data);

    } catch (error) {
      return (error)

    }

  };

  useEffect(() => {
    allUserReview();
  }, []);


  return (
    <div>
        <Services />
        <MedicalService />
        <TestimonialCarousel review={review}/>
        <br></br>
        <br></br>
        <FAQ />
        
    </div>
  )
}

export default ServicesPage