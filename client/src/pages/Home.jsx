import FAQ from '../components/FAQ'
import Testimonial from '../components/Testmonial'
import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import MedicalService from '../components/MedicalService'
import Virtual from '../components/Virtual'
import DoctorList from "../components/DoctorList";
import { useState } from 'react'


export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>

      <Hero />

      <Services />

      <About />  

      <MedicalService />

      <Virtual />

      <DoctorList  searchQuery={searchQuery} />

      <FAQ />

      <Testimonial  /> 

      {/* 
    
  

      

      

      

     

    

          */}

      
      <div style={{marginBottom: "100px"}}></div>
      

    </>

  )
}
