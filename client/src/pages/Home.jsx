import FAQ from '../components/FAQ'
import Testimonial from '../components/Testmonial'
import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import MedicalService from '../components/MedicalService'
import Virtual from '../components/Virtual'
import DoctorList from "../components/DoctorList";


export default function Home() {
  return (
    <>

      <Hero />

      <Services />

      <About />  

      <MedicalService />

      <Virtual />

      <DoctorList />

      <FAQ />

      <Testimonial  /> 

      {/* 
    
  

      

      

      

     

    

          */}

      
      <div style={{marginBottom: "100px"}}></div>
      

    </>

  )
}
