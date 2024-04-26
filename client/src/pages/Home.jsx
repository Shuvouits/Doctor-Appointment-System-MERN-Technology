import FAQ from '../components/FAQ'
import Testimonial from '../components/Testmonial'
import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import MedicalService from '../components/MedicalService'
import Virtual from '../components/Virtual'
import DoctorList from "../components/DoctorList";
import { useEffect, useState } from 'react'
import { PulseLoader } from 'react-spinners';


export default function Home() {

  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('');

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
      setLoading(false)

    } catch (error) {
      return (error)

    }

  };

  useEffect(() => {
    allUserReview();
  }, []);



  return (
    <>

      {loading && (
        <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
          <PulseLoader color="#0000FF" />
        </div>
      )}

      <div style={{opacity : `${loading ? '0.3' : ''}`}}>

        <Hero />

        <Services />

        <About />

        <MedicalService />

        <Virtual />

        <DoctorList searchQuery={searchQuery} />

        <FAQ />

        <Testimonial review={review} />

      


        <div style={{ marginBottom: "100px" }}></div>

      </div>




    </>

  )
}
