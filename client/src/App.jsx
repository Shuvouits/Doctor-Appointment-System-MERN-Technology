import Footer from "./components/Footer"
import Header from "./components/Header"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Services from "./pages/Services"
import FindDoctor from "./pages/FindDoctor"
import DoctorInfo from "./pages/DoctorInfo"


function App() {


  return (
    <div>
      <Header />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route  path="/services" element={<Services />} />
        <Route path="/find-doctor" element={<FindDoctor />} />
        <Route path="/:doctor-name/:id" element={<DoctorInfo />} />

      </Routes>
      <Footer />
    </div>

  )
}

export default App
