import FAQ from '../components/FAQ'
import Testimonial from '../components/Testmonial'
import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import MedicalService from '../components/MedicalService'
import Virtual from '../components/Virtual'
import DoctorList from "../components/DoctorList";
import { useEffect, useState } from 'react'


export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const [review, setReview] = useState([]);

  const allUserReview = async () => {

    try {
      const res = await fetch(`http://localhost:4000/all-review`, {
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
    <>

      <Hero />

      <Services />

      <About />  

      <MedicalService />

      <Virtual />

      <DoctorList  searchQuery={searchQuery} />

      <FAQ />

      <Testimonial review={review}  /> 

      {/* 
    
  

      

      

      

     

    

          */}

      
      <div style={{marginBottom: "100px"}}></div>
      

    </>

  )
}
